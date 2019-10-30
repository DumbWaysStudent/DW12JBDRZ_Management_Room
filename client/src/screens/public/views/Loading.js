import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import imageLogo from '../../../assets/images/logo.png';
import background from '../../../assets/images/background.jpg';

import {getAuthKey} from '../../../config/auth';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    _interval = 0;
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.checkAuthorized();
    }, 1000);
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
          <Image source={imageLogo} style={styles.logo} />
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
  logo: {
    width: 332,
    height: 89,
    resizeMode: 'contain',
  },
});
