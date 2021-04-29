import React from "react";
import { NewInviteProvider } from "ping/src/contexts/NewInviteContext";
// import {SampleContexntProvider} from './../contexts/SampleContext';

import { headerOptions } from "ping/src/styles/styles";
import BackChevron from "ping/src/components/header/BackChevron";
import ScreenTitle from "ping/src/components/header/ScreenTitle";

import { createStackNavigator } from "@react-navigation/stack";
import Details from "ping/src/screens/home/new-invite-form/Details";
import createnewtemplates from "ping/src/screens/home/new-invite-form/CreateNewTemplates";
import Dresscode from "ping/src/screens/home/new-invite-form/Dresscode";
import FAQ from "ping/src/screens/home/new-invite-form/FAQ";
import People from "ping/src/screens/home/new-invite-form/People";
import RSVP from "ping/src/screens/home/new-invite-form/RSVP";
import Signinpopup from "ping/src/screens/home/Signinpopup";
import MyEvents from "ping/src/screens/home/new-invite-form/MyEvents";
import EventInvited from "ping/src/screens/home/new-invite-form/EventInvited";
import MyEventsGoing from "../screens/home/new-invite-form/MyEventsGoing";
import MyEventsInvited from "../screens/home/new-invite-form/MyEventsInvited";
import MyEventsDeclined from "../screens/home/new-invite-form/MyEventsDeclined";
import SecretCode from "ping/src/screens/home/SecretCode";
import EventsStackNavigator from "ping/src/navigators/EventsStackNavigator";
const NewInviteStack = createStackNavigator();

function NewInviteStackNavigator() {
  return (
    <NewInviteProvider>
      <NewInviteStack.Navigator
        screenOptions={({ route }) => ({
          tabBarButton: ["Events"].includes(route.name)
            ? () => {
                return null;
              }
            : undefined,
        })}
        ßscreenOptions={headerOptions}
      >
        <NewInviteStack.Screen
          name="createnewtemplates"
          component={createnewtemplates}
          options={{
            headerLeft: () => <BackChevron />,
            headerRight: () => <ScreenTitle title="Templates" />,
          }}
        />
        <NewInviteStack.Screen
          name="Events"
          component={EventsStackNavigator}
          options={{
            headerLeft: () => <BackChevron />,
            title: "Onboarding",
            headerShown: false,
            keyboardHidesTabBar: true,
            tabBarVisible: false,

            tabBarOptions: {
              visible: false,
            },
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
          name="People"
          component={People}
          options={{
            headerLeft: () => <BackChevron />,
            headerRight: () => <ScreenTitle title="People" />,
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

        <NewInviteStack.Screen
          name="EventInvited"
          component={EventInvited}
          options={{
            headerLeft: () => <BackChevron text="RSVP" />,
          }}
        />
        {/* <NewInviteStack.Screen
          name="MyEventsInvited"
          component={MyEventsInvited}
          options={{
            
          }}
        />  
         <NewInviteStack.Screen
          name="MyEventsGoing"
          component={MyEventsGoing}
          options={{
            
          }}
        />  
         <NewInviteStack.Screen
          name="MyEventsDeclined"
          component={MyEventsDeclined}
          options={{
            
          }}
        />   */}

        <NewInviteStack.Screen
          name="MyEvents"
          component={MyEvents}
          options={{
            headerLeft: () => <BackChevron text="My Events" />,
            headerRight: () => <ScreenTitle title="Events" />,
          }}
        />

        <NewInviteStack.Screen
          name="Signinpopup"
          component={Signinpopup}
          options={
            {
              // headerLeft: () => <BackChevron />,
              // headerRight: () => <ScreenTitle title="RSVP Options" />,
            }
          }
        />

        <NewInviteStack.Screen
          name="SecretCode"
          component={SecretCode}
          options={{
            headerLeft: () => <BackChevron />,
            // headerRight: () => <ScreenTitle title="RSVP Options" />,
          }}
        />
      </NewInviteStack.Navigator>
    </NewInviteProvider>
  );
}

export default NewInviteStackNavigator;
