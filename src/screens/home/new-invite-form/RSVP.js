import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Text,
  View,
  ScrollView,
  Switch,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer from 'ping/src/components/Spacer';
import globalStyles, { colors, textStyles } from 'ping/src/styles/styles';
import { Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import { useForm } from 'react-hook-form';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import CustomText from 'ping/src/components/CustomText';
import rsvpprogline from 'ping/assets/createnew/rsvp/rsvpprogline.png';
import NumericInput from 'react-native-numeric-input';

function RSVP({ navigation }) {
  const { data, control, handleSubmit, errors, reset, formState, setValue } = useForm({
    //resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const onSubmit = () => {
    console.log(data);
    //navigation.navigate('Signinpopup');
  };

  const [collectrsvp, setCollectrsvp] = useState(false);
  const [kidsattending, setKidsattending] = useState(false);
  const [guestlists, setGuestlists] = useState(false);
  const [numericInput, setNumericInput] = useState(0);

  const toggleSwitch = (value, label) => {
    console.log(value, label);
    if (label === 'kids') {
      setKidsattending(value);
    }
    if (label === 'rsvp') {
      setCollectrsvp(value);
    }
    if (label === 'guest') {
      setGuestlists(value);
    }
  };

  const submited = () => {
    console.log({
      eventname: eventname,
      start: start,
      end: end,
      location: showloc,
      hostedby: hosted,
      description: description,
    });
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
          <Switch
            trackColor={{ false: 'lightgray', true: colors.primary }}
            onValueChange={(value) => toggleSwitch(value, 'rsvp')}
            value={collectrsvp}
          />
        </View>

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Request number of kids attending" header />
            <CustomText text="Get head count of both adults and kids attending" />
          </View>
          <Switch
            trackColor={{ false: 'lightgray', true: colors.primary }}
            onValueChange={(value) => toggleSwitch(value, 'kids')}
            value={kidsattending}
          />
        </View>

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Total invited per invitation" header />
            <CustomText text="This includes the person that receives the invite" />
          </View>
          <NumericInput
            onChange={(value) => {
              setNumericInput(value);
              console.log(value);
            }}
            totalWidth={72}
            totalHeight={35}
            iconSize={25}
            step={1}
            valueType="real"
            rounded
            textColor="#B0228C"
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor={colors.primary}
            leftButtonBackgroundColor={colors.primary}
          />
        </View>

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Show guest list" header />
            <CustomText text="Names of attending guests will be displayed on the invite" />
          </View>
          <Switch
            trackColor={{ false: 'lightgray', true: colors.primary }}
            onValueChange={(value) => toggleSwitch(value, 'guest')}
            value={guestlists}
          />
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
