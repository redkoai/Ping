import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import detail from "../../../assets/createnew/details/detail.png";
import deprogline from "../../../assets/createnew/details/detailsprogressline.png";
import deprog from "../../../assets/createnew/details/detailsprogress.png";
import dename from "../../../assets/createnew/details/detailsnameyourevent.png";
import destart from "../../../assets/createnew/details/detailsstart.png";
import deend from "../../../assets/createnew/details/detailsend.png";
import deloc from "../../../assets/createnew/details/detailslocation.png";
import dehosted from "../../../assets/createnew/details/detailshosted.png";
import demsg from "../../../assets/createnew/details/detailswritemessage.png";
import dedesc from "../../../assets/createnew/details/detailsdescription.png";
import denext from "../../../assets/createnew/details/detailsnext.png";
import NavBar_invite from "../../navbars/NarBar_invite";


function Details({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
             {/* <Image source={detail} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('-75'),left:heightPercentageToDP('-2')}} />
            <Image source={deprogline} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('85'),  resizeMode:'contain',marginTop: heightPercentageToDP('-4'),left:heightPercentageToDP('1')}} />   */}
            <Image source={deprog} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('25'), marginTop: heightPercentageToDP('28'), resizeMode:'contain' }} /> 
            <Image source={dename} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-15'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <Image source={destart} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-30'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <Image source={deend} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-30'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} />
            <Image source={deloc} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-30'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <Image source={dehosted} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-30'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <Image source={demsg} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('35'), marginTop: heightPercentageToDP('-33'), resizeMode:'contain' }} /> 
            <Image source={dedesc} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-30'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-32'),right:heightPercentageToDP('-21'), resizeMode:'contain' }} /> 
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
export default Details