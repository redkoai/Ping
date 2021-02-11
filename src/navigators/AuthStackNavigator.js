import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from 'ping/src/screens/auth/SignInScreen';
import SignUpScreen from 'ping/src/screens/auth/SignUpScreen';
import PasswordResetScreen from 'ping/src/screens/auth/PasswordResetScreen';

const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="PasswordReset" component={PasswordResetScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
