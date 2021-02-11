import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';

import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

function TopBar({ children }) {
  return <View style={styles.topBar}>{children}</View>;
}

const styles = StyleSheet.create({
  topBar: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(10),
    paddingTop: Platform.OS === 'ios' ? heightPercentageToDP(6) : 0,
    paddingHorizontal: widthPercentageToDP(6),
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default TopBar;
