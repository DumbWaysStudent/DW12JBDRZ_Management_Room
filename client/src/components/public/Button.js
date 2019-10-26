import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import {MaterialIndicator} from 'react-native-indicators';

import colors from '../../config/colors';
import strings from '../../config/strings';

export default class Button extends Component {
  render() {
    const {disabled, label, isLoading, onPress} = this.props;
    const containerStyle = [
      styles.container,
      disabled ? styles.containerDisabled : styles.containerEnabled,
    ];
    let content;

    if (isLoading) {
      return (
        <View style={styles.indicatorCont}>
          <MaterialIndicator color={colors.WHITE} size={30} />
        </View>
      );
    } else {
      content = <Text style={styles.text}>{label}</Text>;
    }

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        disabled={disabled}>
        {content}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  indicatorCont: {
    flex: 1,
    backgroundColor: colors.GREEN,
    paddingVertical: 22.5,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.GREEN,
    paddingVertical: 12,
  },
  containerEnabled: {
    opacity: 1,
  },
  containerDisabled: {
    opacity: 0.3,
  },
  text: {
    color: colors.WHITE,
    fontFamily: strings.FONT,
    fontSize: 20,
  },
});
