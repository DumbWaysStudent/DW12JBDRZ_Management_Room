import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import {removeAuthKey} from '../../../config/auth';
import resetAllData from '../../../_store/reset';

class Settings extends Component {
  handleLogout = async () => {
    try {
      await removeAuthKey();
      this.props.resetAllData();
      this.props.navigation.navigate('Auth');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => this.handleLogout()}>
          <View style={styles.logoutCont}>
            <Text style={styles.logout}>{strings.LOGOUT}</Text>
          </View>
        </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutCont: {
    backgroundColor: colors.DARK_GREEN,
    padding: 20,
    borderRadius: 5,
  },
  logout: {
    fontFamily: strings.FONT,
    fontSize: 20,
    color: colors.WHITE,
  },
});
