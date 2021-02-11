import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import PingLogo from 'ping/src/icons/PingLogo';

import React, { useContext } from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';

import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EMAIL_SCHEMA } from 'ping/src/schema/authSchema';

import Spacer from 'ping/src/components/Spacer';
import BackChevron from 'ping/src/components/BackChevron';
import TopBar from 'ping/src/components/TopBar';
import { EmailInput } from 'ping/src/components/CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';

function PasswordResetScreen({ navigation }) {
  const { passwordResetEmailAsync } = useContext(AuthContext);

  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(EMAIL_SCHEMA),
  });

  const onResetSuccess = () => {
    // navigation.navigate('SignIn');
  };
  const onResetFailure = (errorMessage) => {
    console.log(errorMessage);
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
        <Text style={textStyles.bigBold}>Reset Password</Text>
      </TopBar>

      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
      >
        <PingLogo
          height={heightPercentageToDP(20)}
          fill={colors.primary}
          style={styles.logo}
        />
        <Spacer height={9} />

        <EmailInput control={control} errors={errors} />
        <Spacer height={1.5} />

        {formState.isSubmitting && (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        )}

        <CustomButton
          text="Send Email"
          onPress={handleSubmit(
            async (data) =>
              await passwordResetEmailAsync(
                data,
                onResetSuccess,
                onResetFailure,
              ),
          )}
          isPrimary={true}
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

export default PasswordResetScreen;
