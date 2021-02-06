import { textStyles } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Controller } from 'react-hook-form';

function CustomButton() {
  return(
    <TouchableOpacity>
      <Text>Hey</Text>
    </TouchableOpacity>
  );
}

export default CustomButton;