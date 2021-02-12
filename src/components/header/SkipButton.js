import { widthPercentageToDP } from 'ping/util/scaler';
import { textStyles, colors, headerPaddings } from 'ping/src/styles/styles';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import React, { useContext } from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';

function SkipButton({ text = 'SKIP' }) {
  const { setSkipped } = useContext(AuthContext);

  return (
    <TouchableOpacity onPress={() => setSkipped(true)}>
      <Text style={[textStyles.smallBold, styles.skipButton]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  skipButton: {
    color: colors.primary,
    paddingVertical: headerPaddings.vertical,
    paddingHorizontal: headerPaddings.horizontal + widthPercentageToDP(3),
    position: 'relative',
    right: -10,
  },
});

export default SkipButton;
