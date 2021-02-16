import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView,Switch} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import rsvpprogline from "../../../assets/createnew/rsvp/rsvpprogline.png";
import collect from "../../../assets/createnew/rsvp/collect.png";
import request from "../../../assets/createnew/rsvp/request.png";
import total from "../../../assets/createnew/rsvp/total.png";
import guestlist from "../../../assets/createnew/rsvp/guestlist.png";
import denext from "../../../assets/createnew/details/detailsnext.png";
import NumericInput from 'react-native-numeric-input'
import NavBar_invite from "../../navbars/NarBar_invite";


function RSVP({}) {
    const navigation = useNavigation()
    // const [isEnabled, setIsEnabled] = useState(false);
    const [collectrsvp,setCollectrsvp] =useState(false);
    const [kidsattending,setKidsattending] =useState(false);
    const [guestlists,setGuestlists] =useState(false);
    const [numericInput,setNumericInput]=useState(0);

    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch = (value, label) => {
        console.log(value, label)
     if(label === 'kids'){
        setKidsattending(value);
    } if(label==='rsvp'){
        setCollectrsvp(value);
    } if(label==='guest'){
        setGuestlists(value);
    }
};



    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={rsvpprogline} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('85'),  resizeMode:'contain',marginTop: heightPercentageToDP('5'), left:heightPercentageToDP('1')}} />
            <Image source={collect} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('80'), marginTop: heightPercentageToDP('-18'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <View>
            <Switch style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('10'), marginTop: heightPercentageToDP('-20'),left:heightPercentageToDP('35'), resizeMode:'contain' }}
                trackColor={{ false: "lightgray", true: "#3D8976" }}
                onValueChange={(value)=>toggleSwitch(value,"rsvp")}
                value={collectrsvp}
            />
            </View>
            <Image source={request} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('80'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('0'), resizeMode:'contain' }} /> 
            <View>
            <Switch style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('10'), marginTop: heightPercentageToDP('-20'),left:heightPercentageToDP('35'), resizeMode:'contain' }}
                trackColor={{ false: "lightgray", true: "#3D8976" }}
                onValueChange={(value)=>toggleSwitch(value,'kids')}
                value={kidsattending}
            />
            </View>
            <Image source={total} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('50'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('0'), resizeMode:'contain' }} /> 
            <View style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('3'), marginTop: heightPercentageToDP('-22.5'),left:heightPercentageToDP('35'), resizeMode:'contain' }}>
        <NumericInput  
            onChange={value => setNumericInput(value)} 
            totalWidth={50}
            totalHeight={35} 
            iconSize={25}
            step={1}
            valueType='real'
            rounded 
            textColor='#B0228C' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#3D8976' 
            leftButtonBackgroundColor='#3D8976'/>
        </View>
            <Image source={guestlist} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('75'), marginTop: heightPercentageToDP('-15'),left:heightPercentageToDP('0'), resizeMode:'contain' }} /> 
            <View>
            <Switch style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('10'), marginTop: heightPercentageToDP('-20'),left:heightPercentageToDP('35'), resizeMode:'contain' }}
                trackColor={{ false: "lightgray", true: "#3D8976" }}
                onValueChange={(value)=>toggleSwitch(value,'guest')}
                value={guestlists}
            />
            </View>
            {/* <TouchableOpacity onPress={() => { 
                navigation.navigate('Signinpopup')
                }}>
            <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-27'),right:heightPercentageToDP('-20'), resizeMode:'contain' }} />  
            </TouchableOpacity> */}
            </View>
            </ImageBackground>
            <NavBar_invite/>
        </View>
    )
}
export default RSVP