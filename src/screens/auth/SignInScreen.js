import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import PingLogo from 'ping/src/icons/PingLogo';
import googleLogo from 'ping/assets/Google_G_Logo.png';

import React, { useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from 'ping/src/contexts/AuthContext';

import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';

import Spacer from 'ping/src/components/Spacer';
import { EmailInput, PasswordInput } from 'ping/src/components/CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';

function SignInScreen({ navigation }) {
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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: Math.round(Dimensions.get('window').height),
      }}
    >
      <StatusBar backgroundColor={colors.primary} />

      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
        <PingLogo height={heightPercentageToDP(20)} fill={colors.primary} style={styles.logo} />
        <Spacer height={7} />

        <EmailInput control={control} errors={errors} />
        <PasswordInput
          control={control}
          errors={errors}
          forgotPassword={() => navigation.navigate('PasswordReset')}
        />
        <Spacer height={2.5} />

        {formState.isSubmitting && (
          <View>
            <ActivityIndicator size={'large'} color={colors.primary} />
          </View>
        )}

        <CustomButton
          text="Sign In"
          onPress={handleSubmit(
            async (data) => await signInWithEmailAsync(data, onSignInSuccess, onSignInFailure),
          )}
          isPrimary={true}
        />
        <CustomButton
          icon={googleLogo}
          text="Sign in with Google"
          onPress={async () => await signInWithGoogleAsync(onSignInSuccess, onSignInFailure)}
        />

        <View style={styles.registerButton}>
          <Text style={[textStyles.smallRegular, { color: colors.offBlack }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[textStyles.normalSemiBold, { color: colors.primary }]}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
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
    bottom: 85 + widthPercentageToDP(Platform.OS === "ios" ? 2 : 1),
    flexDirection: 'row',
    width: 195,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SignInScreen;
