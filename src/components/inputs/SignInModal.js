import React, { useState, useEffect } from 'react';

import CustomModal from 'ping/src/components/CustomModal';

import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import googleLogo from 'ping/assets/Google_G_Logo.png';
import  { useContext, useCallback } from 'react';
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


function SignInModal({ isVisible, onConfirm, onCancel,navigation }) {

  const { signInWithEmailAsync, signInWithGoogleAsync } = useContext(AuthContext);
  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const onSignInSuccess = () => {
    // navigation.navigate('HomeScreenEmpty');
  };
  const onSignInFailure = (errorMessage) => {
    alert(errorMessage);
  };


 

  return (
    <CustomModal isVisible={isVisible} onCancel={onCancel} title="Sign in to save draft">
      <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: widthPercentageToDP(3),
          resizeMode: 'contain',
          left: heightPercentageToDP('2')
        }}>
      <EmailInput control={control} errors={errors} />
        <PasswordInput
          control={control}
          errors={errors}
          
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
        <CustomButton
          icon={googleLogo}
          text="Continue with Google"
          onPress={async () => await signInWithGoogleAsync(onSignInSuccess, onSignInFailure)}
          shadow
        />
    </View>
    <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: widthPercentageToDP(30),
          resizeMode: 'contain',
          left: heightPercentageToDP('8')
        }}>
        <View style={styles.registerButton}>
          <Text style={[textStyles.smallRegular, { color: colors.offBlack }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[textStyles.normalSemiBold, { color: colors.primary }]}>Register</Text>
          </TouchableOpacity>
        
      
      </View>
      </View>
      
    </CustomModal>
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

export default SignInModal;
