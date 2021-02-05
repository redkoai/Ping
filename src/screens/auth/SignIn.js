import pingLogo from '../../../assets/pingLogo.png';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../../util/scaler';

import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';

import { useForm } from 'react-hook-form';
import CustomTextInput from '../../components/CustomTextInput';

function SignIn() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <Image
        source={pingLogo}
        style={{
          height: heightPercentageToDP(50),
          width: widthPercentageToDP(50),
          bottom: heightPercentageToDP(-5),
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
          autoCapitalize: false,
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
          autoCapitalize: false,
          autoCorrect: false,
          secureTextEntry: true,
        }}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default SignIn;
