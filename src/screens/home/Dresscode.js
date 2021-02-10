import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import back from "../../../assets/createnew/dresscode/back.png";
import deprogline from "../../../assets/createnew/dresscode/dresscodeprogline.png";
import optone from "../../../assets/createnew/dresscode/optionone.png";
import opttwo from "../../../assets/createnew/dresscode/optiontwo.png";
import optthree from "../../../assets/createnew/dresscode/optionthree.png";
import optfour from "../../../assets/createnew/dresscode/optionfour.png";
import optfive from "../../../assets/createnew/dresscode/optionfive.png";
import rect from "../../../assets/createnew/dresscode/rectangle.png";
import optional from "../../../assets/createnew/dresscode/optional.png";
import upload from "../../../assets/createnew/dresscode/upload.png";
import denext from "../../../assets/createnew/details/detailsnext.png";
import NavBar_invite from "../../navbars/NarBar_invite";


function DressCode({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={back} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('17'), }} />
            <Image source={deprogline} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('85'),  resizeMode:'contain',marginTop: heightPercentageToDP('-4'), left:heightPercentageToDP('2')}} />
            <Image source={optone} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('50'), marginTop: heightPercentageToDP('-2'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={opttwo} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('40'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={optthree} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('35'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={optfour} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('43'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={optfive} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('25'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={rect} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'), marginTop: heightPercentageToDP('1'),right:heightPercentageToDP('-4'), resizeMode:'contain' }} /> 
            <Image source={optional} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('65'), marginTop: heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={upload} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('65'), marginTop: heightPercentageToDP('-3'),left:heightPercentageToDP('0'), resizeMode:'contain' }} /> 
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
export default DressCode