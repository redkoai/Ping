import React, { useState, useContext,useEffect } from 'react';
import { colors, textStyles } from 'ping/src/styles/styles';
import styles from 'ping/src/styles/styles';
import emptyHome from 'ping/assets/homeScreen/bg.png';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import { Image, StyleSheet,ImageBackground, StatusBar,ScrollView, View,Text,TouchableOpacity} from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import firebase from 'firebase';
import 'firebase/firestore'

function SecretCode({ navigation }) {

  const [secretCode, setSecretCode] = useState('');

  useEffect(() => {
   //firebase.database().ref('/InviteForms').child("-MW_XbsJOLm2BCA6nA_K").child("formData").on('value',(snapshot)=>{
  firebase.database().ref('/InviteForms').limitToLast(1).on('value',(snapshot)=>{ 
  let data = snapshot.val() ? snapshot.val() : {};
  Object.keys(data).forEach(key => {
    const dataobject =data[key];
    const secretcode= dataobject.secret_code
    setSecretCode(secretcode);
  })
    })
 }, []);
      
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
    

        <View style={{ 
            height: heightPercentageToDP('70'),
            width :widthPercentageToDP('95'), 
            resizeMode:'contain',
            marginTop: heightPercentageToDP('20'),
            left:heightPercentageToDP('8')}}>
            <Text style={[textStyles.bigBold ]}>YOUR SECRET EVENT CODE</Text>
            </View>

            <View style={{ 
            height: heightPercentageToDP('10'),
            width :widthPercentageToDP('95'), 
            resizeMode:'contain',
            marginTop: heightPercentageToDP('-62'),
            left:heightPercentageToDP('13')}}>
                <Text style={[textStyles.bigBold ]}>{secretCode}</Text>
            </View>
        <TouchableOpacity style={{marginTop: heightPercentageToDP('8'),left:heightPercentageToDP('4')}}>
        <CustomButton
         text="I'm here"
         shadow
         primary
         />
         </TouchableOpacity>

        <TouchableOpacity style={{marginTop: heightPercentageToDP('0'),left:heightPercentageToDP('4')}}>
        <CustomButton
          text="View photos"
          shadow
        />
        </TouchableOpacity>

        </View>
      </KeyboardAwareScrollView>
    );

}

export default SecretCode;