import React, { useState, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import 'firebase/firestore';
import firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Segment from 'expo-analytics-segment';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [skipped, setSkipped] = useState(false);

  const db = firebase.database().ref("users")
  // console.log("db = ", db)
  // const sendUser = (users) => {
  //   const currentUser = {
  //     email: users.email
  //   }
  //   return(currentUser)
  // }

  // console.log("current user = ", currentUser)
  // sendUser(user)

  // const checkUserExist = (email) => {

  // }

  // db.orderByChild("email").equalTo(email).once("value").then(snapshot => {
  //   if (snapshot.val()) {
  //     console.log("user exists!")
  //   } else {
  //     console.log("user does not exist")
  //   }
  // })

  // console.log(db.orderByChild("email"))




  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // db.push({"email":user.email, "uid": user.uid})
      // console.log("user =", user.email)
      if (user != null) setUser(user);
      await SplashScreen.hideAsync();
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
      // console.log(data)
      .then(handleSuccess)
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          handleFailure()('Weak Password!');
        } else {
          handleFailure()(errorMessage);
        }
      });
    // const credential = await firebase.auth.EmailAuthProvider.credential(data.email, data.password);
    // await firebase
    //   .auth()
    //   .currentUser.linkWithCredential(credential)
    //   .then((usercred) => {
    //     const user = usercred.user;
    //     alert('Account linking success' + user);
    //   })
    //   .catch(({ message }) => {
    //     alert('Account linking error: ' + message);
    //   });
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
      .then(handleSuccess)
      .then(() => setSkipped(false))
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

  const signInWithGoogleAsync = async (handleSuccess, handleFailure) => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          user.auth.idToken,
          user.auth.accessToken,
        );
        await firebase.auth().signInWithCredential(credential);
        // await firebase
        //   .auth()
        //   .currentUser.linkWithCredential(credential)
        //   .then(async (linkResult) => {
        //     await firebase.auth().signInWithCredential(linkResult.credential);
        //   })
        //   .catch(({ message }) => {
        //     alert('Account linking error: ' + message);
        //   });
        handleSuccess();
      }
    } catch ({ message }) {
      handleFailure('Login error: ' + message);
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
        passwordResetEmailAsync,
        signInWithGoogleAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
