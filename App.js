// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import NavBar from './src/navbars/NarBar.js'

// const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Ping</Text>
        <StatusBar style="auto" />
      </View>
      <NavBar/>
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
