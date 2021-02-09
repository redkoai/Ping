import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import pingLogo from 'ping/assets/pingLogo.png';
import googleLogo from 'ping/assets/Google_G_Logo.png';

import React, { useContext } from 'react';
// import AuthContext from 'ping/src/contexts/AuthContext';
import {
  StatusBar,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';

import Spacer from 'ping/src/components/Spacer';
import TopBar from 'ping/src/components/TopBar';
import { EmailInput, PasswordInput } from 'ping/src/components/CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';

import 'firebase/firestore';
import firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';

const androidClientId = {
  ANDROID_CLIENT_ID,
};
const iosClientId = {
  IOS_CLIENT_ID,
};

function SignIn({ navigation }) {
  // const { user } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    errors,
    clearErrors,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });

  const onLoginSuccess = () => {
    navigation.navigate('HomeScreenEmpty');
  };
  const onLoginFailure = (errorMessage) => {
    setError(errorMessage);
  };
  const renderLoading = () => {
    if (formState.isSubmitting) {
      return (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  };

  const signInWithEmailAsync = async (data) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(onLoginSuccess())
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          onLoginFailure('Weak Password!');
        } else {
          onLoginFailure(errorMessage);
        }
      });
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await GoogleSignIn.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        behavior: 'web',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken,
        );
        const googleProfileData = await firebase
          .auth()
          .signInWithCredential(credential);
        onLoginSuccess();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
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

      <TopBar>
        <Spacer />
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeScreenEmpty')}
        >
          <Text style={[textStyles.smallBold, styles.skipButton]}>SKIP</Text>
        </TouchableOpacity>
      </TopBar>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
      >
        <Image source={pingLogo} style={styles.logo} />
        <Spacer height={23} />

        <EmailInput control={control} errors={errors} />
        <PasswordInput
          control={control}
          errors={errors}
          forgotPasswordNav={navigation}
        />
        <Spacer height={1.5} />

        {renderLoading()}

        <CustomButton
          text="Sign In"
          onPress={handleSubmit(signInWithEmailAsync)}
          isPrimary={true}
        />
        <CustomButton
          icon={googleLogo}
          text="Sign in with Google"
          onPress={signInWithGoogleAsync}
        />

        <View style={styles.registerButton}>
          <Text style={[textStyles.smallRegular, { color: colors.offBlack }]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
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
  skipButton: {
    color: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'relative',
    right: -10,
  },
  logo: {
    position: 'absolute',
    height: heightPercentageToDP(22),
    width: widthPercentageToDP(50),
    resizeMode: 'contain',
  },
  registerButton: {
    position: 'absolute',
    bottom: heightPercentageToDP(3),
    flexDirection: 'row',
    width: 195,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SignIn;
