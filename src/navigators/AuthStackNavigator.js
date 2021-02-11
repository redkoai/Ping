import React from 'react';
import { View } from 'react-native';

import TopBar from 'ping/src/components/header/TopBar';
import BackChevron from 'ping/src/components/header/BackChevron';
import ScreenTitle from 'ping/src/components/header/ScreenTitle';
import SkipButton from 'ping/src/components/header/SkipButton';

import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from 'ping/src/screens/auth/SignInScreen';
import SignUpScreen from 'ping/src/screens/auth/SignUpScreen';
import PasswordResetScreen from 'ping/src/screens/auth/PasswordResetScreen';

const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          header: () => (
            <TopBar>
              <View />
              <SkipButton />
            </TopBar>
          ),
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          header: () => (
            <TopBar>
              <BackChevron />
              <ScreenTitle title="Reset Password" />
            </TopBar>
          ),
        }}
      />
      <AuthStack.Screen
        name="PasswordReset"
        component={PasswordResetScreen}
        options={{
          header: () => (
            <TopBar>
              <BackChevron />
              <SkipButton />
            </TopBar>
          ),
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
