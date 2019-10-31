import React, {Component} from 'react';
import {Text, StyleSheet, SafeAreaView, ImageBackground} from 'react-native';

import background from '../../../assets/images/background.jpg';

import {getAuthKey} from '../../../config/auth';

import strings from '../../../config/strings';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    _interval = 0;
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.checkAuthorized();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  checkAuthorized = async () => {
    try {
      const hasKey = await getAuthKey();
      this.props.navigation.navigate(hasKey ? 'App' : 'Auth');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <Text style={styles.logoTitle}>{strings.LOADING_TITLE}</Text>
          <Text style={styles.logoText}>{strings.LOADING_DESC}</Text>
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
  logoTitle: {
    fontFamily: strings.FONT_LOADING,
    fontSize: 50,
  },
  logoText: {
    fontFamily: strings.FONT_LOADING,
    fontSize: 15,
  },
});
