import React from 'react';
import { headerOptions } from 'ping/src/styles/styles';
import Events from 'ping/src/screens/home/Events';
import { createStackNavigator } from '@react-navigation/stack';

const EventsStack = createStackNavigator();

function EventsStackNavigator() {
  return (
    <EventsStack.Navigator screenOptions={headerOptions}>
      <EventsStack.Screen name="Events" component={Events} />
    </EventsStack.Navigator>
  );
}

export default EventsStackNavigator;
