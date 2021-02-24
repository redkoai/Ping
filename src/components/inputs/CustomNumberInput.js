import { colors } from 'ping/src/styles/styles';
import React from 'react';
import NumericInput from 'react-native-numeric-input';
import { Controller } from 'react-hook-form';
// control, errors, and setValue are passed from the useForm hook of the react-hook-form package
// const { control, handleSubmit, errors, setValue } = useForm();

function CustomNumberInput({
  control,
  errors,
  input = { name: 'unknown-numeric-input', defaultValue: 0 },
}) {
  const error = errors?.[input.name];

  return (
    <Controller
      control={control}
      name={input.name}
      defaultValue={input.defaultValue}
      render={({ onChange, onBlur, value }) => (
        <NumericInput
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          totalWidth={72}
          totalHeight={35}
          iconSize={25}
          step={1}
          valueType="real"
          rounded
          textColor="#B0228C"
          iconStyle={{ color: 'white' }}
          rightButtonBackgroundColor={colors.primary}
          leftButtonBackgroundColor={colors.primary}
        />
      )}
    />
  );
}

export default CustomNumberInput;
