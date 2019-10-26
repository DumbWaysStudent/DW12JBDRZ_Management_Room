import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';

export default class EditMyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
    };
  }

  handleUploadPhoto = () => {
    const options = {
      allowsEditing: false,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({photo: response});
        this.props.navigation.setParams({
          havePhoto: true,
          imageURI: response.uri,
        });
      }
    });
  };

  showPhoto = profile => {
    const {photo} = this.state;
    const photoURI = profile.havePhoto
      ? profile.imageURI
      : photo
      ? photo.uri
      : '';

    if (photoURI) {
      return (
        <View style={styles.photoContainer}>
          <View style={styles.profIconContainer}>
            <Image style={styles.showProfPhoto} source={{uri: photoURI}} />
            <View style={styles.uplIconContainer}>
              <Icon
                style={styles.uploadIcon}
                name="camera"
                size={30}
                onPress={this.handleUploadPhoto}
              />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.photoContainer}>
        <View style={styles.profIconContainer}>
          <Icon
            style={styles.profileIcon}
            name="user-circle-o"
            size={150}
            color={colors.DARK_GREEN}
          />
          <View style={styles.uplIconContainer}>
            <Icon
              style={styles.uploadIcon}
              name="camera"
              size={30}
              onPress={this.handleUploadPhoto}
            />
          </View>
        </View>
      </View>
    );
  };

  handleEditProfileName = editedName => {
    this.props.navigation.setParams({name: editedName});
  };

  renderSub = () => {
    const {params} = this.props.navigation.state;

    return (
      <View style={styles.editProfContainer}>
        <View style={styles.editProfImg}>
          {this.showPhoto(params)}
          <View style={styles.editInputContainer}>
            <TextInput
              style={styles.editInputBar}
              onChangeText={name => this.handleEditProfileName(name)}
              value={params.name}
            />
          </View>
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
    width: '80%',
  },
  editProfContainer: {
    flex: 1,
  },
  editProfImg: {
    flex: 1,
  },
  profIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30,
  },
  showProfPhoto: {
    width: metrics.DEVICE_WIDTH / 2.2,
    height: metrics.DEVICE_WIDTH / 2.2,
    resizeMode: 'cover',
    borderRadius: metrics.DEVICE_WIDTH / 2.2 / 2,
  },
  profileIcon: {
    alignSelf: 'center',
    marginLeft: 15,
  },
  uplIconContainer: {
    justifyContent: 'flex-end',
  },
  uploadIcon: {
    marginLeft: -30,
  },
  editInputContainer: {
    borderWidth: 4,
  },
  editInputBar: {
    fontFamily: strings.FONT,
    fontSize: 20,
    padding: 10,
  },
});
