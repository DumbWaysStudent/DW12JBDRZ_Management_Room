import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';

import loadImg from '../assets/images/loading.gif';

import strings from '../config/strings';

export default class loading extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={loadImg} style={styles.loading} />
        <Text style={styles.loadingTxt}>{strings.LOADING}</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  loadingTxt: {
    fontFamily: strings.FONT,
    fontSize: 22,
  },
});
