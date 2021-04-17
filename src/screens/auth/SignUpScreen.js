import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import PingIcon from 'ping/src/icons/PingIcon';
import googleLogo from 'ping/assets/Google_G_Logo.png';
import firebase from 'firebase';

import React, { useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from 'ping/src/contexts/AuthContext';

import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Dimensions, View,Text, TouchableOpacity } from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';

import Spacer from 'ping/src/components/Spacer';
import { EmailInput, PasswordInput, UserNameInput } from 'ping/src/components/inputs/CustomTextInput';
import CustomButton from 'ping/src/components/inputs/CustomButton';

function SignUpScreen() {
  const db = firebase.database().ref("users")
  const { signUpWithEmailAsync, signInWithGoogleAsync } = useContext(AuthContext);
  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));
  

  const onSignUpSuccess = (user) => {
    // console.log("user = ", user)
    db.child(user.user.uid).set({"email" : user.user.email})
    // db.push({"email":user.user.email, "uid": user.user.uid, "messages":{}})
    // db.child(`${user.user.uid}/messages`).push({text: "text", timestamp: "timestamp"})
    // db.child(`${user.user.uid}/messages`).push({text: "text2", timestamp: "timestamp2"})
    console.log("user info pushed")
    console.log("user success =", user)
    // navigation.navigate('HomeScreenEmpty');
  };
  const onSignUpFailure = (errorMessage) => {
    console.log("user failure = ", user)
    console.log("error message = ", errorMessage)
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

        <UserNameInput control={control} errors={errors} />
        <EmailInput control={control} errors={errors} />
        <PasswordInput control={control} errors={errors} />
       
        <Spacer height={2} />

        <CustomButton
          text="Sign Up"
          onPress={handleSubmit(
            async (data) => await signUpWithEmailAsync(data, onSignUpSuccess, onSignUpFailure),
          )}
          primary
        />
        {/* <CustomButton
          icon={googleLogo}
          text="Continue with Google"
          onPress={async () => await signInWithGoogleAsync(onSignUpSuccess, onSignUpFailure)}
        /> */}
        <View style={styles.registerButton}>
          <Text style={[textStyles.smallRegular, { color: colors.offBlack }]}>
            Have an account? 
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={[textStyles.normalSemiBold, { color: colors.primary }]}>Sign In</Text>
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
    bottom: heightPercentageToDP(3),
    flexDirection: 'row',
    width: widthPercentageToDP(50),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SignUpScreen;
