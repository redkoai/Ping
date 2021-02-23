import React, { useContext, useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Image,StatusBar, ImageBackground, View, ScrollView, TouchableOpacity,TouchableWithoutFeedback,Keyboard,Alert } from 'react-native';
import Spacer from 'ping/src/components/Spacer';
import styles,{ colors,textStyles } from 'ping/src/styles/styles';
import { Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomTextInput from 'ping/src/components/inputs/CustomTextInput';
import CustomText from 'ping/src/components/inputs/CustomText';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import faqprogline from 'ping/assets/createnew/faq/faqprogline.png';
import message from 'ping/assets/createnew/faq/message.png';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import { Ionicons } from '@expo/vector-icons'; 




  function FAQ ({ navigation }) {
    const { data, control, handleSubmit, errors, reset, formState, setValue } = useForm({
      //resolver: yupResolver(AUTH_SCHEMA),
    });
    useFocusEffect(useCallback(reset));
    
    const [park,setPark]=useState('');
    const [secretcode,setSecretcode]=useState('');
    const [guests,setGuests]=useState('');
    const [question,setQuestion]=useState('');
    const handlePark=(text)=>setPark(text);
    const handleSecret=(text)=>setSecretcode(text);
    const handleGuests=(text)=>setGuests(text);
    const handleQuestions=(text)=>setQuestion(text);
  
    const submited=(p,s,g,q)=>{
     console.log({park:p, secretcode:s, guests:g, question:q});
    }

  const onSubmit = () => {
    console.log(data);
    navigation.navigate('RSVP');
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
            marginTop: widthPercentageToDP(3),
          }}
        >
          <Image
            source={faqprogline}
            style={{
              height: heightPercentageToDP('10'),
              width: widthPercentageToDP('85'),
              resizeMode: 'contain',
              marginTop: heightPercentageToDP('-4'),
              left: heightPercentageToDP('1'),
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
            <View style={{
              height: heightPercentageToDP('40'),
              width: widthPercentageToDP('80'),
              marginTop: heightPercentageToDP('-1'),
              left: heightPercentageToDP('0.5'),
              resizeMode: 'contain',
            }}>
          <Ionicons name="add" size={24} color={colors.addsign} />
          </View>
          <View style={{
              height: heightPercentageToDP('40'),
              width: widthPercentageToDP('80'),
              marginTop: heightPercentageToDP('-40.5'),
              left: heightPercentageToDP('4'),
              resizeMode: 'contain',
            }}>
          <CustomText text="Add another question" />
           </View>
         
         <View style={{ alignSelf: 'flex-end',position:'absolute',bottom:170 }}>
            <CustomButton text="next" onPress={handleSubmit(onSubmit)} small primary />
          </View>
          <Spacer height={2} />
        </View>
        </KeyboardAwareScrollView>
      
  );
}
export default FAQ;
