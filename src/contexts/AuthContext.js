import React, { useState, useEffect } from 'react';
import * as GoogleSignIn from 'expo-google-sign-in';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(googleInitAsync, []);

  const googleInitAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: process.env.GOOGLE_CLIENT_ID,
    });
    _googleSyncUserWithStateAsync();
  };

  const _googleSyncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    setUser(user);
  };

  const googleSignOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setUser(null);
  };

  const googleSignInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        _googleSyncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignInAsync,
        googleSignOutAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
