// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NavBar from './src/navbars/NarBar.js'
import NavBar_events from './src/navbars/NarBar_events.js'

const Stack = createStackNavigator();

import HomeScreenEmpty from './src/screens/home/HomeScreenEmpty'
import Events from './src/screens/home/Events'
import Messages from './src/screens/home/Messages'


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
