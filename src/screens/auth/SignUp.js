import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import pingLogo from 'ping/assets/pingLogo.png';
import googleLogo from 'ping/assets/Google_G_Logo.png';

import React from 'react';
import {
  StatusBar,
  SafeAreaView,
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
import BackChevron from 'ping/src/components/BackChevron';
import TopBar from 'ping/src/components/TopBar';
import { EmailInput, PasswordInput } from 'ping/src/components/CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';

import 'firebase/firestore';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import * as Segment from 'expo-analytics-segment';
export const isAndroid = () => Platform.OS === 'android';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env';

const androidClientId = {
  ANDROID_CLIENT_ID,
};
const iosClientId = {
  IOS_CLIENT_ID,
};

function SignUp({ navigation }) {
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

  const signInWithEmail = async (data) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
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
    Segment.identify(data.email);
    Segment.trackWithProperties('User SignIn', {
      accountType: 'CustomEmailAuth',
      email: data.email,
    });
  };

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  const onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken,
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log('user sign in');
              firebase
                .database()
                .ref('/users' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture:
                    result.additionalUserInfo.profile.profile_picture,
                  locale: result.additionalUserInfo.profile_picture.locale,
                  first_name: result.additionalUserInfo.given_name,
                  last_name: result.additionalUserInfo.first_name,
                })
                .then(function (snapshot) {});
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      });
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        behavior: 'web',
        iosClientId: '', //enter ios client id
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
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
        <BackChevron nav={navigation} />
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
        <PasswordInput control={control} errors={errors} />
        <Spacer height={1.5} />

        {renderLoading()}

        <CustomButton
          text="Sign Up"
          onPress={handleSubmit(signInWithEmail)}
          isPrimary={true}
        />
        <CustomButton
          icon={googleLogo}
          text="Sign up with Google"
          onPress={signInWithGoogleAsync}
        />
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
    width: widthPercentageToDP(50),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SignUp;
