import React, {Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import colors from '../config/colors';
import strings from '../config/strings';

import errorLogo from '../assets/images/worklogo.png';
import background from '../assets/images/background.jpg';

export default class error extends Component {
  render() {
    const {message, onPress} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <Image source={errorLogo} style={styles.error} />
          <Text style={styles.errorTxt}>{message}</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.errorTxt2}>{strings.TRYAGAIN}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  error: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  errorTxt: {
    fontFamily: strings.FONT,
    fontSize: 22,
  },
  errorTxt2: {
    fontFamily: strings.FONT,
    fontSize: 18,
    color: colors.BLUE,
  },
});
