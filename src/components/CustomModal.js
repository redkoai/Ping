import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, textStyles } from 'ping/src/styles/styles';

function CustomModal({ isVisible, onCancel, title, height = 1.6, children }) {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
      style={styles.container}
      useNativeDriverForBackdrop
    >
      <View style={[styles.modalInner, { height: Dimensions.get('screen').height / height}]}>
        <View style={styles.modalTopBar}>
          <TouchableOpacity onPress={onCancel} style={styles.modalTopLeft}>
            <Ionicons name="close" size={22} color={colors.offBlack} />
          </TouchableOpacity>
          <Text style={[textStyles.normalBold, styles.modalTopCenter]}>{title}</Text>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  modalInner: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 15,
  },
  modalTopBar: {
    marginTop: 7,
    marginHorizontal: 25,
    height: 45,
    display: 'flex',
  },
  modalTopLeft: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 0,
  },
  modalTopCenter: {
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
  },
  modalTopRight: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 0,
  },
});

export default CustomModal;
