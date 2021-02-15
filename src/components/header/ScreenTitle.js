import { textStyles, headerPaddings } from 'ping/src/styles/styles';

import React from 'react';
import { Text, StyleSheet } from 'react-native';

function ScreenTitle({ title }) {
  return <Text style={[textStyles.bigBold, styles.placement]}>{title}</Text>;
}

const styles = StyleSheet.create({
  placement: {
    paddingHorizontal: headerPaddings.horizontal,
    paddingVertical: headerPaddings.vertical,
  },
});

export default ScreenTitle;
