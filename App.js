// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NavBar from './src/navbars/NarBar.js'

const Stack = createStackNavigator();

import HomeScreenEmpty from './src/screens/home/HomeScreenEmpty'


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="HomeScreenEmpty" component={HomeScreenEmpty}/>
      </Stack.Navigator>
      {/* <View style={styles.container}>
        <Text>Ping</Text>
        <StatusBar style="auto" />
      </View> */}
      {/* <NavBar/> */}
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
