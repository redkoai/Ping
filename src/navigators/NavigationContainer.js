import React, { useContext } from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';

import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from 'ping/src/navigators/AuthStackNavigator';
import BottomTabNavigator from 'ping/src/navigators/BottomTabNavigator';

function Navigation() {
  const { user, skipped } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user || skipped ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
