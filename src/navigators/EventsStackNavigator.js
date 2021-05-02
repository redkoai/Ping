import React from 'react';
import { headerOptions } from 'ping/src/styles/styles';
import Events from 'ping/src/screens/home/Events';
import { createStackNavigator } from '@react-navigation/stack';
import BackChevron from 'ping/src/components/header/BackChevron';
import ScreenTitle from 'ping/src/components/header/ScreenTitle';
import MyInvite from 'ping/src/screens/home/Invites/MyInvite.js'


const EventsStack = createStackNavigator();

function EventsStackNavigator() {
  return (
    <EventsStack.Navigator screenOptions={headerOptions}>
      <EventsStack.Screen 
      name="Events" 
      component={Events}
      options={{
        headerLeft: () => <BackChevron />,
        headerRight: () => <ScreenTitle title="Events" />,
      }} 
      />
      <EventsStack.Screen 
      name="MyInvite" 
      component={MyInvite}
      options={{
        headerLeft: () => <BackChevron />,
        headerRight: () => <ScreenTitle title="My Invite" />,
      }} 
      />
    </EventsStack.Navigator>
  );
}

export default EventsStackNavigator;
