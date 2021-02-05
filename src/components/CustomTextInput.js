import { textStyles } from '../styles/styles';
import { widthPercentageToDP } from '../../util/scaler';

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Controller } from 'react-hook-form';

// control and errors are passed from the useForm hook of the react-hook-form package
// const { control, handleSubmit, errors } = useForm();

function CustomTextInput({
  control,
  errors,
  errorMessage = 'Not a valid input',
  input = {
    name: 'unknown-text-input',
    label: '',
    placeholder: '',
    defaultValue: '',
    validation: {},
  },
  rules = {
    contentType,
    keyboardType,
    autoCapitalize,
    autoCorrect,
    autoFocus,
    secureTextEntry,
  },
}) {
  return (
    <View style={{ width: widthPercentageToDP(90) }}>
      <Text style={textStyles.normalSemiBold}>{input.label}</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder={input.placeholder}
            textContentType={rules.contentType}
            keyboardType={rules.keyboardType}
            autoCapitalize={rules.autoCapitalize}
            autoCorrect={rules.autoCorrect}
            autoFocus={rules.autoFocus}
            secureTextEntry={rules.secureTextEntry}
          />
        )}
        name={input.name}
        rules={input.validation}
        defaultValue={input.defaultValue}
      />
      {errors.input ? errors.input.name && <Text>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 35,
    fontFamily: 'FiraSans_400Regular',
    fontSize: 14,
    color: '#555',
    backgroundColor: '#F7F8FA',
    borderColor: '#000',
    height: 50,
    width: widthPercentageToDP(100),
    padding: 20,
    borderRadius: 12,
  },
});

export default CustomTextInput;
