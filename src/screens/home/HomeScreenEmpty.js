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
import emptyPic from "../../../assets/homeScreen/homeEmptyPic.png";
import homettl from "../../../assets/homeScreen/homettl.png";


function HomeScreenEmpty({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={homettl} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('10'), resizeMode:'contain' }} />
            <Image source={emptyPic} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('0'), resizeMode:'contain' }} />
                <TouchableOpacity onPress={() => { 
                    // navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={createNewEventBtn} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('70'), bottom: heightPercentageToDP('0'), resizeMode:'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { 
                    // navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={addFriendsBtn} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('70'), bottom: heightPercentageToDP('0'), resizeMode:'contain' }} />
                </TouchableOpacity>
            </View>
            </ImageBackground>
            <NavBar/>
        </View>
    )
}

export default HomeScreenEmpty