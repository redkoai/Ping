import React, { useContext, useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, View, ScrollView, TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert } from 'react-native';
import emptyHome from 'ping/assets/homeScreen/bg.png';
import styles from 'ping/src/styles/styles';
import { Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomTextInput from 'ping/src/components/CustomTextInput';
import NavBar from 'ping/src/navbars/NarBar';
import faqprogline from 'ping/assets/createnew/faq/faqprogline.png';
import message from 'ping/assets/createnew/faq/message.png';
import denext from 'ping/assets/createnew/details/detailsnext.png';
import NavBar_invite from 'ping/src/navbars/NarBar_invite';

function FAQ({}) {
  const navigation = useNavigation();
  const [park,setPark]=useState('');
  const [secretcode,setSecretcode]=useState('');
  const [guests,setGuests]=useState('');
  const [question,setQuestion]=useState('');
  const [clear,setClear]=useState('');

  // const resetHandler= () => {
  //   setPark('');
  //   setSecretcode('');
  //   setGuests('');
  //   setQuestion('');
  // };
 
  const handlePark=(text)=>setPark(text);
  const handleSecret=(text)=>setSecretcode(text);
  const handleGuests=(text)=>setGuests(text);
  const handleQuestions=(text)=>setQuestion(text);

  const submited=(p,s,g,q)=>{
   console.log({park:p, secretcode:s, guests:g, question:q});
  //  Alert.alert('FAQ RESULTS',"park:' + p + 'secret:' + s + 'guests:' + g + 'qsn:' + q",[{text:'okay',style:'destructive'}]);
  }

  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));


  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
    <View style={{ flex: 1 }}>
      <ImageBackground source={emptyHome} style={styles.homeEmpty}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: widthPercentageToDP(3),
          }}
        >
          <Image
            source={faqprogline}
            style={{
              height: heightPercentageToDP('10'),
              width: widthPercentageToDP('85'),
              resizeMode: 'contain',
              marginTop: heightPercentageToDP('14'),
              left: heightPercentageToDP('0'),
            }}
          />
            <CustomTextInput input={{name:'faqpeoplepark',label:'Where should people park?',placeholder:'Street parking',defaultValue: ''}} 
            control={control}
             errors={errors}
             value={park}
             onChangeText={handlePark}
             optional='true'
             
            />
            
            <CustomTextInput input={{name:'faqsecretcode',label:'Is there a secret code?',placeholder:'52301',defaultValue: ''}} 
            control={control}
             errors={errors}
             value={secretcode}
             onChangeText={handleSecret}
             optional='true'
            />
            <CustomTextInput input={{name:'faqguests',label:'What should guests prepare?',placeholder:'Bring some food for the potluck!',defaultValue: ''}} 
            control={control}
             errors={errors}
             value={guests}
             onChangeText={handleGuests}
             optional='true'
            />
            <CustomTextInput input={{name:'faqquestion',label:'Type your question here',placeholder:'Type the answer to your question',defaultValue: ''}} 
            control={control}
             errors={errors}
             value={question}
             onChangeText={handleQuestions}
            />
          <Image
            source={message}
            style={{
              height: heightPercentageToDP('5'),
              width: widthPercentageToDP('45'),
              marginTop: heightPercentageToDP('-3'),
              left: heightPercentageToDP('0'),
              resizeMode: 'contain',
            }}
          />
          <View >
          <TouchableOpacity
            onPress={() => {
              submited(park,secretcode,guests,question),
              navigation.navigate('RSVP');

            }}
          > 
            <Image
              // onPress={resetHandler}
              source={denext}
              style={{
                height: heightPercentageToDP('47'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-8'),
                right: heightPercentageToDP('-20'),
                resizeMode: 'contain',
              } }
            />
          </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <NavBar_invite />
    </View>
    </TouchableWithoutFeedback>
  );
}
export default FAQ;
