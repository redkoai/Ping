import React from 'react';
import { headerOptions } from 'ping/src/styles/styles';
import Messages from 'ping/src/screens/home/Messages';
import ScreenTitle from 'ping/src/components/header/ScreenTitle';
import { createStackNavigator } from '@react-navigation/stack';

const MessagesStack = createStackNavigator();

function MessagesStackNavigator() {
  return (
    <MessagesStack.Navigator screenOptions={headerOptions}>
      <MessagesStack.Screen 
      name="Messages" 
      component={Messages}
      options={{
        headerLeft: () => <ScreenTitle title="Messages" />,
      }}
       />
    </MessagesStack.Navigator>
  );
}

export default MessagesStackNavigator;
