import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import pingLogo from 'ping/assets/pingLogo.png';
import googleLogo from 'ping/assets/Google_G_Logo.png';

import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { EmailInput, PasswordInput } from 'ping/src/components/CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';

const VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().required('required').email('must be email'),
  password: yup.string().required('required').min(6, 'must be 6 or more chars'),
});

function SignIn() {
  const { control, handleSubmit, errors, clearErrors } = useForm({
    resolver: yupResolver(VALIDATION_SCHEMA),
  });
  const onSubmit = (data) => {
    clearErrors;
    console.log(data);
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
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
      >
        <View style={styles.topBar}>
          <View />
          <TouchableOpacity onPress={() => console.log('skip pressed')}>
            <Text style={[textStyles.smallBold, styles.skipButton]}>SKIP</Text>
          </TouchableOpacity>
        </View>

        <Image source={pingLogo} style={styles.logo} />

        <View style={{ height: heightPercentageToDP(29) }} />

        <EmailInput control={control} errors={errors} />
        <PasswordInput control={control} errors={errors} forgotPassword />

        <View style={{ height: heightPercentageToDP(1.5) }} />

        <CustomButton
          text="Sign In"
          onPress={handleSubmit(onSubmit)}
          isPrimary={true}
        />
        <CustomButton
          icon={googleLogo}
          text="Sign in with Google"
          onPress={() => console.log('sign in with google pressed')}
        />

        <View style={styles.registerButton}>
          <Text style={[textStyles.smallRegular, { color: colors.offBlack }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => console.log('register pressed')}>
            <Text
              style={[textStyles.normalSemiBold, { color: colors.primary }]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    top: 12,
    width: widthPercentageToDP(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    color: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'relative',
    right: -10,
  },
  logo: {
    position: 'absolute',
    top: heightPercentageToDP(10),
    height: heightPercentageToDP(22),
    width: widthPercentageToDP(50),
    resizeMode: 'contain',
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

export default SignIn;
