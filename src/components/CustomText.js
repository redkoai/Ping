import { textStyles, colors } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function CustomText({ text, header = false }) {
  return (
    <Text
      style={
        header
          ? [styles.textPrimary, textStyles.normalSemiBold]
          : [styles.textSecondary, textStyles.normalRegular]
      }
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  textPrimary: {
    color: colors.offBlack,
    lineHeight: 30
  },
  textSecondary: {
    color: colors.darkGrey,
    lineHeight: 20,
  },
});

export default CustomText;
