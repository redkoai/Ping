import React from "react";
import { colors } from "ping/src/styles/styles";
import * as SplashScreen from "expo-splash-screen";
import { LogBox, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "ping/src/contexts/AuthContext";
import PropTypes from "prop-types";

import {
  useFonts,
  FiraSans_400Regular,
  FiraSans_500Medium,
  FiraSans_600SemiBold,
  FiraSans_700Bold,
} from "@expo-google-fonts/fira-sans";

import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import NavigationContainer from "ping/src/navigators/NavigationContainer";

import firebase from "firebase";
import "firebase/firestore";
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";


console.disableYellowBox = true;

const FIREBASE_CONFIG = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

!firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();

SplashScreen.preventAutoHideAsync().catch(() =>
  LogBox.ignoreLogs([
    "Unhandled promise rejection: Error: Native splash screen is already hidden.",
  ])
);

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
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={colors.primary}
          style={Platform.OS === "android" && "light"}
        />
        <NavigationContainer />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
