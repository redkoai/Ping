import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';

import React from 'react';
import { View, StyleSheet } from 'react-native';

function TopBar({ children }) {
  return <View style={styles.topBar}>{children}</View>;
}

const styles = StyleSheet.create({
  topBar: {
    width: widthPercentageToDP(100),
    height: 60,
    paddingHorizontal: widthPercentageToDP(5),
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default TopBar;
