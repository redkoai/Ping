import React, { useContext, useEffect } from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';

import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from 'ping/src/navigators/AuthStackNavigator';
import HomeStackNavigator from 'ping/src/navigators/HomeStackNavigator';

function Navigation() {
  const { user, skipped } = useContext(AuthContext);

  useEffect(() => {
    console.log("================")
    console.log(user);
  });

  return (
    <NavigationContainer>
      {user || skipped ? <HomeStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
