import React from 'react';
import {StyleSheet, Share, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import ForYou from './views/ForYou';
import MyFavorite from './views/MyFavorite';
import MyProfile from './views/MyProfile';
import MyToon from './views/MyToon';
import MyToonDetail from './views/MyToonDetail';
import MyToonKingdom from './views/MyToonKingdom';
import CreateMyToon from './views/CreateMyToon';
import CreateEpisode from './views/CreateEpisode';
import EditMyToon from './views/EditMyToon';
import EditEpisode from './views/EditEpisode';
import EditMyProfile from './views/EditMyProfile';

import colors from '../../config/colors';
import strings from '../../config/strings';

const onShare = async shareMsg => {
  try {
    const result = await Share.share({
      message: shareMsg,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const ForYouStack = createStackNavigator({
  ForYou: {
    screen: ForYou,
    navigationOptions: () => ({
      header: null,
    }),
  },
  MyToonDetail: {
    screen: MyToonDetail,
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam('title', 'Detail'),
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="share-alt"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => onShare('Share')}
        />
      ),
    }),
  },
  MyToon: {
    screen: MyToon,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="share-alt"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => onShare('Share')}
        />
      ),
    }),
  },
});

ForYouStack.navigationOptions = ({navigation}) => {
  const {routes} = navigation.state;
  let tabBarVisible;

  if (routes.length > 1) {
    routes.map(route => {
      if (route.routeName === 'ForYou') {
        tabBarVisible = true;
      } else {
        tabBarVisible = false;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const MyFavoriteStack = createStackNavigator(
  {
    MyFavorite: {
      screen: MyFavorite,
    },
  },
  {
    headerMode: 'none',
  },
);

const MyProfileStack = createStackNavigator({
  MyProfile: {
    screen: MyProfile,
    navigationOptions: ({navigation}) => ({
      title: 'Profile',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerRight: (
        <Icon
          name="pencil"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {
            navigation.navigate('EditMyProfile', navigation.state.params);
          }}
        />
      ),
    }),
  },
  EditMyProfile: {
    screen: EditMyProfile,
    navigationOptions: ({navigation}) => ({
      title: 'Edit Profile',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {
            navigation.navigate('MyProfile', navigation.state.params);
          }}
        />
      ),
    }),
  },
  MyToonKingdom: {
    screen: MyToonKingdom,
    navigationOptions: ({navigation}) => ({
      title: 'My Toon Kingdom',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    }),
  },
  CreateMyToon: {
    screen: CreateMyToon,
    navigationOptions: ({navigation}) => ({
      title: 'Create My Toon',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {}}
        />
      ),
    }),
  },
  CreateEpisode: {
    screen: CreateEpisode,
    navigationOptions: ({navigation}) => ({
      title: 'Create Episode',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {}}
        />
      ),
    }),
  },
  EditMyToon: {
    screen: EditMyToon,
    navigationOptions: ({navigation}) => ({
      title: 'Edit My Toon',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {}}
        />
      ),
    }),
  },
  EditEpisode: {
    screen: EditEpisode,
    navigationOptions: ({navigation}) => ({
      title: 'Edit Episode',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {}}
        />
      ),
    }),
  },
});

MyProfileStack.navigationOptions = ({navigation}) => {
  const {routes} = navigation.state;
  let tabBarVisible;

  if (routes.length > 1) {
    routes.map(route => {
      if (
        route.routeName === 'MyProfile' ||
        route.routeName === 'EditMyProfile'
      ) {
        tabBarVisible = true;
      } else {
        tabBarVisible = false;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const AppStack = createBottomTabNavigator(
  {
    ForYou: ForYouStack,
    MyFavorite: MyFavoriteStack,
    MyProfile: MyProfileStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;

        if (routeName === 'ForYou')
          return (
            <Icon
              name="th-large"
              size={28}
              color={focused ? colors.DARK_GREEN : colors.SILVER}
            />
          );
        else if (routeName == 'MyFavorite')
          return (
            <Icon
              name="heart"
              size={28}
              color={focused ? colors.TORCH_RED : colors.SILVER}
            />
          );
        else
          return (
            <Icon
              name="user"
              size={28}
              color={focused ? colors.BLUE : colors.SILVER}
            />
          );
      },
      tabBarLabel: ({focused, tintColor}) => {
        const {routeName} = navigation.state;

        if (routeName === 'ForYou')
          return (
            <Text
              style={[
                styles.labelStyle,
                {color: focused ? colors.DARK_GREEN : colors.SILVER},
              ]}>
              {strings.FORYOU}
            </Text>
          );
        else if (routeName == 'MyFavorite')
          return (
            <Text
              style={[
                styles.labelStyle,
                {color: focused ? colors.TORCH_RED : colors.SILVER},
              ]}>
              {strings.MYFAV}
            </Text>
          );
        else
          return (
            <Text
              style={[
                styles.labelStyle,
                {color: focused ? colors.BLUE : colors.SILVER},
              ]}>
              {strings.PROFILE}
            </Text>
          );
      },
    }),
  },
);

const styles = StyleSheet.create({
  headerLeftIcon: {
    marginLeft: 10,
  },
  headerRightIcon: {
    marginRight: 10,
  },
  labelStyle: {
    fontFamily: strings.FONT,
    fontSize: 14,
    alignSelf: 'center',
    marginTop: -6,
    marginBottom: 3,
  },
});

export default AppStack;
