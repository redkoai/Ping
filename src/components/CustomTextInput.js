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
    <View style={styles.container}>
      <Text style={[textStyles.normalSemiBold, styles.offsetMargin]}>
        {input.label}
      </Text>
      <Controller
        control={control}
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
      {
        <View>
          <Text
            style={[textStyles.smallRegular, styles.error, styles.offsetMargin]}
          >
            {error ? error.message : ' '}
          </Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(90),
    marginTop: heightPercentageToDP(0.5),
    marginBottom: heightPercentageToDP(2),
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
  error: {
    color: colors.redError,
  },
  offsetMargin: {
    marginLeft: 2,
  },
});

export default CustomTextInput;
