import React from 'react';

import { headerOptions } from 'ping/src/styles/styles';
import BackChevron from 'ping/src/components/header/BackChevron';
import ScreenTitle from 'ping/src/components/header/ScreenTitle';
import SkipButton from 'ping/src/components/header/SkipButton';

import HomeScreenEmpty from 'ping/src/screens/home/HomeScreenEmpty';
import Events from 'ping/src/screens/home/Events';
import Messages from 'ping/src/screens/home/Messages';
import Accounts from 'ping/src/screens/home/Accounts';

import Details from 'ping/src/screens/home/new-invite-form/Details';
import createnewtemplates from 'ping/src/screens/home/new-invite-form/CreateNewTemplates';
import Dresscode from 'ping/src/screens/home/new-invite-form/Dresscode';
import FAQ from 'ping/src/screens/home/new-invite-form/FAQ';
import RSVP from 'ping/src/screens/home/new-invite-form/RSVP';

import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={headerOptions}>
      <HomeStack.Screen name="HomeScreenEmpty" component={HomeScreenEmpty} />
      <HomeStack.Screen name="Events" component={Events} />
      <HomeStack.Screen
        name="createnewtemplates"
        component={createnewtemplates}
        options={{
          headerLeft: () => <BackChevron />,
          headerRight: () => <ScreenTitle title="Templates" />,
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={Details}
        options={{
          headerLeft: () => <BackChevron />,
          headerRight: () => <ScreenTitle title="Details" />,
        }}
      />
      <HomeStack.Screen
        name="Dresscode"
        component={Dresscode}
        options={{
          headerLeft: () => <BackChevron />,
          headerRight: () => <ScreenTitle title="Dress Code" />,
        }}
      />
      <HomeStack.Screen
        name="FAQ"
        component={FAQ}
        options={{
          headerLeft: () => <BackChevron />,
          headerRight: () => <ScreenTitle title="FAQ'S" />,
        }}
      />
      <HomeStack.Screen
        name="RSVP"
        component={RSVP}
        options={{
          headerLeft: () => <BackChevron />,
          headerRight: () => <ScreenTitle title="RSVP Options" />,
        }}
      />
      <HomeStack.Screen name="Messages" component={Messages} />
      <HomeStack.Screen name="Accounts" component={Accounts} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
