import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import chevron from "../../../assets/createnew/templates/chevron.png";
import back from "../../../assets/createnew/templates/back.png";
import rsvp from "../../../assets/createnew/rsvp/rsvp.png";
import rsvpprogline from "../../../assets/createnew/rsvp/rsvpprogline.png";
import collect from "../../../assets/createnew/rsvp/collect.png";
import request from "../../../assets/createnew/rsvp/request.png";
import total from "../../../assets/createnew/rsvp/total.png";
import guestlist from "../../../assets/createnew/rsvp/guestlist.png";
import denext from "../../../assets/createnew/details/detailsnext.png";
import NavBar_invite from "../../navbars/NarBar_invite";


function RSVP({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <TouchableOpacity onPress={() => { 
                navigation.navigate('FAQ')
            }}>
              <Image source={chevron} style={{height: heightPercentageToDP('30'), width :widthPercentageToDP('8.5'),  resizeMode:'contain',marginTop: heightPercentageToDP('9'),left:heightPercentageToDP('-1') }} />  
              </TouchableOpacity>
            <Image source={back} style={{height: heightPercentageToDP('30'), width :widthPercentageToDP('11.5'),  resizeMode:'contain',marginTop: heightPercentageToDP('-30.5'),left:heightPercentageToDP('3') }} />
            <Image source={rsvp} style={{height: heightPercentageToDP('25'), width :widthPercentageToDP('30'),  resizeMode:'contain',marginTop: heightPercentageToDP('-27.5'),right:heightPercentageToDP('-28') }} />
            {/* <Image source={back} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('18'), }} /> */}
            <Image source={rsvpprogline} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('85'),  resizeMode:'contain',marginTop: heightPercentageToDP('-12'), left:heightPercentageToDP('2')}} />
            <Image source={collect} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-18'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={request} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={total} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={guestlist} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <TouchableOpacity onPress={() => { 
                navigation.navigate('Signinpopup')
                }}>
            <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-17'),right:heightPercentageToDP('-20'), resizeMode:'contain' }} />  
            </TouchableOpacity>
            </View>
            </ImageBackground>
            <NavBar_invite/>
        </View>
    )
}
export default RSVP