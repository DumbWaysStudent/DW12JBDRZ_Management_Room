import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';

export default class MyToonKingdom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toons: [
        {
          title: 'Playing Yugi',
          imageURI: strings.IMAGE1_URL,
          count: 32,
          episode: [
            {
              index: 1,
              imageURI: strings.IMAGE1_URL,
              dateAdded: '1 Desember 2018',
              pages: [
                {
                  index: 1,
                  name: 'cover.png',
                  imageURI: strings.IMAGE1_URL,
                },
                {
                  index: 2,
                  name: 'introduction.png',
                  imageURI: strings.IMAGE1_URL,
                },
              ],
            },
            {
              index: 2,
              imageURI: strings.IMAGE1_URL,
              dateAdded: '15 Desember 2018',
              pages: [
                {
                  index: 1,
                  name: 'cover.png',
                  imageURI: strings.IMAGE1_URL,
                },
                {
                  index: 2,
                  name: 'introduction.png',
                  imageURI: strings.IMAGE1_URL,
                },
              ],
            },
            {
              index: 3,
              imageURI: strings.IMAGE1_URL,
              dateAdded: '1 Januari 2018',
              pages: [
                {
                  index: 1,
                  name: 'cover.png',
                  imageURI: strings.IMAGE1_URL,
                },
                {
                  index: 2,
                  name: 'introduction.png',
                  imageURI: strings.IMAGE1_URL,
                },
              ],
            },
          ],
        },
        {
          title: 'Jonouchi',
          imageURI: strings.IMAGE3_URL,
          count: 42,
          episode: [
            {
              index: 1,
              imageURI: strings.IMAGE3_URL,
              dateAdded: '1 Desember 2018',
              pages: [
                {
                  index: 1,
                  name: 'cover.png',
                  imageURI: strings.IMAGE3_URL,
                },
                {
                  index: 2,
                  name: 'introduction.png',
                  imageURI: strings.IMAGE3_URL,
                },
              ],
            },
            {
              index: 2,
              imageURI: strings.IMAGE3_URL,
              dateAdded: '15 Desember 2018',
              pages: [
                {
                  index: 1,
                  name: 'cover.png',
                  imageURI: strings.IMAGE3_URL,
                },
                {
                  index: 2,
                  name: 'introduction.png',
                  imageURI: strings.IMAGE3_URL,
                },
              ],
            },
            {
              index: 3,
              imageURI: strings.IMAGE3_URL,
              dateAdded: '1 Januari 2018',
              pages: [
                {
                  index: 1,
                  name: 'cover.png',
                  imageURI: strings.IMAGE3_URL,
                },
                {
                  index: 2,
                  name: 'introduction.png',
                  imageURI: strings.IMAGE3_URL,
                },
              ],
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.props.navigation.setParams(this.state.toons);
  }

  showListToon = (toon, index) => {
    return (
      <View key={index} style={styles.showListContainer}>
        <View style={styles.listImage}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('EditMyToon', toon)}>
            <Image
              style={styles.showListImage}
              source={{
                uri: toon.imageURI,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.listNameContainer}>
          <Text style={styles.listName}>{toon.title}</Text>
          <Text style={styles.epsNameDate}>{toon.count} Episode(s)</Text>
        </View>
      </View>
    );
  };

  showListToonWindow = toons => {
    return (
      <View style={styles.listsContainer}>
        {toons.map((toon, index) => this.showListToon(toon, index))}
      </View>
    );
  };

  renderSub = () => {
    const {toons} = this.state;

    return (
      <View style={styles.toonContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.showListToonWindow(toons)}
        </ScrollView>
        <View style={styles.floatBtnContainer}>
          <TouchableOpacity
            style={styles.floatBtn}
            onPress={() => this.props.navigation.navigate('CreateMyToon')}>
            <Icon name="plus" size={30} color={colors.WHITE} />
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
  toonContainer: {
    flex: 1,
  },
  listsContainer: {
    marginTop: 20,
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
  floatBtnContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.DARK_GREEN,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    right: 1,
  },
});
