import React from 'react';
import { Platform } from 'react-native';
import { colors, textStyles } from 'ping/src/styles/styles';
import { heightPercentageToDP } from 'ping/util/scaler';

import HomeIcon from 'ping/src/icons/bottom-tabs/HomeIcon';
import EventsIcon from 'ping/src/icons/bottom-tabs/EventsIcon';
import NewInviteIcon from 'ping/src/icons/bottom-tabs/NewInviteIcon';
import MessagesIcon from 'ping/src/icons/bottom-tabs/MessagesIcon';
import AccountIcon from 'ping/src/icons/bottom-tabs/AccountIcon';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from 'ping/src/navigators/HomeStackNavigator';
import EventsStackNavigator from 'ping/src/navigators/EventsStackNavigator';
import NewInviteStackNavigator from 'ping/src/navigators/NewInviteStackNavigator';
import MessagesStackNavigator from 'ping/src/navigators/MessagesStackNavigator';
import AccountStackNavigator from 'ping/src/navigators/AccountStackNavigator';

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: 'white',
          height: heightPercentageToDP(Platform.OS === 'ios' ? 12 : 10),
        },
        tabStyle: {
          paddingTop: heightPercentageToDP(Platform.OS === 'ios' ? 1.8 : 2.5),
          paddingBottom: heightPercentageToDP(Platform.OS === 'ios' ? 2.2 : 2.8),
        },
        labelStyle: textStyles.tinyRegular,
        //iconStyle: {},
        activeTintColor: colors.primary,
        keyboardHidesTabBar: true,
        safeAreaInsets: { top: 10 },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarIcon: HomeIcon }}
      />
      <BottomTab.Screen
        name="Events"
        component={EventsStackNavigator}
        options={{ tabBarIcon: EventsIcon }}
      />
      <BottomTab.Screen
        name="NewInvite"
        component={NewInviteStackNavigator}
        options={{ tabBarIcon: NewInviteIcon, title: 'New Invite' }}
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesStackNavigator}
        options={{ tabBarIcon: MessagesIcon }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountStackNavigator}
        options={{ tabBarIcon: AccountIcon }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
