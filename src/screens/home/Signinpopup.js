import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "ping/src/navbars/NarBar";
import popup from "ping/assets/createnew/signinpopup/popup.png";
import signin from "ping/assets/createnew/signinpopup/signin.png";
import email from "ping/assets/createnew/signinpopup/email.png";
import password from "ping/assets/createnew/signinpopup/password.png";
import signinlarge from "ping/assets/createnew/signinpopup/signinlarge.png";
import googlesignin from "ping/assets/createnew/signinpopup/googlesignin.png";
import register from "ping/assets/createnew/signinpopup/register.png";
import NavBar_invite from "ping/src/navbars/NarBar_invite";


function Signinpopup({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={popup} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('12')}} />
            <Image source={signin} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('60'),  resizeMode:'contain',marginTop: heightPercentageToDP('-5'), left:heightPercentageToDP('1')}} />
            <Image source={email} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-13'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={password} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={signinlarge} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={googlesignin} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-30'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={register} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('60'), marginTop: heightPercentageToDP('-14'),left:heightPercentageToDP('7.5'), resizeMode:'contain' }} />   
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
export default Signinpopup