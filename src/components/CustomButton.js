import { textStyles, colors } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

function CustomButton({ icon, text, onPress, isPrimary }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isPrimary ? styles.buttonPrimary : styles.buttonSecondary]}
        onPress={onPress}
      >
        {icon && <Image source={icon} style={styles.icon} />}
        <Text style={[textStyles.bigBold, isPrimary ? styles.textPrimary : styles.textSecondary]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentageToDP(1.2),
    marginBottom: heightPercentageToDP(1.2),
  },
  button: {
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(6.5),
    paddingHorizontal: 30,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    shadowColor: colors.offBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: 'white',
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
  textSecondary: {
    color: colors.primary,
  },
});

export default CustomButton;
