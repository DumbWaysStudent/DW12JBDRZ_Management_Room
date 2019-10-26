import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';

import metrics from '../../../config/metrics';

import fetchPages from '../../../_store/pages';
import Error from '../../../components/error';
import Loading from '../../../components/loading';

class MyToon extends Component {
  componentDidMount() {
    const {navigation} = this.props;
    const episode = navigation.state.params;

    this.handleGetPages(episode.toon_id, episode.id);
  }

  handleGetPages = (toon_id, episode_id) => {
    this.props.fetchPages(toon_id, episode_id);
  };

  showPages = item => {
    return (
      <View>
        <Image
          style={styles.showPages}
          source={{
            uri: item.image,
          }}
        />
      </View>
    );
  };

  renderSub = (episode, pages) => {
    return (
      <FlatList
        data={pages}
        renderItem={({item}) => this.showPages(item)}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetPages(episode.toon_id, episode.id)}
        refreshing={false}
      />
    );
  };

  render() {
    const {pages, navigation} = this.props;
    const episode = navigation.state.params;

    if (pages.error) {
      return (
        <Error
          message={pages.error}
          onPress={() => this.handleGetPages(episode.toon_id, episode.id)}
        />
      );
    }

    if (pages.isLoading) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        {this.renderSub(episode, pages.data)}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    pages: state.pages,
  };
};

const mapDispatchToProps = {
  fetchPages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyToon);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  showPages: {
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    resizeMode: 'contain',
  },
});
