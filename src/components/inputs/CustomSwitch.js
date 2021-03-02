import { colors } from 'ping/src/styles/styles';
import React from 'react';
import { Switch } from 'react-native';
import { Controller } from 'react-hook-form';

// control, errors, and setValue are passed from the useForm hook of the react-hook-form package
// const { control, handleSubmit, errors, setValue } = useForm();

function CustomSwitch({
  control,
  errors,
  input = { name: 'unknown-switch-input', defaultValue: false },
}) {
  const error = errors?.[input.name];

  return (
    <Controller
      control={control}
      name={input.name}
      defaultValue={input.defaultValue}
      render={({ onChange, onBlur, value }) => (
        <Switch
        style={[
          error && { borderColor: colors.redError },
        ]}
          trackColor={{ false: 'lightgray', true: colors.primary }}
          onValueChange={(value)=>onChange(value)}
          onBlur={onBlur}
          value={value}
        />
      )}
    />
   
  );
}

export default CustomSwitch;
