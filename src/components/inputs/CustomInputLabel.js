import { textStyles, colors } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CustomInputLabel({ text, optional = false }) {
  return (
    <View style={[styles.marginOffset, styles.label]}>
      <Text style={[textStyles.normalSemiBold]}>{text}</Text>
      {optional && <Text style={[textStyles.smallRegular, styles.optional]}>optional</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optional: {
    color: colors.darkGrey,
    paddingLeft: widthPercentageToDP(5),
  },
  marginOffset: {
    marginHorizontal: widthPercentageToDP(1),
  },
});

export default CustomInputLabel;
