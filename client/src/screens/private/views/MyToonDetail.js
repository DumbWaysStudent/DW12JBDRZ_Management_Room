import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';

import fetchEpisodes from '../../../_store/episodes';
import Error from '../../../components/error';
import Loading from '../../../components/loading';

class MyToonDetail extends Component {
  componentDidMount() {
    const {episodes, navigation} = this.props;
    const toon = navigation.state.params;

    if (episodes.toon_id != toon.id) this.handleGetEpisodes(toon.id);
  }

  handleGetEpisodes = toon_id => {
    this.props.fetchEpisodes(toon_id);
  };

  showScreen = (screen, params) => {
    return this.props.navigation.navigate(screen, params);
  };

  showEpisode = episode => {
    return (
      <View style={styles.showEpsCont}>
        <View style={styles.showEps}>
          <TouchableOpacity onPress={() => this.showScreen('MyToon', episode)}>
            <Image
              style={styles.epsImage}
              source={{
                uri: episode.image,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.epsNameCont}>
          <Text style={styles.epsName}>{episode.title}</Text>
          <Text style={styles.epsNameDate}>{episode.createdAt}</Text>
        </View>
      </View>
    );
  };

  showBanner = toon => {
    return (
      <View style={styles.bannerCont}>
        <View style={styles.imageCont}>
          <Image
            style={styles.image}
            source={{
              uri: toon.image,
            }}
          />
        </View>
      </View>
    );
  };

  renderSub = (toon, episodes) => {
    return (
      <FlatList
        data={episodes}
        renderItem={({item}) => this.showEpisode(item)}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={this.showBanner(toon)}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetEpisodes(toon.id)}
        refreshing={false}
      />
    );
  };

  render() {
    const {episodes, navigation} = this.props;
    const toon = navigation.state.params;

    if (episodes.error) {
      return (
        <Error
          message={episodes.error}
          onPress={() => this.handleGetEpisodes(toon.id)}
        />
      );
    }

    if (episodes.isLoading || episodes.toon_id != toon.id) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        {this.renderSub(toon, episodes.data)}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    episodes: state.episodes,
  };
};

const mapDispatchToProps = {
  fetchEpisodes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyToonDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  showEpsCont: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  showEps: {
    borderWidth: 4,
    justifyContent: 'center',
  },
  epsImage: {
    width: metrics.DEVICE_WIDTH / 5.4,
    height: metrics.DEVICE_HEIGHT / 5.95,
    resizeMode: 'contain',
  },
  epsNameCont: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
  epsName: {
    fontFamily: strings.FONT,
    fontSize: 22,
    marginTop: 10,
  },
  epsNameDate: {
    fontFamily: strings.FONT,
    fontSize: 18,
    opacity: 0.3,
  },
});
