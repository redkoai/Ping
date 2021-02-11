import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import PingLogo from 'ping/src/icons/PingLogo';
import googleLogo from 'ping/assets/Google_G_Logo.png';

import React, { useContext } from 'react';
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
  const { setSkipped, signUpWithEmailAsync, signInWithGoogleAsync } = useContext(AuthContext);

  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });

  const onSignUpSuccess = () => {
    // navigation.navigate('HomeScreenEmpty');
  };
  const onSignUpFailure = (errorMessage) => {
    alert(errorMessage);
  };

  const onBackrNavigation = () => {
    reset();
    navigation.goBack();
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
        <BackChevron onPress={onBackrNavigation} />
        <TouchableOpacity onPress={() => setSkipped}>
          <Text style={[textStyles.smallBold, styles.skipButton]}>SKIP</Text>
        </TouchableOpacity>
      </TopBar>

      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
        <PingLogo height={heightPercentageToDP(20)} fill={colors.primary} style={styles.logo} />
        <Spacer height={7} />

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
            async (data) => await signUpWithEmailAsync(data, onSignUpSuccess, onSignUpFailure),
          )}
          isPrimary={true}
        />
        <CustomButton
          icon={googleLogo}
          text="Sign up with Google"
          onPress={async () => await signInWithGoogleAsync(onSignUpSuccess, onSignUpFailure)}
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
