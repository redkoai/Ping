import { textStyles } from '../../styles/styles';
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
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../../util/scaler';
import { useForm, Controller } from 'react-hook-form';

import pingLogo from '../../../assets/pingLogo.png';

function SignIn() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Image
        source={pingLogo}
        style={{
          height: heightPercentageToDP(50),
          width: widthPercentageToDP(50),
          bottom: heightPercentageToDP(-5),
          resizeMode: 'contain',
        }}
      />
      <Text style={textStyles.normalSemiBold}>First name</Text>
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
        name="firstName"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Text style={textStyles.normalSemiBold}>Last name</Text>
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
      />

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
