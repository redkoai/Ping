import React, { useContext } from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';

import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from 'ping/src/screens/auth/LoadingScreen';
import SignInScreen from 'ping/src/screens/auth/SignInScreen';
import SignUpScreen from 'ping/src/screens/auth/SignUpScreen';
import PasswordResetScreen from 'ping/src/screens/auth/PasswordResetScreen';

const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  const { isLoading } = useContext(AuthContext);

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoading ? (
        <AuthStack.Screen name="Loading" component={LoadingScreen} />
      ) : (
        <>
          <AuthStack.Screen name="SignIn" component={SignInScreen} />
          <AuthStack.Screen name="SignUp" component={SignUpScreen} />
          <AuthStack.Screen
            name="PasswordReset"
            component={PasswordResetScreen}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
