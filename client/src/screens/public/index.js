import {createStackNavigator} from 'react-navigation-stack';

import IntroScreen from './views/Intro';
import LoginScreen from './views/Login';
import RegisterScreen from './views/Register';

const AuthStack = createStackNavigator(
  {
    Intro: IntroScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    headerMode: 'none',
  },
);

export default AuthStack;
