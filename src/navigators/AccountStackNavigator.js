import React from 'react';
import { headerOptions } from 'ping/src/styles/styles';
import Accounts from 'ping/src/screens/home/Accounts';
import TabViewExample from 'ping/src/screens/home/TabViewExample';
import Accountsone from 'ping/src/screens/home/Accountsone';
import { createStackNavigator } from '@react-navigation/stack';
import settings from "ping/src/screens/home/account/settings.js"
import BackChevron from 'ping/src/components/header/BackChevron';

const AccountStack = createStackNavigator();

function AccountStackNavigator() {
  return (
    <AccountStack.Navigator screenOptions={headerOptions}>
    {/* <AccountStack.Screen name="Accounts" component={Accounts} /> */}
      <AccountStack.Screen name="TabViewExample" component={TabViewExample} 
      options={{
          headerLeft: () => <BackChevron />,
          
        }}/>
      <AccountStack.Screen name="Accountsone" component={Accountsone} />
      <AccountStack.Screen name="settings" component={settings} />
    </AccountStack.Navigator>
  );
}

export default AccountStackNavigator;
