import { headerOptions } from 'ping/src/styles/styles';
import React from 'react';

import BackChevron from 'ping/src/components/header/BackChevron';
import ScreenTitle from 'ping/src/components/header/ScreenTitle';
import SkipButton from 'ping/src/components/header/SkipButton';

import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from 'ping/src/screens/auth/SignInScreen';
import SignUpScreen from 'ping/src/screens/auth/SignUpScreen';
import PasswordResetScreen from 'ping/src/screens/auth/PasswordResetScreen';

const AuthStack = createStackNavigator();

import Form from './Form'

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={headerOptions}>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerRight: () => <SkipButton />,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerLeft: () => <BackChevron />,
          headerRight: () => <SkipButton />,
        }}
      />
      <AuthStack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{
          headerLeft: () => <BackChevron />,
          headerRight: () => <ScreenTitle title="Reset Password" />,
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
