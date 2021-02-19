import { textStyles, colors } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import CalendarIcon from 'ping/src/icons/CalendarIcon';
import LocationNearMeIcon from 'ping/src/icons/LocationNearMeIcon';
// import LocationPicker from '../../components/LocationPicker';

import { Controller } from 'react-hook-form';
// control and errors are passed from the useForm hook of the react-hook-form package
// const { control, handleSubmit, errors } = useForm();

function CustomTextInput({
  control,
  errors,
  input = {
    name: 'unknown-text-input',
    label: '',
    placeholder: '',
    defaultValue: '',
  },
  rules = {
    contentType: 'none',
    keyboardType: 'default',
    autoCapitalize: true,
    autoCorrect: true,
    autoFocus: false,
    secureTextEntry: false,
    multiline: false,
    numberOfLines: 1,
  },
  forgotPassword = false,
 
  optional = false,
  icon = rules.secureTextEntry,
  ...inputProps
}) {
  const [focus, setFocus] = useState(rules.autoFocus);
  const [secure, setSecure] = useState(rules.secureTextEntry);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const error = errors?.[input.name];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const iconToRender = () => {
    if (rules.secureTextEntry) {
      return {
        component: (
          <Ionicons
            name={secure ? 'ios-eye' : 'ios-eye-off'}
            size={heightPercentageToDP(4.2)}
            color={colors.offBlack}
          />
        ),
        function: () => setSecure(!secure),
      };
    } else if (icon === 'calendar') {
      return {
        component: <CalendarIcon size={heightPercentageToDP(3)} color={colors.offBlack} />,
        function: () => inputProps.calendarClick(),
      };
    } else if (icon === 'location') {
      return {
        component: <LocationNearMeIcon size={heightPercentageToDP(4)} color={colors.offBlack} />,
        function: () =>inputProps.locationClick(),
      };
    } else return icon;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.marginOffset, styles.label]}>
        <Text style={[textStyles.normalSemiBold]}>{input.label}</Text>
        {optional && <Text style={[textStyles.smallRegular, styles.optional]}>optional</Text>}
      </View>
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
                icon && styles.inputWithIcon,
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
              multiline={rules.multiline}
              numberOfLines={rules.numberOfLines}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              secureTextEntry={secure}
              {...inputProps}
            />
            {icon && (
              <TouchableOpacity style={styles.icon} onPress={iconToRender().function}>
                {iconToRender().component}
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      {
        <View style={[styles.barBelowInput, styles.marginOffset]}>
          <Text style={[textStyles.smallRegular, styles.error]}>{error ? error.message : ' '}</Text>
          <View>
            {forgotPassword && (
              <TouchableOpacity onPress={forgotPassword} style={styles.forgotPassword}>
                <Text style={[textStyles.smallRegular, { color: colors.primary }]}>
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
      errors={errors}
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
  forgotPassword,
  ...inputProps
}) {
  return (
    <CustomTextInput
      control={control}
      errors={errors}
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
      forgotPassword={forgotPassword}
      {...inputProps}
    />
  );
}

 export function CalendarInput(
   control,
   errors,
   input = {
     name: 'calendar',
     label: 'Date',
     placeholder: '',
     defaultValue: '',
   },
  
   icon = 'calendar',
   ...inputProps
 ) {
   return (
     <CustomTextInput
       control={control}
       error={errors}
       input={{
         name: input.name,
         label: input.label,
         placeholder: input.placeholder,
         defaultValue: input.defaultValue,
       }}
       icon={icon}
       {...inputProps}
     />
   );
 }

export function StartDateInput({
  control,
  errors,
  input = {
    name: 'start-date',
    label: 'Start',
    placeholder: 'February 15, 2020 at 10:00 AM',
    defaultValue: '',
  },
  icon = 'calendar',
  ...inputProps
}) {
  return (
    <CustomTextInput
      control={control}
      errors={errors}
      input={{
        name: input.name,
        label: input.label,
        placeholder: input.placeholder,
        defaultValue: input.defaultValue,
      }}
      icon={icon}
      {...inputProps}
    />
  );
}

export function EndDateInput({
  control,
  errors,
  input = {
    name: 'end-date',
    label: 'End',
    placeholder: 'February 15, 2020 at 10:00 AM',
    defaultValue: '',
  },
  icon = 'calendar',
  ...inputProps
}) {
  return (
    <CustomTextInput
      control={control}
      errors={errors}
      input={{
        name: input.name,
        label: input.label,
        placeholder: input.placeholder,
        defaultValue: input.defaultValue,
      }}
      icon={icon}
      {...inputProps}
    />
  );
}

export function LocationInput({
  control,
  errors,
  input = {
    name: 'location',
    label: 'Location',
    placeholder: 'My house',
    defaultValue: '',
  },
  icon = 'location',
  ...inputProps
}) {
  return (
    <CustomTextInput
      control={control}
      errors={errors}
      input={{
        name: input.name,
        label: input.label,
        placeholder: input.placeholder,
        defaultValue: input.defaultValue,
      }}
      icon={icon}
      {...inputProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(90),
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optional: {
    color: colors.darkGrey,
    paddingLeft: widthPercentageToDP(5),
  },
  inputContainer: {
    marginTop: heightPercentageToDP(0.5),
    marginBottom: heightPercentageToDP(0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.offBlack,
    textAlignVertical:'top',
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: colors.offWhite,
    height: heightPercentageToDP(6.8),
  },
  inputWithIcon: {
    paddingRight: 60,
  },
  inputFocused: {
    backgroundColor: colors.offWhite,
    borderColor: colors.offBlack,
  },
  icon: {
    position: 'absolute',
    right: 15,
  },
  barBelowInput: {
    marginTop: -13,
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
