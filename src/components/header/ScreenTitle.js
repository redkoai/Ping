import { textStyles } from 'ping/src/styles/styles';

import React from 'react';
import { Text } from 'react-native';

function ScreenTitle({ title }) {
  return <Text style={textStyles.bigBold}>{title}</Text>;
}

export default ScreenTitle;
