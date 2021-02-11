import { textStyles } from 'ping/src/styles/styles';
import leftChevron from 'ping/assets/chevron-left.png';

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function BackChevron({ handlePress, text = 'back', icon = leftChevron }) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        {icon && <Image source={icon} style={styles.icon} />}
        {text && <Text style={textStyles.normalMedium}>{text}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  icon: {
    resizeMode: 'contain',
    width: 10,
    marginRight: 10,
  },
});

export default BackChevron;
