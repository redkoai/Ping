import { textStyles, headerPaddings } from 'ping/src/styles/styles';
import leftChevron from 'ping/assets/chevron-left.png';

import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function BackChevron({ navigation, text = 'back', icon = leftChevron }) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
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
    paddingVertical: headerPaddings.vertical,
    paddingHorizontal: headerPaddings.horizontal,
  },
  icon: {
    resizeMode: 'contain',
    width: 10,
    marginRight: 10,
  },
});

export default withNavigation(BackChevron);
