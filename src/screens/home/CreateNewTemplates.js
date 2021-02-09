import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import temp from "../../../assets/createnew/templates/templates.png";
import temp1 from "../../../assets/createnew/templates/templates1.png";
import NavBar_invite from "../../navbars/NarBar_invite";


function createnewtemplates({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={temp} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('90'),  resizeMode:'contain',marginTop: heightPercentageToDP('-35'), }} />
            <Image source={temp1} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-7'), resizeMode:'contain' }} />
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

export default createnewtemplates