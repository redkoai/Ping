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
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  Platform,
} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

import { useForm } from 'react-hook-form';
import CustomTextInput from 'ping/src/components/CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';

function SignIn() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}
    >
      <StatusBar backgroundColor={colors.primary} />

      <View style={styles.topBar}>
        <View />
        <TouchableOpacity onPress={() => console.log('skip pressed')}>
          <Text style={[textStyles.smallBold, styles.skipButton]}>SKIP</Text>
        </TouchableOpacity>
      </View>

      <Image source={pingLogo} style={styles.logo} />

      <View
        style={Platform.select({
          android: { height: heightPercentageToDP(30) },
          ios: { height: heightPercentageToDP(25) },
        })}
      />

      <View>
        <CustomTextInput
          control={control}
          errors={errors}
          input={{
            name: 'email',
            label: 'Email',
            placeholder: 'bobbybrown@mail.com',
          }}
          rules={{
            contentType: 'email-address',
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            autoCorrect: false,
          }}
        />

        <CustomTextInput
          control={control}
          errors={errors}
          input={{
            name: 'password',
            label: 'Password',
            placeholder: '**********',
          }}
          rules={{
            contentType: 'password',
            autoCapitalize: 'none',
            autoCorrect: false,
            secureTextEntry: true,
          }}
        />

        <TouchableOpacity
          onPress={() => console.log('forgot password pressed')}
          hitSlop={{ left: 0, top: 30, right: 10, bottom: 10 }}
        >
          <Text style={[textStyles.smallRegular, styles.forgotPassword]}>
            Forgot password
          </Text>
        </TouchableOpacity>
      </View>

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
    top: heightPercentageToDP(8),
    height: heightPercentageToDP(28),
    width: widthPercentageToDP(50),
    resizeMode: 'contain',
  },
  forgotPassword: {
    color: colors.primary,
    position: 'absolute',
    top: -30,
    right: -15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
});

export default SignIn;
