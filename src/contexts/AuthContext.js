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

  const signUpwithEmailAsync = async (data, handleSuccess, handleFailure) => {
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

  const signInWithGoogleAsync = async (handleSuccess, handleFailure) => {
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
        handleSuccess();
      }
    } catch ({ message }) {
      alert('Login error:' + message);
    }
  };

  const passwordResetEmailAsync = async (data, handleSuccess, handleFailure) => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        singOutAsync,
        signUpwithEmailAsync,
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
