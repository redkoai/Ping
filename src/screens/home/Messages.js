import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState} from "react";
import CustomButton from 'ping/src/components/inputs/CustomButton';
import Spacer from 'ping/src/components/Spacer';
import emptyPic from "ping/assets/messages/img.png";
import homettl from "ping/assets/messages/messagettl.png";

import newMessageBtn from "ping/assets/newMessage.png"


function Messages({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
        <View 
        style={{ 
            flexDirection: 'column', 
            justifyContent: 'center',
            marginTop:widthPercentageToDP(3)
            }}>

        <Image 
        source={emptyPic}
         style={{height: heightPercentageToDP('40'), 
          width :widthPercentageToDP('85'),
          marginTop: heightPercentageToDP('0'),
          resizeMode:'contain'
           }} />
        
        </View>
        <Spacer height={2} />
        {/* <TouchableOpacity
        onPress={() => {
          console.log("button pressed")
          navigation.navigate('NewChat');
        }}>     
          <CustomButton
            text="Create new message"
            primary
            shadow
          />
        </TouchableOpacity>  */}

        {/* <TouchableOpacity onPress={() => { 
            navigation.navigate('Chat')
        }}>
            <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('0') }} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => { 
            navigation.navigate('CreateNewMessage')
        }}>
            <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('0') }} />
        </TouchableOpacity>
        
        
        <TouchableOpacity>
        <CustomButton
          text="Add friends"
          shadow
        />
        </TouchableOpacity>
            
        
        </ImageBackground>
        </View>
    )
}
export default Messages