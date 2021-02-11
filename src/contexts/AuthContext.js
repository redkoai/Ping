import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { LogBox } from 'react-native';

import 'firebase/firestore';
import firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Segment from 'expo-analytics-segment';
import { IOS_RESERVED_CLIENT_ID } from '@env';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Google SSO Initialization
    GoogleSignIn.initAsync({ clientId: IOS_RESERVED_CLIENT_ID });
    // Possible Unhandled Promise Rejection: Invariant Violation: expo-google-sign-in is not supported in the Expo Client because a custom URL scheme is required at build time. Please refer to the docs for usage outside of Expo www.npmjs.com/package/expo-google-sign-in
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
    // Firebase Auth Initialization
    firebase.auth().onAuthStateChanged(async (user) => {
      SplashScreen.hideAsync();
      if (user != null) setUser(user);
    });
  }, []);

  const singOutAsync = async (handleSuccess, handleFailure) => {
    try {
      await firebase.auth().signOut();
      setUser(null);
      setSkipped(false);
      handleSuccess();
    } catch ({ message }) {
      handleFailure(message);
    }
  };

  const signUpWithEmailAsync = async (data, handleSuccess, handleFailure) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(handleSuccess())
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          handleFailure()('Weak Password!');
        } else {
          handleFailure()(errorMessage);
        }
      });
    Segment.identify(data.email);
    Segment.trackWithProperties('User SignIn', {
      accountType: 'CustomEmailAuth',
      email: data.email,
    });
  };

  const signInWithEmailAsync = async (data, handleSuccess, handleFailure) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(handleSuccess())
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          handleFailure('Weak Password!');
        } else {
          handleFailure(errorMessage);
        }
      });
  };

  const passwordResetEmailAsync = async (
    data,
    handleSuccess,
    handleFailure,
  ) => {
    await firebase
      .auth()
      .sendPasswordResetEmail(data.email)
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          handleFailure('Weak Password!');
        } else {
          handleFailure(errorMessage);
        }
      });
  };

  const signInWithGoogleAsync = async (handleSuccess, handleFailure) => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          user.auth.idToken,
          user.auth.accessToken,
        );
        await firebase.auth().signInWithCredential(credential);
        handleSuccess();
      }
    } catch ({ message }) {
      alert('Login error: ' + message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        skipped,
        setSkipped,
        singOutAsync,
        signUpWithEmailAsync,
        signInWithEmailAsync,
        signInWithGoogleAsync,
        passwordResetEmailAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
