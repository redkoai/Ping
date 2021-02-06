import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import pingLogo from 'ping/assets/pingLogo.png';

import React from 'react';
import {
  StatusBar,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useForm } from 'react-hook-form';
import CustomTextInput from 'ping/src/components/CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';

function SignIn() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <StatusBar backgroundColor="#3D8976" />
      <Image
        source={pingLogo}
        style={{
          top: heightPercentageToDP(3),
          height: heightPercentageToDP(33),
          width: widthPercentageToDP(50),
          resizeMode: 'contain',
        }}
      />

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

<View>
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
      <TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    color: colors.primary,
    position: 'absolute',
    top: -30,
    right: -15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default SignIn;
