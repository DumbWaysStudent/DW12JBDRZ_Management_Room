import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Image,
  Text,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';
import {getAuthKey} from '../../../config/auth';
import fetchFavorites from '../../../_store/favorites';
import fetchAllToons from '../../../_store/toons';
import Error from '../../../components/error';
import Loading from '../../../components/loading';
import favWarn from '../../../assets/images/zombie.gif';

import {METHOD_GET} from '../../../config/constants';

class MyFavorite extends Component {
  handleGetUserFavs = async () => {
    try {
      const user = await getAuthKey();
      this.props.fetchFavorites(METHOD_GET, user.id, null);
      this.props.fetchAllToons(user.id, false, null);
    } catch (error) {
      console.log(error);
    }
  };

  showSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBar} placeholder={strings.SEARCH} />
        <Icon
          style={styles.searchIcon}
          name="search"
          size={25}
          color={colors.BLACK}
        />
      </View>
    );
  };

  showUserFavs = (favorite, toons) => {
    const found = toons.find(toon => {
      return toon.id == favorite.id;
    });

    return (
      <View style={styles.showUserFavsCont}>
        <View style={styles.showUserFavs}>
          <Image
            style={styles.favImage}
            source={{
              uri: favorite.image,
            }}
          />
        </View>
        <View style={styles.favNameCont}>
          <Text style={styles.favName}>{favorite.title}</Text>
          <View style={styles.favCountCont}>
            <Icon style={styles.favCount} name="heart" size={18} />
            <Text style={styles.favCountTxt}>
              {found ? found.favorites.length : 0}
              {strings.LIKE}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderSub = (favorites, toons) => {
    if (!favorites.length) {
      return (
        <View style={styles.favWarnCont}>
          <Image source={favWarn} style={styles.favWarn} />
          <Text style={styles.favWarnTxt}>{strings.FAVWARN}</Text>
        </View>
      );
    }
    return (
      <View>
        {this.showSearchBar()}
        <FlatList
          data={favorites}
          renderItem={({item}) => this.showUserFavs(item, toons)}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onRefresh={() => this.handleGetUserFavs()}
          refreshing={false}
        />
      </View>
    );
  };

  render() {
    const {favorites, toons} = this.props;

    if (favorites.error) {
      return (
        <Error message={favorites.error} onPress={this.handleGetUserFavs} />
      );
    }

    if (favorites.isLoading || toons.isLoading) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        {this.renderSub(favorites.data, toons.data)}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    toons: state.toons,
  };
};

const mapDispatchToProps = {
  fetchFavorites,
  fetchAllToons,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyFavorite);

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
    alignSelf: 'center',
    marginRight: 10,
  },
  showUserFavsCont: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  favWarnCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favWarn: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  favWarnTxt: {
    fontFamily: strings.FONT,
    fontSize: 22,
  },
  showUserFavs: {
    borderWidth: 4,
    justifyContent: 'center',
  },
  favImage: {
    width: metrics.DEVICE_WIDTH / 5,
    height: metrics.DEVICE_HEIGHT / 5.9,
    resizeMode: 'contain',
  },
  favNameCont: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
  favName: {
    fontFamily: strings.FONT,
    fontSize: 18,
  },
  favCountCont: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  favCount: {
    color: colors.TORCH_RED,
    marginRight: 10,
  },
  favCountTxt: {
    fontFamily: strings.FONT,
    fontSize: 18,
    opacity: 0.3,
    marginBottom: -3,
  },
});
