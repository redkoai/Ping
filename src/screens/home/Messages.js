import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/Emptystates/mbg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar_message from "../../navbars/NarBar_message";
import createNewEventBtn from "../../../assets/NavBarAssets/createNewEventBtn.png"
import addFriendsBtn from "../../../assets/NavBarAssets/addFriendsBtn.png"

function Events({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
                <TouchableOpacity onPress={() => { 
                    // navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={createNewEventBtn} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('70'), bottom: heightPercentageToDP('-38'), resizeMode:'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { 
                    // navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={addFriendsBtn} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('70'), bottom: heightPercentageToDP('-25'), resizeMode:'contain' }} />
                </TouchableOpacity>
            </View>
            </ImageBackground>
            <NavBar_message/>
        </View>
    )
}

export default Events