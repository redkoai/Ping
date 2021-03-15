import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState, useContext} from "react";
import SignInModal from 'ping/src/components/inputs/SignInModal';
import popup from "ping/assets/createnew/signinpopup/popup.png";
import signin from "ping/assets/createnew/signinpopup/signin.png";
import email from "ping/assets/createnew/signinpopup/email.png";
import password from "ping/assets/createnew/signinpopup/password.png";
import signinlarge from "ping/assets/createnew/signinpopup/signinlarge.png";
import googlesignin from "ping/assets/createnew/signinpopup/googlesignin.png";
import register from "ping/assets/createnew/signinpopup/register.png";
import NewInviteContext from 'ping/src/contexts/NewInviteContext';

function Signinpopup({}) {
    const navigation = useNavigation()
    const { formData, updateFormData } = useContext(NewInviteContext);
    const [isSignInVisible, setSignInVisibility] = useState(true);
    console.log("in signin popup", formData);
    return (
        <View style={{flex: 1}}>
        <SignInModal
        isVisible={isSignInVisible}
        onCancel={() => setSignInVisibility(false)}
      />
    </View>
        // <View style={{flex: 1}}>    
        //     <ImageBackground source={emptyHome} style={styles.homeEmpty}>
        //     <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
        //     <Image source={popup} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('12')}} />
        //     <Image source={signin} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('60'),  resizeMode:'contain',marginTop: heightPercentageToDP('-5'), left:heightPercentageToDP('1')}} />
        //     <Image source={email} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-13'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
        //     <Image source={password} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('90'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
        //     <Image source={signinlarge} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-28'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
        //     <Image source={googlesignin} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-30'),left:heightPercentageToDP('2'), resizeMode:'contain' }} /> 
        //     <Image source={register} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('60'), marginTop: heightPercentageToDP('-14'),left:heightPercentageToDP('7.5'), resizeMode:'contain' }} />   
               
        //     </View>
        //     </ImageBackground>
        // </View>
    )
}
export default Signinpopup