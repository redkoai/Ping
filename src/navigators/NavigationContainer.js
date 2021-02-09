import React, { useContext } from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';

import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from 'ping/src/navigators/AuthStackNavigator';
import HomeStackNavigator from 'ping/src/navigators/HomeStackNavigator';

function Navigation() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <HomeStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
