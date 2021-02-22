import { colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import PingIcon from 'ping/src/icons/PingIcon';
import googleLogo from 'ping/assets/Google_G_Logo.png';

import React, { useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from 'ping/src/contexts/AuthContext';

import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Dimensions } from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';

import Spacer from 'ping/src/components/Spacer';
import { EmailInput, PasswordInput } from 'ping/src/components/inputs/CustomTextInput';
import CustomButton from 'ping/src/components/inputs/CustomButton';

function SignUpScreen() {
  const { signUpWithEmailAsync, signInWithGoogleAsync } = useContext(AuthContext);
  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const onSignUpSuccess = () => {
    // navigation.navigate('HomeScreenEmpty');
  };
  const onSignUpFailure = (errorMessage) => {
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
        <PasswordInput control={control} errors={errors} />
        <Spacer height={2} />

        <CustomButton
          text="Sign Up"
          onPress={handleSubmit(
            async (data) => await signUpWithEmailAsync(data, onSignUpSuccess, onSignUpFailure),
          )}
          primary
        />
        <CustomButton
          icon={googleLogo}
          text="Continue with Google"
          onPress={async () => await signInWithGoogleAsync(onSignUpSuccess, onSignUpFailure)}
        />
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
