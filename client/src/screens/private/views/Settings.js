import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import {removeAuthKey} from '../../../config/auth';
import resetAllData from '../../../_store/reset';

import background from '../../../assets/images/background.jpg';

class Settings extends Component {
  handleLogout = async () => {
    try {
      await removeAuthKey();
      this.props.resetAllData();
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          <View style={styles.headerCont}>
            <Text style={styles.headerText}>{strings.SETTING}</Text>
            <View style={styles.headBorder} />
          </View>
          <View style={styles.formCont}>
            <TouchableOpacity onPress={() => this.handleLogout()}>
              <View style={styles.logoutCont}>
                <Text style={styles.logout}>{strings.LOGOUT}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = {
  resetAllData,
};

export default connect(
  null,
  mapDispatchToProps,
)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  headerCont: {
    alignItems: 'center',
    marginVertical: 30,
  },
  headerText: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 28,
    color: colors.DARK_BLUE,
    marginBottom: 10,
  },
  headBorder: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: colors.DARK_BLUE,
    minWidth: 30,
    maxWidth: 30,
    minHeight: 4,
    maxHeight: 4,
  },
  formCont: {
    flex: 1,
    justifyContent: 'center',
  },
  logoutCont: {
    backgroundColor: colors.DARK_GREEN,
    padding: 20,
    elevation: 4,
  },
  logout: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 20,
    color: colors.WHITE,
  },
});
