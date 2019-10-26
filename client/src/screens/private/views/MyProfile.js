import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';
import {removeAuthKey} from '../../../config/auth';
import resetAllData from '../../../_store/reset';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: 'Tri Aginta Ginting',
        havePhoto: false,
        imageURI: '',
      },
    };
  }

  componentDidMount() {
    this.props.navigation.setParams(this.state.profile);
  }

  showPhoto = profile => {
    if (profile && profile.havePhoto) {
      return (
        <Image style={styles.showProfPhoto} source={{uri: profile.imageURI}} />
      );
    }
    return (
      <Icon
        style={styles.profileIcon}
        name="user-circle-o"
        size={150}
        color={colors.DARK_GREEN}
      />
    );
  };

  showProfile = () => {
    const {profile} = this.state;
    const {params} = this.props.navigation.state;
    const data = params ? params : profile;

    return (
      <View style={styles.profileImgContainer}>
        <View style={styles.profileImg}>
          {this.showPhoto(data)}
          <Text style={styles.profileName}>{data.name}</Text>
        </View>
      </View>
    );
  };

  handleLogout = async () => {
    try {
      await removeAuthKey();
      this.props.resetAllData();
      this.props.navigation.navigate('Auth');
    } catch (error) {
      console.log(error);
    }
  };

  showProfileMenu = () => {
    return (
      <View style={styles.profMenuContainer}>
        <View style={styles.showProfMenu}>
          <Text style={styles.profMenuName}>{strings.CREATE_TOON_PAGE}</Text>
          <Icon
            name="chevron-right"
            size={28}
            onPress={() => this.props.navigation.navigate('MyToonKingdom')}
          />
        </View>
        <View style={styles.showProfMenu}>
          <View style={styles.menuButtonContainer}>
            <TouchableOpacity onPress={() => this.handleLogout()}>
              <Text style={styles.profMenuName}>{strings.LOGOUT}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderSub = () => {
    return (
      <View style={styles.profileContainer}>
        {this.showProfile()}
        {this.showProfileMenu()}
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

const mapDispatchToProps = {
  resetAllData,
};

export default connect(
  null,
  mapDispatchToProps,
)(MyProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '103%',
  },
  profileContainer: {
    flex: 1,
  },
  profileImgContainer: {
    flex: 1,
  },
  profileImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  showProfPhoto: {
    width: metrics.DEVICE_WIDTH / 2.2,
    height: metrics.DEVICE_WIDTH / 2.2,
    resizeMode: 'cover',
    borderRadius: metrics.DEVICE_WIDTH / 2.2 / 2,
  },
  profileIcon: {
    alignSelf: 'center',
  },
  profileName: {
    fontFamily: strings.FONT,
    fontSize: 30,
    marginTop: 10,
  },
  profMenuContainer: {
    flex: 1,
  },
  menuButtonContainer: {
    flex: 1,
  },
  showProfMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 4,
    padding: 20,
  },
  profMenuName: {
    fontFamily: strings.FONT,
    fontSize: 25,
  },
});
