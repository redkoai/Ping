import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenEmpty from 'ping/src/screens/home/HomeScreenEmpty';
import Events from 'ping/src/screens/home/Events';
import Messages from 'ping/src/screens/home/Messages';

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreenEmpty" component={HomeScreenEmpty} />
      <HomeStack.Screen name="Events" component={Events} />
      <HomeStack.Screen name="Messages" component={Messages} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
