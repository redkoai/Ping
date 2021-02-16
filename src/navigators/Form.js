import React from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';

import Spacer from 'ping/src/components/Spacer';
import CustomTextInput, {
  EmailInput,
  PasswordInput,
  CalendarInput,
  LocationInput,
} from './CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';

function Form({ navigation }) {
  const { control, handleSubmit, errors, reset, formState } = useForm({
    reValidateMode: 'onBlur'
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: Math.round(Dimensions.get('window').height),
      }}
    >
      <CustomTextInput control={control} errors={errors} icon='calendar' />
      <EmailInput control={control} errors={errors} />
      <PasswordInput control={control} errors={errors} />
      <CalendarInput control={control} errors={errors} />
      {/*<LocationInput control={control} errors={errors} />*/}
    </SafeAreaView>
  );
}

export default Form;
