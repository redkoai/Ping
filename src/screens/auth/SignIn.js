import { textStyles } from '../../styles/styles';
import pingLogo from '../../../assets/pingLogo.png';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../../util/scaler';

import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
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

      {/* <Text style={textStyles.normalSemiBold}>Last name</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="lastName"
        defaultValue=""
      /> */}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'FiraSans_600SemiBold',
    // color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '50px',
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#000',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});

export default SignIn;
