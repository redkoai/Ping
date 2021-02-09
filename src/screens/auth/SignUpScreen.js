import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import pingLogo from 'ping/assets/pingLogo.png';
import googleLogo from 'ping/assets/Google_G_Logo.png';

import React, { useContext } from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';

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
import BackChevron from 'ping/src/components/BackChevron';
import TopBar from 'ping/src/components/TopBar';
import { EmailInput, PasswordInput } from 'ping/src/components/CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';

function SignUpScreen({ navigation }) {
  const { signUpWithEmailAsync, signInWithGoogleAsync } = useContext(
    AuthContext,
  );

  const { control, handleSubmit, errors, setError, formState } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });

  const onSuccess = () => {
    // navigation.navigate('HomeScreenEmpty');
  };
  const onFailure = (errorMessage) => {
    setError(errorMessage);
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

        {formState.isSubmitting && (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        )}

        <CustomButton
          text="Sign Up"
          onPress={handleSubmit(
            async (data) =>
              await signUpWithEmailAsync(data, onSuccess, onFailure),
          )}
          isPrimary={true}
        />
        <CustomButton
          icon={googleLogo}
          text="Sign up with Google"
          onPress={async () =>
            await signInWithGoogleAsync(onSuccess, onFailure)
          }
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

export default SignUpScreen;
