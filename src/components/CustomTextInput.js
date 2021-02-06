import { textStyles, colors } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  const [focus, setFocus] = useState(rules.autoFocus);
  const [secure, setSecure] = useState(rules.secureTextEntry);
  return (
    <View style={{ width: widthPercentageToDP(90) }}>
      <Text style={textStyles.normalSemiBold}>{input.label}</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.container}>
            <TextInput
              style={[
                textStyles.normalRegular,
                styles.input,
                focus && styles.inputFocused,
              ]}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder={input.placeholder}
              textContentType={rules.contentType}
              keyboardType={rules.keyboardType}
              autoCapitalize={rules.autoCapitalize}
              autoCorrect={rules.autoCorrect}
              autoFocus={rules.autoFocus}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              secureTextEntry={secure}
            />
            {rules.secureTextEntry && (
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setSecure(!secure)}
              >
                <Ionicons
                  name={secure ? 'ios-eye' : 'ios-eye-off'}
                  size={30}
                  color={colors.offBlack}
                />
              </TouchableOpacity>
            )}
          </View>
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    color: colors.offBlack,
    padding: 20,
    paddingRight: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: colors.lightGray,
    height: 55,
  },
  inputFocused: {
    backgroundColor: colors.lightGray,
    borderColor: colors.offBlack,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: heightPercentageToDP(1.4),
  },
});

export default CustomTextInput;
