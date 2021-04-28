import React from 'react';
import { headerOptions } from 'ping/src/styles/styles';
import Messages from 'ping/src/screens/home/Messages';
import Chat from 'ping/src/screens/home/messages/Chat'
import CreateNewMessage from 'ping/src/screens/home/messages/CreateNewMessage'
import ScreenTitle from 'ping/src/components/header/ScreenTitle';
import { createStackNavigator } from '@react-navigation/stack';
import BackChevron from 'ping/src/components/header/BackChevron';

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
       <MessagesStack.Screen 
      name="CreateNewMessage" 
      component={CreateNewMessage}
      options={{
        headerLeft: () => <BackChevron />,
        headerRight: () => <ScreenTitle title="Create New Message" />,
      }}
       />
       <MessagesStack.Screen 
      name="Chat" 
      component={Chat}
      options={{
        headerLeft: () => <BackChevron />,
        headerRight: () => <ScreenTitle title="Chat" />,
      }}
       />
    </MessagesStack.Navigator>
  );
}

export default MessagesStackNavigator;
