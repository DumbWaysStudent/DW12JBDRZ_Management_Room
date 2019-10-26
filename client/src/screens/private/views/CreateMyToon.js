import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';

export default class CreateMyToon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: [
        {
          index: 1,
          imageURI: strings.IMAGE1_URL,
          dateAdded: '1 Desember 2018',
        },
        {
          index: 2,
          imageURI: strings.IMAGE2_URL,
          dateAdded: '15 Desember 2018',
        },
      ],
    };
  }

  showTitleBar = () => {
    return (
      <View style={styles.titleContainer}>
        <TextInput style={styles.titleBar} placeholder={strings.TYPE} />
      </View>
    );
  };

  showListToon = (ep, index) => {
    return (
      <View key={index} style={styles.showListContainer}>
        <View style={styles.listImage}>
          <Image
            style={styles.showListImage}
            source={{
              uri: ep.imageURI,
            }}
          />
        </View>
        <View style={styles.listNameContainer}>
          <Text style={styles.listName}>
            {strings.EPS}
            {ep.index}
          </Text>
          <Text style={styles.epsNameDate}>{ep.dateAdded}</Text>
        </View>
      </View>
    );
  };

  showListTitle = episode => {
    return (
      <View style={styles.listsContainer}>
        {episode.map((ep, index) => this.showListToon(ep, index))}
      </View>
    );
  };

  renderSub = () => {
    const {episode} = this.state;

    return (
      <View style={styles.createToonContainer}>
        <Text style={styles.titleText}>{strings.TITLE}</Text>
        {this.showTitleBar()}
        <Text style={styles.titleText}>{strings.EPISODE}</Text>
        {this.showListTitle(episode)}
        <View style={styles.addEpsBtnContainer}>
          <TouchableOpacity
            style={styles.addEpsBtn}
            onPress={() => {
              this.props.navigation.navigate('CreateEpsToon');
            }}>
            <Text style={styles.addEpsBtnText}>{strings.ADD_EPISODE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>{this.renderSub()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '85%',
  },
  createToonContainer: {
    flex: 1,
  },
  titleText: {
    fontFamily: strings.FONT,
    fontSize: 25,
    marginTop: 10,
  },
  titleContainer: {
    borderWidth: 4,
    marginTop: 10,
  },
  titleBar: {
    fontFamily: strings.FONT,
    fontSize: 20,
    padding: 10,
  },
  listsContainer: {
    flex: 1,
    marginTop: 15,
  },
  showListContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  listImage: {
    borderWidth: 4,
    marginRight: 10,
  },
  showListImage: {
    width: metrics.DEVICE_WIDTH / 5,
    height: metrics.DEVICE_HEIGHT / 7,
    resizeMode: 'contain',
  },
  listNameContainer: {
    flex: 1,
  },
  listName: {
    fontFamily: strings.FONT,
    fontSize: 18,
    marginTop: 10,
  },
  epsNameDate: {
    fontFamily: strings.FONT,
    fontSize: 18,
    opacity: 0.3,
  },
  addEpsBtnContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  addEpsBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.DARK_GREEN,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  addEpsBtnText: {
    fontFamily: strings.FONT,
    color: colors.WHITE,
    fontSize: 25,
    padding: 10,
  },
});
