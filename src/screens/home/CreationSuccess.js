import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import allset from "../../../assets/createnew/creationsuccess/allset.png";
import tab from "../../../assets/createnew/creationsuccess/tab.png";
import invitefriends from "../../../assets/createnew/creationsuccess/invitefriends.png";
import addtocalendar from "../../../assets/createnew/creationsuccess/addtocalendar.png";
import backtohome from "../../../assets/createnew/creationsuccess/backtohome.png";
import viewevent from "../../../assets/createnew/creationsuccess/viewevent.png";
import NavBar_invite from "../../navbars/NarBar_invite";


function CreationSuccess({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={allset} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('30'),  resizeMode:'contain',marginTop: heightPercentageToDP('5'),left:heightPercentageToDP('14') }} />
            <Image source={tab} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('-4'), left:heightPercentageToDP('-0.5')}} />
            <Image source={invitefriends} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('80'), marginTop: heightPercentageToDP('-18'),right:heightPercentageToDP('-8'), resizeMode:'contain' }} /> 
            <Image source={addtocalendar} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('15'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={backtohome} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
            <Image source={viewevent} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-1'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
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
export default CreationSuccess