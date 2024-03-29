import React from "react";
import { headerOptions } from "ping/src/styles/styles";
import HomeScreenEmpty from "ping/src/screens/home/HomeScreenEmpty";
import SecretCode from "ping/src/screens/home/SecretCode";
import { createStackNavigator } from "@react-navigation/stack";
import addFriends from "ping/src/screens/home/addFriends.js";
import EventsStackNavigator from "ping/src/navigators/EventsStackNavigator";
import MyInvite from "ping/src/screens/home/Invites/MyInvite";

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={headerOptions}>
      <HomeStack.Screen name="HomeScreenEmpty" component={HomeScreenEmpty} />
      <HomeStack.Screen name="addFriends" component={addFriends} />
      {/* <HomeStack.Screen name="MyInvite" component={MyInvite} /> */}
      {/* <HomeStack.Screen name="SecretCode" component={SecretCode} /> */}
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
