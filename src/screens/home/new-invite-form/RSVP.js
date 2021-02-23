import React, { useCallback,useEffect, useState  } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Image, StatusBar, ImageBackground, View, ScrollView, Switch,Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer from 'ping/src/components/Spacer';
import styles, { colors } from 'ping/src/styles/styles';
import { Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import { useForm } from 'react-hook-form';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import rsvpprogline from 'ping/assets/createnew/rsvp/rsvpprogline.png';
import collect from 'ping/assets/createnew/rsvp/collect.png';
import request from 'ping/assets/createnew/rsvp/request.png';
import total from 'ping/assets/createnew/rsvp/total.png';
import guestlist from 'ping/assets/createnew/rsvp/guestlist.png';
import NumericInput from 'react-native-numeric-input';

function RSVP({navigation}) {

  const { data, control, handleSubmit, errors, reset, formState, setValue } = useForm({
    //resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const onSubmit = () => {
    console.log(data);
    // navigation.navigate('Signinpopup');
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

  const submited=()=>{
    console.log({eventname: eventname, start: start, end: end, location: showloc, hostedby: hosted, description: description});
   }

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
              left: heightPercentageToDP('0.5'),
            }}
          />
          <Image
            source={collect}
            style={{
              height: heightPercentageToDP('40'),
              width: widthPercentageToDP('80'),
              marginTop: heightPercentageToDP('-18'),
              left: heightPercentageToDP('0.5'),
              resizeMode: 'contain',
            }}
          />
          <View>
            <Switch
              style={{
                height: heightPercentageToDP('10'),
                width: widthPercentageToDP('10'),
                marginTop: heightPercentageToDP('-20'),
                left: heightPercentageToDP('35'),
                resizeMode: 'contain',
              }}
              trackColor={{ false: 'lightgray', true: '#3D8976' }}
              onValueChange={(value) => toggleSwitch(value, 'rsvp')}
              value={collectrsvp}
            />
          </View>
          <Image
            source={request}
            style={{
              height: heightPercentageToDP('40'),
              width: widthPercentageToDP('80'),
              marginTop: heightPercentageToDP('-28'),
              left: heightPercentageToDP('0'),
              resizeMode: 'contain',
            }}
          />
          <View>
            <Switch
              style={{
                height: heightPercentageToDP('10'),
                width: widthPercentageToDP('10'),
                marginTop: heightPercentageToDP('-20'),
                left: heightPercentageToDP('35'),
                resizeMode: 'contain',
              }}
              trackColor={{ false: 'lightgray', true: '#3D8976' }}
              onValueChange={(value) => toggleSwitch(value, 'kids')}
              value={kidsattending}
            />
          </View>
          <Image
            source={total}
            style={{
              height: heightPercentageToDP('40'),
              width: widthPercentageToDP('60'),
              marginTop: heightPercentageToDP('-28'),
              left: heightPercentageToDP('0'),
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              height: heightPercentageToDP('10'),
              width: widthPercentageToDP('3'),
              marginTop: heightPercentageToDP('-22.5'),
              left: heightPercentageToDP('33'),
              resizeMode: 'contain',
            }}
          >
            <NumericInput
              onChange={(value) => {setNumericInput(value);console.log(value)}}
              totalWidth={72}
              totalHeight={35}
              iconSize={25}
              step={1}
              valueType="real"
              rounded
              textColor="#B0228C"
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor="#3D8976"
              leftButtonBackgroundColor="#3D8976"
            />
          </View>
          <Image
            source={guestlist}
            style={{
              height: heightPercentageToDP('40'),
              width: widthPercentageToDP('75'),
              marginTop: heightPercentageToDP('-15'),
              left: heightPercentageToDP('0'),
              resizeMode: 'contain',
            }}
          />
          <View>
            <Switch
              style={{
                height: heightPercentageToDP('10'),
                width: widthPercentageToDP('10'),
                marginTop: heightPercentageToDP('-20'),
                left: heightPercentageToDP('35'),
                resizeMode: 'contain',
              }}
              trackColor={{ false: 'lightgray', true: '#3D8976' }}
              onValueChange={(value) => toggleSwitch(value, 'guest')}
              value={guestlists}
            />
          </View>
          <View style={{ alignSelf: 'flex-end' }}>
            <CustomButton text="next" onPress={handleSubmit(onSubmit)} small primary />
          </View>

          <Spacer height={2} />
        </View>
      </KeyboardAwareScrollView>
  );
}
export default RSVP;
