import React, { useCallback,useEffect, useState  } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Image,StyleSheet, StatusBar, ImageBackground, Text,View, ScrollView, Switch,Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer from 'ping/src/components/Spacer';
import globalStyles, { colors,textStyles } from 'ping/src/styles/styles';
import { Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import { useForm } from 'react-hook-form';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import CustomText from 'ping/src/components/inputs/CustomText';
import rsvpprogline from 'ping/assets/createnew/rsvp/rsvpprogline.png';
import NumericInput from 'react-native-numeric-input';

function RSVP({navigation}) {

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
              left: heightPercentageToDP('0.7'),
            }}
          />

          <View style={styles.fieldContainer}>
          <View style={styles.textConatiner}>
          <CustomText text="Collect RSVPs" header/>
          <CustomText text="Guests will be able to to let you know if they're attending or not"/>
            <Switch
              style={{
                height: heightPercentageToDP('7'),
                width: widthPercentageToDP('10'),
                marginTop: heightPercentageToDP('-5'),
                left: heightPercentageToDP('32'),
                resizeMode: 'contain',
              }}
              trackColor={{ false: 'lightgray', true: '#3D8976' }}
              onValueChange={(value) => toggleSwitch(value, 'rsvp')}
              value={collectrsvp}
            />
            </View>
          </View>

          <View style={styles.fieldContainer}>
          <View style={styles.textConatiner}>
          <CustomText text="Request number of kids attending" header/>
          <CustomText text="Get head count of both adults and kids attending"/>
            <Switch
              style={{
                height: heightPercentageToDP('6'),
                width: widthPercentageToDP('10'),
                marginTop: heightPercentageToDP('-5'),
                left: heightPercentageToDP('32'),
                resizeMode: 'contain',
              }}
              trackColor={{ false: 'lightgray', true: '#3D8976' }}
              onValueChange={(value) => toggleSwitch(value, 'kids')}
              value={kidsattending}
            />
            </View>
          </View>

          <View style={styles.fieldContainer}>
          <View style={styles.textConatiner}>
          <CustomText text="Total invited per invitation" header/>
          <CustomText text="This includes the person that receives the invite"/>
          <View style={{height: heightPercentageToDP('4'),
           width :widthPercentageToDP('95'),
            marginTop: heightPercentageToDP('-2'), 
            left: heightPercentageToDP('30'),
            resizeMode:'contain' }}>
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
          </View>
          </View>

          <View style={styles.fieldContainer}>
          <View style={styles.textConatiner}>
          <CustomText text="Show guest list" header/>
          <CustomText text="Names of attending guests will be displayed on the invite"/>
            <Switch
              style={{
                height: heightPercentageToDP('10'),
                width: widthPercentageToDP('10'),
                marginTop: heightPercentageToDP('-3'),
                left: heightPercentageToDP('32'),
                resizeMode: 'contain',
              }}
              trackColor={{ false: 'lightgray', true: '#3D8976' }}
              onValueChange={(value) => toggleSwitch(value, 'guest')}
              value={guestlists}
            />
          </View>
          </View>

           <View style={{ alignSelf: 'flex-end' }}>
            <CustomButton text="next" onPress={handleSubmit(onSubmit)} small primary />
          </View>
          <Spacer height={2} />
        </View>
        </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({

  textConatiner:{
    width: widthPercentageToDP(75),
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'flex-start',
    
  },

 fieldContainer:{
   width: widthPercentageToDP(90),
   flexDirection:'row',
   justifyContent:'center',
   alignItems:'center'
 }
})
export default RSVP;
