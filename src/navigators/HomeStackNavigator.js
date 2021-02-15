import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreenEmpty from 'ping/src/screens/home/HomeScreenEmpty';
import Events from 'ping/src/screens/home/Events';
import Messages from 'ping/src/screens/home/Messages';
import Accounts from 'ping/src/screens/home/Accounts';
import Accountsone from 'ping/src/screens/home/Accountsone';
import createnewtemplates from 'ping/src/screens/home/CreateNewTemplates';
import CreateNewTemplateFilters from 'ping/src/screens/home/CreateNewTemplateFilters';
import Details from 'ping/src/screens/home/Details';
import DressCode from 'ping/src/screens/home/Dresscode';
import DressCodetwo from 'ping/src/screens/home/Dresscodetwo';
import FAQ from 'ping/src/screens/home/FAQ';
import Signinpopup from 'ping/src/screens/home/Signinpopup';
import RSVP from 'ping/src/screens/home/RSVP';
import CreationSuccess from 'ping/src/screens/home/CreationSuccess';

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreenEmpty" component={HomeScreenEmpty} />
      <HomeStack.Screen name="Events" component={Events} />
      <HomeStack.Screen name="Messages" component={Messages} />
      <HomeStack.Screen name="Accounts" component={Accounts} />
      <HomeStack.Screen name="createnewtemplates" component={createnewtemplates} />
      <HomeStack.Screen name="CreateNewTemplateFilters" component={CreateNewTemplateFilters} />
      <HomeStack.Screen name="Details" component={Details} />
      <HomeStack.Screen name="DressCode" component={DressCode} />
      <HomeStack.Screen name="DressCodetwo" component={DressCodetwo} />
      <HomeStack.Screen name="FAQ" component={FAQ} />
      <HomeStack.Screen name="Signinpopup" component={Signinpopup} />
      <HomeStack.Screen name="RSVP" component={RSVP} />
      <HomeStack.Screen name="CreationSuccess" component={CreationSuccess} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
