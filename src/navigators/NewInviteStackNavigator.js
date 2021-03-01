import React from 'react';
import { NewInviteProvider } from 'ping/src/contexts/NewInviteContext';

import { headerOptions } from 'ping/src/styles/styles';
import BackChevron from 'ping/src/components/header/BackChevron';
import ScreenTitle from 'ping/src/components/header/ScreenTitle';

import { createStackNavigator } from '@react-navigation/stack';
import Details from 'ping/src/screens/home/new-invite-form/Details';
import createnewtemplates from 'ping/src/screens/home/new-invite-form/CreateNewTemplates';
import Dresscode from 'ping/src/screens/home/new-invite-form/Dresscode';
import FAQ from 'ping/src/screens/home/new-invite-form/FAQ';
import RSVP from 'ping/src/screens/home/new-invite-form/RSVP';

const NewInviteStack = createStackNavigator();

function NewInviteStackNavigator() {
  return (
    <NewInviteProvider>
      <NewInviteStack.Navigator screenOptions={headerOptions}>
        <NewInviteStack.Screen
          name="createnewtemplates"
          component={createnewtemplates}
          options={{
            headerLeft: () => <BackChevron />,
            headerRight: () => <ScreenTitle title="Templates" />,
          }}
        />
        <NewInviteStack.Screen
          name="Details"
          component={Details}
          options={{
            headerLeft: () => <BackChevron />,
            headerRight: () => <ScreenTitle title="Details" />,
          }}
        />
        <NewInviteStack.Screen
          name="Dresscode"
          component={Dresscode}
          options={{
            headerLeft: () => <BackChevron />,
            headerRight: () => <ScreenTitle title="Dress Code" />,
          }}
        />
        <NewInviteStack.Screen
          name="FAQ"
          component={FAQ}
          options={{
            headerLeft: () => <BackChevron />,
            headerRight: () => <ScreenTitle title="FAQ'S" />,
          }}
        />
        <NewInviteStack.Screen
          name="RSVP"
          component={RSVP}
          options={{
            headerLeft: () => <BackChevron />,
            headerRight: () => <ScreenTitle title="RSVP Options" />,
          }}
        />
      </NewInviteStack.Navigator>
    </NewInviteProvider>
  );
}

export default NewInviteStackNavigator;
