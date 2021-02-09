import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import createNewEventBtn from "../../../assets/NavBarAssets/createNewEventBtn.png"
import addFriendsBtn from "../../../assets/NavBarAssets/addFriendsBtn.png"
import emptyPic from "../../../assets/events/calendar.png";
import homettl from "../../../assets/events/eventsttl.png";
import NavBar_events from "../../navbars/NarBar_events";


function Events({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={homettl} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('90'),  resizeMode:'contain',marginTop: heightPercentageToDP('10'), }} />
            <Image source={emptyPic} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('0'), resizeMode:'contain' }} />
                <TouchableOpacity onPress={() => { 
                    // navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={createNewEventBtn} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('5') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { 
                    // navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={addFriendsBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginBottom: heightPercentageToDP('15'), resizeMode:'contain' , left:heightPercentageToDP('5')}} />
                </TouchableOpacity>
            </View>
            </ImageBackground>
            <NavBar_events/>
        </View>
    )
}

export default Events