import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';

export default class CreateEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episode: [
        {
          page: 1,
          name: 'cover.png',
          imageURI: strings.IMAGE1_URL,
        },
        {
          page: 2,
          name: 'introduction.png',
          imageURI: strings.IMAGE3_URL,
        },
      ],
    };
  }

  showTitleBar = () => {
    return (
      <View style={styles.titleContainer}>
        <TextInput style={styles.titleBar} />
      </View>
    );
  };

  showListToon = (toon, index) => {
    return (
      <View key={index} style={styles.showListContainer}>
        <View style={styles.listImage}>
          <Image
            style={styles.showListImage}
            source={{
              uri: toon.imageURI,
            }}
          />
        </View>
        <View style={styles.listNameContainer}>
          <Text style={styles.listName}>
            {toon.page}. {toon.name}
          </Text>
          <View style={styles.delImgBtnContainer}>
            <TouchableOpacity style={styles.delImgBtn}>
              <Text style={styles.delImgBtnText}>{strings.DELETE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  showListTitle = eps => {
    return (
      <View style={styles.listsContainer}>
        {eps.map((ep, index) => this.showListToon(ep, index))}
      </View>
    );
  };

  renderSub = () => {
    const {episode} = this.state;

    return (
      <View style={styles.createToonContainer}>
        <Text style={styles.titleText}>{strings.NAME}</Text>
        {this.showTitleBar()}
        <Text style={styles.titleText}>{strings.IMAGES}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.showListTitle(episode)}
        </ScrollView>
        <View style={styles.addEpsBtnContainer}>
          <TouchableOpacity style={styles.addEpsBtn}>
            <Text style={styles.addEpsBtnText}>{strings.ADD_IMAGE}</Text>
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
    marginTop: 10,
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
    fontSize: 20,
  },
  addEpsBtnContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
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
  delImgBtnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 100,
  },
  delImgBtn: {
    alignItems: 'center',
    backgroundColor: colors.TORCH_RED,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  delImgBtnText: {
    fontFamily: strings.FONT,
    color: colors.WHITE,
    fontSize: 18,
    padding: 10,
  },
});
