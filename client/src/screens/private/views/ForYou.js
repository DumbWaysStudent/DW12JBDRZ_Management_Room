import React, {Component} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-banner-carousel';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';
import {setHeaderAuth} from '../../../config/api';
import {getAuthKey} from '../../../config/auth';
import {textEllipsis} from '../../../config/utils';
import fetchAllToons from '../../../_store/toons';
import fetchFavorites from '../../../_store/favorites';
import resetAllData from '../../../_store/reset';
import Error from '../../../components/error';
import Loading from '../../../components/loading';
import favLoad from '../../../assets/images/heart.gif';

import {
  METHOD_GET,
  METHOD_POST,
  METHOD_DELETE,
} from '../../../config/constants';

class ForYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [
        {
          image:
            'https://prodimage.images-bn.com/pimages/9781421571201_p0_v1_s600x595.jpg',
        },
        {
          image:
            'https://prodimage.images-bn.com/pimages/9781421571218_p0_v1_s550x406.jpg',
        },
        {
          image:
            'https://prodimage.images-bn.com/pimages/9781421571973_p0_v1_s550x406.jpg',
        },
      ],
    };
  }

  componentDidMount() {
    this.props.resetAllData();
    this.handleGetAllToons();
  }

  handleGetUserLogin = async () => {
    try {
      const user = await getAuthKey();
    } catch (error) {
      console.log(error);
    }
  };

  handleGetAllToons = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchAllToons(user.id, false, null);
    } catch (error) {
      console.log(error);
    }
  };

  handleSearchToon = async title => {
    try {
      const user = await getAuthKey();
      this.props.fetchAllToons(user.id, true, title);
    } catch (error) {
      console.log(error);
    }
  };

  handleGetFavorite = async () => {
    try {
      const user = await getAuthKey();
      this.props.fetchFavorites(METHOD_GET, user.id, null);
    } catch (error) {
      console.log(error);
    }
  };

  handlePostFavorite = async toon_id => {
    try {
      const user = await getAuthKey();
      this.props.fetchFavorites(METHOD_POST, user.id, toon_id);
    } catch (error) {
      console.log(error);
    }
  };

  handleDelFavorite = async toon_id => {
    try {
      const user = await getAuthKey();
      this.props.fetchFavorites(METHOD_DELETE, user.id, toon_id);
    } catch (error) {
      console.log(error);
    }
  };

  showScreen = (screen, params) => {
    return this.props.navigation.navigate(screen, params);
  };

  showSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder={strings.SEARCH}
          onChangeText={title => this.handleSearchToon(title)}
        />
        <Icon style={styles.searchIcon} name="search" size={25} />
      </View>
    );
  };

  showImage = (banner, index) => {
    return (
      <View key={index} style={styles.imageCont}>
        <Image
          style={styles.image}
          source={{
            uri: banner.image,
          }}
        />
      </View>
    );
  };

  showBanner = () => {
    return (
      <View style={styles.bannerCont}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={metrics.BANNER}>
          {this.state.banners.map((banner, index) =>
            this.showImage(banner, index),
          )}
        </Carousel>
      </View>
    );
  };

  showFavItem = toon => {
    return (
      <View style={styles.favImageCont}>
        <View style={styles.favImage}>
          <TouchableOpacity
            onPress={() => this.showScreen('MyToonDetail', toon)}>
            <Image
              style={styles.showFavImage}
              source={{
                uri: toon.image,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.favNameContainer}>
          <Text style={styles.favName}>{textEllipsis(toon.title, 18)}</Text>
        </View>
      </View>
    );
  };

  showFavorites = favorites => {
    const {data} = favorites;

    if (data.length > 0) {
      return (
        <FlatList
          data={data}
          renderItem={({item}) => this.showFavItem(item)}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      );
    }
    return (
      <View style={styles.favImageCont}>
        <Text style={styles.favWarn}>{strings.FAVWARN}</Text>
      </View>
    );
  };

  showHeader = favorites => {
    return (
      <View>
        {this.showBanner()}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{strings.FAVORITES}</Text>
        </View>
        {this.showFavorites(favorites)}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{strings.ALL}</Text>
        </View>
      </View>
    );
  };

  showBtnFav = (toon, favorites) => {
    const {data} = favorites;
    const found = data.find(fav => {
      return fav.id == toon.id;
    });

    if (found) {
      return (
        <TouchableOpacity onPress={() => this.handleDelFavorite(toon.id)}>
          <Icon style={styles.btnToonFav} name="heart" size={28} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.handlePostFavorite(toon.id)}>
        <Icon style={styles.btnToonFav} name="heart-o" size={28} />
      </TouchableOpacity>
    );
  };

  showBtnFavToon = (toon, favorites) => {
    const {toon_id, isLoading} = favorites;

    if (isLoading && toon_id == toon.id) {
      return (
        <View style={styles.btnShowFav}>
          <Image source={favLoad} style={styles.favLoad} />
        </View>
      );
    }
    return (
      <View style={styles.btnShowFav}>{this.showBtnFav(toon, favorites)}</View>
    );
  };

  showToon = (toon, favorites) => {
    return (
      <View style={styles.showToonCont}>
        <View style={styles.showToon}>
          <TouchableOpacity
            onPress={() => this.showScreen('MyToonDetail', toon)}>
            <Image
              style={styles.toonImage}
              source={{
                uri: toon.image,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.toonNameCont}>
          {this.showBtnFavToon(toon, favorites)}
          <Text style={styles.toonName}>{textEllipsis(toon.title, 27)}</Text>
        </View>
      </View>
    );
  };

  renderSub = (toons, favorites) => {
    return (
      <FlatList
        data={toons.data}
        renderItem={({item}) => this.showToon(item, favorites)}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={toons.title ? null : this.showHeader(favorites)}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetAllToons()}
        refreshing={false}
      />
    );
  };

  render() {
    const {toons, favorites} = this.props;

    if (toons.error) {
      return <Error message={toons.error} onPress={this.handleGetAllToons} />;
    }

    if (toons.isLoading) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        {this.showSearchBar()}
        {this.renderSub(toons, favorites)}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    toons: state.toons,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  fetchAllToons,
  fetchFavorites,
  resetAllData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForYou);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 4,
    marginTop: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    fontFamily: strings.FONT,
    fontSize: 20,
    padding: 10,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  bannerCont: {
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 4,
    backgroundColor: colors.BROWN,
  },
  imageCont: {
    alignItems: 'center',
  },
  image: {
    width: metrics.DEVICE_WIDTH / 1.33,
    height: metrics.DEVICE_HEIGHT / 2.9,
  },
  textContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    borderBottomWidth: 4,
  },
  text: {
    fontFamily: strings.FONT,
    fontSize: 28,
  },
  favWarn: {
    fontFamily: strings.FONT,
    fontSize: 18,
    color: colors.SILVER,
  },
  favImageCont: {
    marginTop: 10,
    marginLeft: 20,
    alignItems: 'center',
  },
  favImage: {
    borderWidth: 4,
  },
  showFavImage: {
    width: metrics.DEVICE_WIDTH / 3.3,
    height: metrics.DEVICE_HEIGHT / 3.91,
    resizeMode: 'contain',
  },
  favNameContainer: {
    alignItems: 'center',
    padding: 5,
  },
  favName: {
    fontFamily: strings.FONT,
    fontSize: 18,
  },
  showToonCont: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  showToon: {
    borderWidth: 4,
    justifyContent: 'center',
  },
  toonImage: {
    width: metrics.DEVICE_WIDTH / 5,
    height: metrics.DEVICE_HEIGHT / 5.9,
    resizeMode: 'contain',
  },
  toonNameCont: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
  toonName: {
    fontFamily: strings.FONT,
    fontSize: 18,
  },
  btnShowFav: {
    alignItems: 'flex-start',
  },
  btnToonFav: {
    color: colors.TORCH_RED,
  },
  favLoad: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
