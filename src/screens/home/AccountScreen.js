import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';

import React, { useContext } from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';

import { StatusBar, SafeAreaView, View, Text } from 'react-native';

import TopBar from 'ping/src/components/TopBar';
import CustomButton from 'ping/src/components/CustomButton';
import NavBar from 'ping/src/navbars/NarBar';

function AccountScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  console.log(user);

  const onSuccess = () => {
    navigation.navigate('SignIn');
  }
  const onFailure = (errorMessage) => {
    alert(errorMessage)
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <TopBar>
          <Text style={textStyles.bigBold}>Account</Text>
          {/* <Text style={textStyles.bigBold}>{user}</Text> */}
        </TopBar>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StatusBar backgroundColor={colors.primary} />

          <CustomButton
            text="Sign Out"
            onPress={async () => await singOutAsync(onSuccess, onFailure)}
            isPrimary={true}
          />
        </View>
      </SafeAreaView>
      <NavBar />
    </>
  );
}

export default AccountScreen;
