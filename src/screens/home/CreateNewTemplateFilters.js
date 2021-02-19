import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "ping/src/navbars/NarBar";
import overlay from "ping/assets/createnew/templates/darkoverlay.png";
import popup from "ping/assets/createnew/templates/popupbag.png";
import icons from "ping/assets/createnew/templates/icons.png";
import filter from "ping/assets/createnew/templates/filter.png";
import event from "ping/assets/createnew/templates/Eventtype.png";
import themes from "ping/assets/createnew/templates/Themes.png";
import colors from "ping/assets/createnew/templates/Colors.png";
import NavBar_invite from "ping/src/navbars/NarBar_invite";


function CreateNewTemplateFilters({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            {/* <Image source={overlay} style={{height: heightPercentageToDP('100'), width :widthPercentageToDP('100'),  resizeMode:'contain',marginTop: heightPercentageToDP('0'), }} /> */}
            {/* <Image source={popup} style={{height: heightPercentageToDP('100'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('0'), resizeMode:'contain' }} /> */}
            <Image source={icons}  style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('8'), marginTop: heightPercentageToDP('-40'), left:heightPercentageToDP('-15'), resizeMode:'contain' }} />   
            <Image source={filter} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('16'), marginTop: heightPercentageToDP('-15'), right:heightPercentageToDP('-20'), resizeMode:'contain' }} />   
            <Image source={event} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('25'), left:heightPercentageToDP('-15'),marginTop: heightPercentageToDP('-5'),resizeMode:'contain' }} />  
            <Image source={themes} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('20'), left:heightPercentageToDP('-15'),marginTop: heightPercentageToDP('-2'),resizeMode:'contain' }} />
            <Image source={colors} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('15'), left:heightPercentageToDP('-15'),marginTop: heightPercentageToDP('5'),resizeMode:'contain' }} />
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

export default CreateNewTemplateFilters