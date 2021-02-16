import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import faqprogline from "../../../assets/createnew/faq/faqprogline.png";
import park from "../../../assets/createnew/faq/park.png";
import secretcode from "../../../assets/createnew/faq/secretcode.png";
import guests from "../../../assets/createnew/faq/guests.png";
import question from "../../../assets/createnew/faq/question.png";
import message from "../../../assets/createnew/faq/message.png";
import denext from "../../../assets/createnew/details/detailsnext.png";
import NavBar_invite from "../../navbars/NarBar_invite";


function FAQ({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={faqprogline} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('85'),  resizeMode:'contain',marginTop: heightPercentageToDP('5'), left:heightPercentageToDP('0')}} />
            <Image source={park} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-18'),left:heightPercentageToDP('0'), resizeMode:'contain' }} /> 
            <Image source={secretcode} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('0'), resizeMode:'contain' }} /> 
            <Image source={guests} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('0'), resizeMode:'contain' }} /> 
            <Image source={question} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('0'), resizeMode:'contain' }} /> 
            <Image source={message} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-14'),left:heightPercentageToDP('0'), resizeMode:'contain' }} /> 
            <TouchableOpacity onPress={() => { 
                    navigation.navigate('RSVP')
                }}>
            <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-12'),right:heightPercentageToDP('-18'), resizeMode:'contain' }} />  
            </TouchableOpacity>
           
            </View>
            </ImageBackground>
            <NavBar_invite/>
        </View>
    )
}
export default FAQ