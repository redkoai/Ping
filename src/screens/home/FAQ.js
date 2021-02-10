import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import back from "../../../assets/createnew/faq/back.png";
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
            <Image source={back} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('14'), }} />
            <Image source={faqprogline} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('80'),  resizeMode:'contain',marginTop: heightPercentageToDP('-4'), left:heightPercentageToDP('3.5')}} />
            <Image source={park} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-18'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={secretcode} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={guests} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={question} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={message} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-14'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-12'),right:heightPercentageToDP('-23'), resizeMode:'contain' }} />  
            
                {/* <TouchableOpacity onPress={() => { 
                    // navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={createNewEventBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('5') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { 
                    // navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={addFriendsBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginBottom: heightPercentageToDP('15'), resizeMode:'contain' , left:heightPercentageToDP('5')}} />
                </TouchableOpacity> */}
            </View>
            </ImageBackground>
            <NavBar_invite/>
        </View>
    )
}
export default FAQ