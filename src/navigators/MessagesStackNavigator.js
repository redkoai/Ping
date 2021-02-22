import React from 'react';
import { headerOptions } from 'ping/src/styles/styles';
import Messages from 'ping/src/screens/home/Messages';
import { createStackNavigator } from '@react-navigation/stack';

const MessagesStack = createStackNavigator();

function MessagesStackNavigator() {
  return (
    <MessagesStack.Navigator screenOptions={headerOptions}>
      <MessagesStack.Screen name="Messages" component={Messages} />
    </MessagesStack.Navigator>
  );
}

export default MessagesStackNavigator;
