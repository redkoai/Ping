import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';

import {
  useFonts,
  FiraSans_400Regular,
  FiraSans_500Medium,
  FiraSans_600SemiBold,
  FiraSans_700Bold,
} from '@expo-google-fonts/fira-sans';

// import 'react-native-gesture-handler';
import NavBar from './src/navbars/NarBar.js';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigators/NavigationContainer';

function App() {
  const [fontsLoaded] = useFonts({
    FiraSans_400Regular,
    FiraSans_500Medium,
    FiraSans_600SemiBold,
    FiraSans_700Bold,
  });
  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
