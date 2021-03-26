import React from 'react';
import { headerOptions } from 'ping/src/styles/styles';
import HomeScreenEmpty from 'ping/src/screens/home/HomeScreenEmpty';
import SecretCode from 'ping/src/screens/home/SecretCode';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={headerOptions}>
      <HomeStack.Screen name="HomeScreenEmpty" component={HomeScreenEmpty} />
      {/* <HomeStack.Screen name="SecretCode" component={SecretCode} /> */}
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
