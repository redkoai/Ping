import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, StyleSheet, StatusBar, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer from 'ping/src/components/Spacer';
import { colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import { useForm } from 'react-hook-form';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import CustomText from 'ping/src/components/CustomText';
import CustomNumberInput from 'ping/src/components/inputs/CustomNumberInput';
import CustomSwitch from 'ping/src/components/inputs/CustomSwitch';
import rsvpprogline from 'ping/assets/createnew/rsvp/rsvpprogline.png';

function RSVP({ navigation }) {
  const { control, handleSubmit, errors, reset, formState } = useForm({
    //resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const onSubmit = (data) => {
    console.log(data);
    //navigation.navigate('Signinpopup');
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: 'white' }}
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <StatusBar backgroundColor={colors.primary} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: widthPercentageToDP(3),
        }}
      >
        <Image
          source={rsvpprogline}
          style={{
            height: heightPercentageToDP('10'),
            width: widthPercentageToDP('85'),
            resizeMode: 'contain',
            marginTop: heightPercentageToDP('-5'),
            left: heightPercentageToDP('0.7'),
          }}
        />

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Collect RSVPs" header />
            <CustomText text="Guests will be able to to let you know if they're attending or not" />
          </View>
          <CustomSwitch control={control} errors={errors} input={{ name: 'collect-rsvp' }} />
        </View>

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Request number of kids attending" header />
            <CustomText text="Get head count of both adults and kids attending" />
          </View>
          <CustomSwitch control={control} errors={errors} input={{ name: 'request-num-of-kids' }} />
        </View>

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Total invited per invitation" header />
            <CustomText text="This includes the person that receives the invite" />
          </View>
          <CustomNumberInput control={control} errors={errors} input={{ name: 'total-invited' }} />
        </View>

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Show guest list" header />
            <CustomText text="Names of attending guests will be displayed on the invite" />
          </View>
          <CustomSwitch control={control} errors={errors} input={{ name: 'show-guest-list' }} />
        </View>

        <Spacer height={5} />
        <View style={{ alignSelf: 'flex-end' }}>
          <CustomButton text="next" onPress={handleSubmit(onSubmit)} small primary />
        </View>

        <Spacer height={2} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    width: widthPercentageToDP(85),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: widthPercentageToDP(7),
  },
  textConatiner: {
    width: widthPercentageToDP(60),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default RSVP;
