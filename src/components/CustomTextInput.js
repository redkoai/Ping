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
  error,
  input = {
    name: 'unknown-text-input',
    label: '',
    placeholder: '',
    defaultValue: '',
  },
  rules = {
    contentType,
    keyboardType,
    autoCapitalize,
    autoCorrect,
    autoFocus,
    secureTextEntry,
  },
  forgotPasswordNav = false,
  ...inputProps
}) {
  const [focus, setFocus] = useState(rules.autoFocus);
  const [secure, setSecure] = useState(rules.secureTextEntry);
  return (
    <View style={styles.container}>
      <Text style={[textStyles.normalSemiBold, styles.marginOffset]}>
        {input.label}
      </Text>
      <Controller
        control={control}
        name={input.name}
        defaultValue={input.defaultValue}
        render={({ onChange, onBlur, value }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                textStyles.normalRegular,
                styles.input,
                focus && styles.inputFocused,
                error && { borderColor: colors.redError },
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
              {...inputProps}
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
      />
      {
        <View style={[styles.barBelowInput, styles.marginOffset]}>
          <Text style={[textStyles.smallRegular, styles.error]}>
            {error ? error.message : ' '}
          </Text>
          <View
          // style={!forgotPassword && styles.forgotPassword}
          >
            {forgotPasswordNav && (
              <TouchableOpacity
                onPress={() => forgotPasswordNav.navigate('ResetPassword')}
                style={styles.forgotPassword}
              >
                <Text
                  style={[textStyles.smallRegular, { color: colors.primary }]}
                >
                  Forgot password
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      }
    </View>
  );
}

export function EmailInput({
  control,
  errors,
  input = {
    name: 'email',
    label: 'Email',
    placeholder: '',
    defaultValue: '',
  },
  ...inputProps
}) {
  return (
    <CustomTextInput
      control={control}
      error={errors?.email}
      input={{
        name: input.name,
        label: input.label,
        placeholder: input.placeholder,
        defaultValue: input.defaultValue,
      }}
      rules={{
        contentType: 'emailAddress',
        keyboardType: 'email-address',
        autoCapitalize: 'none',
        autoCorrect: false,
      }}
      {...inputProps}
    />
  );
}

export function PasswordInput({
  control,
  errors,
  input = {
    name: 'password',
    label: 'Password',
    placeholder: '',
    defaultValue: '',
  },
  forgotPasswordNav,
  ...inputProps
}) {
  return (
    <CustomTextInput
      control={control}
      error={errors?.password}
      input={{
        name: input.name,
        label: input.label,
        placeholder: input.placeholder,
        defaultValue: input.defaultValue,
      }}
      rules={{
        contentType: 'password',
        keyboardType: 'default',
        autoCapitalize: 'none',
        autoCorrect: false,
        secureTextEntry: true,
      }}
      forgotPasswordNav={forgotPasswordNav}
      {...inputProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(90),
    marginTop: heightPercentageToDP(0.5),
    marginBottom: heightPercentageToDP(0.5),
  },
  inputContainer: {
    marginVertical: heightPercentageToDP(0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    color: colors.offBlack,
    paddingRight: 60,
    paddingLeft: 20,
    paddingVertical: 17,
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
  barBelowInput: {
    marginTop: -10,
    width: widthPercentageToDP(88),
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error: {
    color: colors.redError,
  },
  forgotPassword: {
    color: colors.primary,
    paddingVertical: 15,
    paddingLeft: 20,
  },
  marginOffset: {
    marginHorizontal: widthPercentageToDP(1),
  },
});

export default CustomTextInput;
