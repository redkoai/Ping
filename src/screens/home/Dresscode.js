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
import dresscode from "../../../assets/createnew/dresscode/dresscode.png";
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
            <TouchableOpacity onPress={() => { 
                    navigation.navigate('Details')
                }}>
            <Image source={chevron} style={{height: heightPercentageToDP('30'), width :widthPercentageToDP('8'),  resizeMode:'contain',marginTop: heightPercentageToDP('14'),left:heightPercentageToDP('0') }} />  
            </TouchableOpacity>
            <Image source={back} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('10'),  resizeMode:'contain',marginTop: heightPercentageToDP('-20'),left:heightPercentageToDP('4')  }} />
            <Image source={dresscode} style={{height: heightPercentageToDP('25'), width :widthPercentageToDP('30'),  resizeMode:'contain',marginTop: heightPercentageToDP('-17.5'),right:heightPercentageToDP('-29.5') }} />
            <Image source={deprogline} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('85'),  resizeMode:'contain',marginTop: heightPercentageToDP('-12'), left:heightPercentageToDP('2')}} />
            <Image source={optone} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('50'), marginTop: heightPercentageToDP('-2'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={opttwo} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('40'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={optthree} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('35'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={optfour} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('43'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={optfive} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('25'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={rect} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'), marginTop: heightPercentageToDP('1'),right:heightPercentageToDP('-4'), resizeMode:'contain' }} /> 
            <Image source={optional} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('65'), marginTop: heightPercentageToDP('2'), resizeMode:'contain',left:heightPercentageToDP('0.7') }} /> 
            <Image source={upload} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('65'), marginTop: heightPercentageToDP('-2.2'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <TouchableOpacity onPress={() => { 
                    navigation.navigate('FAQ')
                }}>
            <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-12'),right:heightPercentageToDP('-23'), resizeMode:'contain' }} />  
            </TouchableOpacity>

            </View>
            </ImageBackground>
            <NavBar_invite/>
        </View>
    )
}
export default DressCode