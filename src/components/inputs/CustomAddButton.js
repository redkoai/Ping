import { colors } from 'ping/src/styles/styles';
import { Ionicons } from '@expo/vector-icons';

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from 'ping/src/components/CustomText';

function CustomAddButton({ text = 'Add', onPress = () => console.log('add button pressed') }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="add" size={24} color={colors.addSign} />
      <CustomText text={text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 3,
  },
});

export default CustomAddButton;
