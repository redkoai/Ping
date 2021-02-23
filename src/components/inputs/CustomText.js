import { textStyles, colors } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function CustomText({ text,header=false }) {
    return (
      <View style={styles.container}>
      <Text
          style={header?[styles.textPrimary,textStyles.normalSemiBold] : [styles.textSecondary,textStyles.normalRegular]}
        >
          {text}
        </Text>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        marginTop: heightPercentageToDP(1.2),
        marginBottom: heightPercentageToDP(1.5),
        },
        textPrimary: {
            color: colors.offBlack,
          },
          textSecondary: {
            color: colors.darkGrey,
          }
        });

export default CustomText;