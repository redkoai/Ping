import { textStyles } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function CustomButton({ text, onPress, isPrimary }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          isPrimary ? styles.buttonPrimary : styles.buttonSecondary,
        ]}
        onPress={onPress}
      >
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
    marginTop: 30,
  },
  button: {
    width: widthPercentageToDP(80),
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    shadowColor: '#555',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 1,
  },
  buttonPrimary: {
    backgroundColor: '#3D8976',
  },
  buttonSecondary: {
    backgroundColor: 'white',
  },
  textPrimary: {
    color: 'white',
  },
  textSecondary: {
    color: '#3D8976',
  },
});

export default CustomButton;
