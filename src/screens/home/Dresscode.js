import {useNavigation} from "@react-navigation/native";
import {Image,Text, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import RadioButton from "rn-radio-button";
import NavBar from "../../navbars/NarBar";
import deprogline from "../../../assets/createnew/dresscode/dresscodeprogline.png";
import optone from "../../../assets/createnew/dresscode/optionone.png";
import opttwo from "../../../assets/createnew/dresscode/optiontwo.png";
import optthree from "../../../assets/createnew/dresscode/optionthree.png";
import optfour from "../../../assets/createnew/dresscode/optionfour.png";
import optfive from "../../../assets/createnew/dresscode/optionfive.png";
import rect from "../../../assets/createnew/dresscode/rectangle.png";
import optional from "../../../assets/createnew/dresscode/optional.png";
import ImagePicker from '../../components/ImagePicker';
import upload from "../../../assets/createnew/dresscode/upload.png";
import denext from "../../../assets/createnew/details/detailsnext.png";
import NavBar_invite from "../../navbars/NarBar_invite";


function Dresscode({}) {
    const navigation = useNavigation()
    const [radiobtn, setRadiobtn] = useState('');
    const [val, setVal] = useState('');

     function pressCircle(i) {
        setVal(i);
      }
      const listData = [
        { label: "Casual and Comfortable", value: 1 },
        { label: "Business casual", value: 2 },
        { label: "Semi-formal", value: 3 },
        { label: "Formal/Black tie", value: 4 },
        {label:"custom",value:5}
      ];

    return (
        <View style={{flex: 1}}>  
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={deprogline} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('85'),  resizeMode:'contain',marginTop: heightPercentageToDP('-2.5'), left:heightPercentageToDP('2')}} />
            <ScrollView>
        <View style={{position:'relative',left:10}}>
        <RadioButton
          outerWidth={30}
          innerWidth={20}
          borderWidth={1.5}
          data={listData}
          color={"black"}
          onPress={pressCircle}
          wrapperStyle={{ padding: 4 }}
        />
        </View>
         <View
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            alignItems: "center"
          }}
        >
          <Text>{"clicked item value is: " + val}</Text>
        </View>
            {/* <Image source={optone} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('50'), marginTop: heightPercentageToDP('-2'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={opttwo} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('40'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={optthree} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('35'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={optfour} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('43'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={optfive} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('25'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} />  */}
            <Image source={rect} style={{height: heightPercentageToDP('12'), width :widthPercentageToDP('95'), marginTop: heightPercentageToDP('1'),right:heightPercentageToDP('-2'), resizeMode:'contain' }} /> 
            <Image source={optional} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('65'), marginTop: heightPercentageToDP('2'), resizeMode:'contain',left:heightPercentageToDP('0.7') }} /> 
            {/* <Image source={upload} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('65'), marginTop: heightPercentageToDP('-2.2'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} />  */}
            <ImagePicker/>
            <TouchableOpacity onPress={() => { 
                    navigation.navigate('FAQ')
                }}>
            <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-12'),right:heightPercentageToDP('-23'), resizeMode:'contain' }} />  
            </TouchableOpacity>
            </ScrollView> 
            </View>
            
            </ImageBackground>
             
            <NavBar_invite/>
            
        </View>
    )
}

export default Dresscode