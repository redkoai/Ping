import React from 'react';
import { headerOptions } from 'ping/src/styles/styles';
import Accounts from 'ping/src/screens/home/Accounts';
import { createStackNavigator } from '@react-navigation/stack';

const AccountStack = createStackNavigator();

function AccountStackNavigator() {
  return (
    <AccountStack.Navigator screenOptions={headerOptions}>
      <AccountStack.Screen name="Accounts" component={Accounts} />
    </AccountStack.Navigator>
  );
}

export default AccountStackNavigator;
