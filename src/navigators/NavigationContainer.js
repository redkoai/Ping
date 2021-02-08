import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from 'ping/src/screens/auth/SignIn';
import ResetPassword from 'ping/src/screens/auth/ResetPassword';
import SignUp from 'ping/src/screens/auth/SignUp';
import HomeScreenEmpty from 'ping/src/screens/home/HomeScreenEmpty';
import Events from 'ping/src/screens/home/Events';
import Messages from 'ping/src/screens/home/Messages';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HomeScreenEmpty" component={HomeScreenEmpty} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Messages" component={Messages} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
