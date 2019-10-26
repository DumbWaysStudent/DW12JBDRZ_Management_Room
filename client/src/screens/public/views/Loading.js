import React, {Component} from 'react';
import {View, Image, StyleSheet, SafeAreaView} from 'react-native';

import imageLogo from '../../../assets/images/logo.png';

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
        <View style={styles.logoContainer}>
          <Image source={imageLogo} style={styles.logo} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 332,
    height: 89,
    resizeMode: 'contain',
  },
});
