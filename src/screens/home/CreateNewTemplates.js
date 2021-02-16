import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import tempprogline from "../../../assets/createnew/templates/tempprogline.png";
import temp1 from "../../../assets/createnew/templates/templates1.png";
import NavBar_invite from "../../navbars/NarBar_invite";


function createnewtemplates({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={tempprogline} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('88'),  resizeMode:'contain',marginTop: heightPercentageToDP('-35'), }} />
            <TouchableOpacity onPress={() => { 
                navigation.navigate('Details')
            }}>
            <Image source={temp1} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-8'), resizeMode:'contain' }} />
            </TouchableOpacity>  
            </View>
            </ImageBackground>
            <NavBar_invite/>
        </View>
    )
}

export default createnewtemplates