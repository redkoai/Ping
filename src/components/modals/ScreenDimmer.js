import React from 'react';
import { StyleSheet, View, Text, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';

function ScreenDimmer({ isVisible, onConfirm, onCancel, children }) {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      statusBarTranslucent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalContainer}>{children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default ScreenDimmer;
