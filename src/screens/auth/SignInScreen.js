import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import PingIcon from 'ping/src/icons/PingIcon';
import googleLogo from 'ping/assets/Google_G_Logo.png';

import React, { useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from 'ping/src/contexts/AuthContext';

import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';

import Spacer from 'ping/src/components/Spacer';
import { EmailInput, PasswordInput } from 'ping/src/components/inputs/CustomTextInput';
import CustomButton from 'ping/src/components/inputs/CustomButton';

import firebase from 'firebase';

function SignInScreen({ navigation }) {
  const { signInWithEmailAsync, signInWithGoogleAsync} = useContext(AuthContext);
  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  // const db = firebase.database().ref("users")
  // console.log("user = ", user)
  // console.log("user.email =", user.email)
  const onSignInSuccess = () => {
    // console.log("user = ", user)
    // db.push({"email":user.email, "uid": user.uid, "messages":{}})
    // console.log("user info pushed")
    // console.log("user.email =", user.email)
    // navigation.navigate('HomeScreenEmpty');
  };
  const onSignInFailure = (errorMessage) => {
    // console.log("user failure =", user)
    alert(errorMessage);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: Math.round(Dimensions.get('window').height),
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={-240}
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <PingIcon size={heightPercentageToDP(20)} color={colors.primary} style={styles.logo} />
        <Spacer height={6.5} />

        <EmailInput control={control} errors={errors} />
        <PasswordInput
          control={control}
          errors={errors}
          forgotPassword={() => navigation.navigate('PasswordReset')}
        />
        <Spacer height={2} />

        <CustomButton
          text="Sign In"
          onPress={handleSubmit(
            async (data) => await signInWithEmailAsync(data, onSignInSuccess, onSignInFailure),
          )}
          primary
          shadow
        />
        {/* <CustomButton
          icon={googleLogo}
          text="Continue with Google"
          onPress={async () => await signInWithGoogleAsync(onSignInSuccess, onSignInFailure)}
          shadow
        /> */}

        <View style={styles.registerButton}>
          <Text style={[textStyles.smallRegular, { color: colors.offBlack }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[textStyles.normalSemiBold, { color: colors.primary }]}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: 'relative',
    left: widthPercentageToDP(2),
    top: heightPercentageToDP(2),
  },
  registerButton: {
    position: 'absolute',
    bottom: widthPercentageToDP(2) + 85,
    flexDirection: 'row',
    width: 195,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SignInScreen;
