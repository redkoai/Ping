import { textStyles, colors } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

function CustomButton({
  icon,
  text,
  onPress,
  shadow = false,
  primary = false,
  narrow = false,
  small = false,
  outline = false,
  disabled = false,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          small ? styles.buttonSmall : narrow ? styles.buttonNarrow : styles.buttonLarge,
          primary ? styles.buttonPrimary : styles.buttonSecondary,
          outline && styles.buttonOutline,
          shadow && styles.buttonShadow,
          disabled && primary && styles.primaryDisabled,
          disabled && !primary && styles.secondaryDisabled,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        {icon && <Image source={icon} style={styles.icon} />}
        <Text
          style={[
            textStyles.bigBold,
            //small ? textStyles.normalBold : textStyles.bigBold,
            primary ? styles.textPrimary : styles.textSecondary,
            outline && styles.textOutline,
            disabled && primary && styles.textPrimaryDisabled,
            disabled && !primary && styles.textSecondaryDisabled,
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentageToDP(1.2),
    marginBottom: heightPercentageToDP(1.5),
    //borderColor: 'red',
    //borderWidth: 1,
  },
  button: {
    height: heightPercentageToDP(Platform.OS === 'ios' ? 5.8 : 6.3),
    paddingHorizontal: 30,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLarge: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(Platform.OS === 'ios' ? 5.8 : 6.3),
  },
  buttonNarrow: {
    width: widthPercentageToDP(47),
    height: heightPercentageToDP(Platform.OS === 'ios' ? 5.8 : 6.3),
  },
  buttonSmall: {
    minWidth: widthPercentageToDP(28),
    height: heightPercentageToDP(Platform.OS === 'ios' ? 4.2 : 4.8),
  },
  buttonShadow: {
    shadowColor: colors.offBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor: colors.primary,
    borderWidth: 3,
  },
  buttonSecondary: {
    backgroundColor: 'white',
  },
  buttonSecondary1: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize:15
    
  },
  primaryDisabled: {
    backgroundColor: '#ccc',
  },
  secondaryDisabled: {
    backgroundColor: '#f5f5f5',
  },
  icon: {
    resizeMode: 'contain',
    width: 35,
    height: heightPercentageToDP(2.5),
    marginRight: 8,
  },
  textPrimary: {
    color: 'white',
  },
  textOutline: {
    color: colors.primary,
  },
  textSecondary: {
    color: colors.primary,
  },
  textPrimaryDisabled: {
    color: 'white',
  },
  textSecondaryDisabled: {
    color: '#aaa',
  },
});

export default CustomButton;
