import { colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import PingIcon from 'ping/src/icons/PingIcon';

import React, { useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from 'ping/src/contexts/AuthContext';

import {
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EMAIL_SCHEMA } from 'ping/src/schema/authSchema';

import Spacer from 'ping/src/components/Spacer';
import { EmailInput } from 'ping/src/components/CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';

function PasswordResetScreen() {
  const { passwordResetEmailAsync } = useContext(AuthContext);
  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(EMAIL_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const onResetSuccess = () => {
    // navigation.navigate('SignIn');
  };
  const onResetFailure = (errorMessage) => {
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
      <StatusBar backgroundColor={colors.primary} />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={-240}
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <PingIcon size={heightPercentageToDP(20)} color={colors.primary} style={styles.logo} />
        <Spacer height={8} />

        <EmailInput control={control} errors={errors} />
        <Spacer height={1} />

        {formState.isSubmitting && (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        )}

        <CustomButton
          text="Send Email"
          onPress={handleSubmit(
            async (data) => await passwordResetEmailAsync(data, onResetSuccess, onResetFailure),
          )}
          isPrimary={true}
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
});

export default PasswordResetScreen;
