// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NavBar from './src/navbars/NarBar.js'
import NavBar_events from './src/navbars/NarBar_events.js'
import NavBar_account from './src/navbars/NarBar_account.js'

const Stack = createStackNavigator();

import HomeScreenEmpty from './src/screens/home/HomeScreenEmpty'
import Events from './src/screens/home/Events'
import Messages from './src/screens/home/Messages'
import Accounts from './src/screens/home/Accounts'
import Accountsone from './src/screens/home/Accountsone'
import  createnewtemplates from './src/screens/home/CreateNewTemplates'
import  CreateNewTemplateFilters from './src/screens/home/CreateNewTemplateFilters'
import  Details from './src/screens/home/Details'
import  DressCode from './src/screens/home/Dresscode'
import  DressCodetwo from './src/screens/home/Dresscodetwo'
import  FAQ from './src/screens/home/FAQ'
import  Signinpopup from './src/screens/home/Signinpopup'
import  RSVP from './src/screens/home/RSVP'
import  CreationSuccess from './src/screens/home/CreationSuccess'



export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="HomeScreenEmpty" component={HomeScreenEmpty}/>
        <Stack.Screen name="Events" component={Events}/>
        <Stack.Screen name="Messages" component={Messages}/>
        <Stack.Screen name="Accounts" component={Accounts}/>
        <Stack.Screen name="createnewtemplates" component={createnewtemplates}/>
        <Stack.Screen name="CreateNewTemplateFilters" component={CreateNewTemplateFilters}/>
        <Stack.Screen name="Details" component={Details}/>
        <Stack.Screen name="DressCode" component={DressCode}/>
        <Stack.Screen name="DressCodetwo" component={DressCodetwo}/>
        <Stack.Screen name="FAQ" component={FAQ}/>
        <Stack.Screen name="Signinpopup" component={Signinpopup}/>
        <Stack.Screen name="RSVP" component={RSVP}/>
        <Stack.Screen name="CreationSuccess" component={CreationSuccess}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
