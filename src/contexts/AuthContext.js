import React, { useState, useEffect } from 'react';

import 'firebase/firestore';
import firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Segment from 'expo-analytics-segment';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) setUser(user);
    });
  }, []);

  const singOutAsync = async () => {
    await firebase.auth().signOut();
  };

  const signUpwithEmailAsync = async (data, onLoginSuccess, onLoginFailure) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(onLoginSuccess())
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          onLoginFailure()('Weak Password!');
        } else {
          onLoginFailure()(errorMessage);
        }
      });
    Segment.identify(data.email);
    Segment.trackWithProperties('User SignIn', {
      accountType: 'CustomEmailAuth',
      email: data.email,
    });
  };

  const signInWithEmailAsync = async (data, onLoginSuccess, onLoginFailure) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(onLoginSuccess())
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          onLoginFailure('Weak Password!');
        } else {
          onLoginFailure(errorMessage);
        }
      });
  };

  const signInWithGoogleAsync = async (onLoginSuccess, onLoginFailure) => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      const data = await GoogleSignIn.GoogleAuthentication.prototype.toJSON();
      if (type === 'success') {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken,
        );
        const googleProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        onLoginSuccess();
      }
    } catch ({ message }) {
      alert('Login error:' + message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        singOutAsync,
        signUpwithEmailAsync,
        signInWithEmailAsync,
        signInWithGoogleAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
