import { textStyles, colors } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

function CustomButton({ icon, text, onPress, isPrimary }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          isPrimary ? styles.buttonPrimary : styles.buttonSecondary,
        ]}
        onPress={onPress}
      >
        {icon && <Image source={icon} style={styles.icon} />}
        <Text
          style={[
            textStyles.bigBold,
            isPrimary ? styles.textPrimary : styles.textSecondary,
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
    marginTop: heightPercentageToDP(4),
    marginBottom: heightPercentageToDP(-1),
  },
  button: {
    width: widthPercentageToDP(80),
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    shadowColor: colors.offBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
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
    height: 24,
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
