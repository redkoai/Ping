import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';

import React from 'react';
import { View } from 'react-native';

function Spacer({ width = 0, height = 0, fixed = false }) {
  return (
    <View
      style={{
        width: !fixed ? widthPercentageToDP(width) : width,
        height: !fixed ? heightPercentageToDP(height) : height,
      }}
    />
  );
}

export default Spacer;
