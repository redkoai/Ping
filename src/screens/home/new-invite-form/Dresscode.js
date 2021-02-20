import React, { useContext, useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, ImageBackground, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback,Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';

import emptyHome from 'ping/assets/homeScreen/bg.png';
import styles from 'ping/src/styles/styles';
import { Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import RadioButton from 'rn-radio-button';
import NavBar from 'ping/src/navbars/NarBar';
import deprogline from 'ping/assets/createnew/dresscode/dresscodeprogline.png';
import rect from 'ping/assets/createnew/dresscode/rectangle.png';
import optional from 'ping/assets/createnew/dresscode/optional.png';
import ImagePicker from 'ping/src/components/inputs/ImagePicker';
import upload from 'ping/assets/createnew/dresscode/upload.png';
import CustomTextInput from 'ping/src/components/inputs/CustomTextInput';
import denext from 'ping/assets/createnew/details/detailsnext.png';
import NavBar_invite from 'ping/src/navbars/NarBar_invite';

function Dresscode({}) {
  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const navigation = useNavigation();
  const [radiobtn, setRadiobtn] = useState('');
  const [val, setVal] = useState('');
  const [description,setDescription] = useState('');
  const [image,setImage] = useState('');

  function pressCircle(i) {
    setVal(i);
  }
  const handleDescription = (text) => setDescription(text);

  const listData = [
    { label: 'Casual and Comfortable', value: 1 },
    { label: 'Business casual', value: 2 },
    { label: 'Semi-formal', value: 3 },
    { label: 'Formal/Black tie', value: 4 },
    { label: 'custom', value: 5 },
  ];

  const submited=(val,description)=>{
    console.log({radiovalue: val, description: description});
    // Alert.alert('FAQ RESULTS',"park:' + p + 'secret:' + s + 'guests:' + g + 'qsn:' + q",[{text:'okay',style:'destructive'}]);
   }

  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
    <View style={{ flex: 1 }}>
    <ScrollView>
      <ImageBackground source={emptyHome} style={styles.homeEmpty}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: widthPercentageToDP(3),
          }}
        >
          <Image
            source={deprogline}
            style={{
              height: heightPercentageToDP('10'),
              width: widthPercentageToDP('85'),
              resizeMode: 'contain',
              marginTop: heightPercentageToDP('-2.5'),
              left: heightPercentageToDP('2'),
            }}
          />
            <View style={{ position: 'relative', left: 10 }}>
              <RadioButton
                outerWidth={30}
                innerWidth={20}
                borderWidth={1.5}
                data={listData}
                color={'black'}
                onPress={pressCircle}
                wrapperStyle={{ padding: 4 }}
              />
            </View>
            {/* <View
              style={{
                marginHorizontal: 10,
                marginVertical: 10,
                alignItems: 'center',
              }}
            >
              <Text>{'clicked item value is: ' + val}</Text>
            </View> */}
            <View
              style={{
                height: heightPercentageToDP('12'),
                width: widthPercentageToDP('95'),
                marginTop: heightPercentageToDP('1'),
                right: heightPercentageToDP('-2'),
                resizeMode: 'contain',
              }}
            >
             <CustomTextInput input={{name:'dresscode',label:'',placeholder:"Do you have specific theme or color in mind? Don't make your guests guess!",defaultValue: ''}} 
            control={control}
             errors={errors}
             value={description}
             onChangeText={handleDescription}
             rules={{multiline:'true',numberOfLines:'5'}} 
           
            />
            </View>
            {/* <Image source={rect} style={{height: heightPercentageToDP('12'), width :widthPercentageToDP('95'), marginTop: heightPercentageToDP('1'),right:heightPercentageToDP('-2'), resizeMode:'contain' }} />  */}
            <Image
              source={optional}
              style={{
                height: heightPercentageToDP('10'),
                width: widthPercentageToDP('65'),
                marginTop: heightPercentageToDP('2'),
                resizeMode: 'contain',
                left: heightPercentageToDP('0.7'),
              }}
            />
            {/* <Image source={upload} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('65'), marginTop: heightPercentageToDP('-2.2'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} />  */}
            <ImagePicker/>
            <TouchableOpacity
              onPress={() => {
                submited(val,description);
                navigation.navigate('FAQ');
              }}
            >
              <Image
                source={denext}
                style={{
                  height: heightPercentageToDP('47'),
                  width: widthPercentageToDP('45'),
                  marginTop: heightPercentageToDP('-12'),
                  right: heightPercentageToDP('-23'),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
        </View>
      </ImageBackground>
      </ScrollView>
      <NavBar_invite />
    </View>
    </TouchableWithoutFeedback>
  );
}

export default Dresscode;
