import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
// import back from "../../../assets/createnew/details/back.png";
import chevron from "../../../assets/createnew/templates/chevron.png";
import back from "../../../assets/createnew/templates/back.png";
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
        <ScrollView>
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <TouchableOpacity onPress={() => { 
                navigation.navigate('createnewtemplates')
            }}>
              <Image source={chevron} style={{height: heightPercentageToDP('30'), width :widthPercentageToDP('9'),  resizeMode:'contain',marginTop: heightPercentageToDP('-6'),left:heightPercentageToDP('-1') }} />  
              </TouchableOpacity>
            {/* <Image source={back} style={{height: heightPercentageToDP('30'), width :widthPercentageToDP('20'),  resizeMode:'contain',marginTop: heightPercentageToDP('-7'),left:heightPercentageToDP('0.5') }} />  */}
            
            <Image source={back} style={{height: heightPercentageToDP('30'), width :widthPercentageToDP('13'),  resizeMode:'contain',marginTop: heightPercentageToDP('-30.5'),left:heightPercentageToDP('3') }} />
            <Image source={detail} style={{height: heightPercentageToDP('25'), width :widthPercentageToDP('20'),  resizeMode:'contain',marginTop: heightPercentageToDP('-27.5'),right:heightPercentageToDP('-32') }} />
            <Image source={deprogline} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('88'),  resizeMode:'contain',marginTop: heightPercentageToDP('-11'), }} />
            {/* <Image source={deprog} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('25'), marginTop: heightPercentageToDP('-4'), resizeMode:'contain' }} />  */}
            <Image source={dename} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-15'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <Image source={destart} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <Image source={deend} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} />
            <Image source={deloc} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <Image source={dehosted} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <Image source={demsg} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('35'), marginTop: heightPercentageToDP('-31'), resizeMode:'contain' }} /> 
            <Image source={dedesc} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('0.5'), resizeMode:'contain' }} /> 
            <TouchableOpacity onPress={() => { 
                    navigation.navigate('DressCode')
                }}>
            <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-28'),right:heightPercentageToDP('-21'), resizeMode:'contain' }} /> 
            </TouchableOpacity>
            </View>
            </ImageBackground>
            </ScrollView>
            <NavBar_invite/>  
        </View>
    )
}
export default Details