import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground,TouchableOpacity, View, ScrollView} from "react-native";
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState} from "react";
import createNewEventBtn from "ping/assets/NavBarAssets/createNewEventBtn.png"
import addFriendsBtn from "ping/assets/NavBarAssets/addFriendsBtn.png"
import CustomButton from 'ping/src/components/inputs/CustomButton';
import Spacer from 'ping/src/components/Spacer';
import settings from "ping/assets/Accounts/settings.png";
import Accname from "ping/assets/Accounts/AccountName.png";
import Accfriends from "ping/assets/Accounts/friends.png";
import Accactivity from "ping/assets/Accounts/Accountactivity.png";
import Acccenterone from "ping/assets/Accounts/Accountscenterone.png";


function Accountsone({}) {
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1 }}>
          <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: widthPercentageToDP(3),
              }}
            >

            <TouchableOpacity>
            <Image 
            source={settings} 
            style={{
            height: heightPercentageToDP('3'),
            width :widthPercentageToDP('30'), 
            resizeMode:'contain',
            marginTop: heightPercentageToDP('0'), 
            left: heightPercentageToDP('32'),
            
            }} />
            </TouchableOpacity>

            {/* <Image source={Accname} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('10'), }} /> */}
            
            <Image 
            source={Accfriends} 
            style={{height: heightPercentageToDP('4'),
             width :widthPercentageToDP('30'), 
             resizeMode:'contain',
             marginTop: heightPercentageToDP('1'),
              }} />

            {/* <Image source={Accactivity} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-7'), resizeMode:'contain' }} /> */}
            <Image 
            source={Acccenterone} 
            style={{height: heightPercentageToDP('40'),
            width :widthPercentageToDP('95'),
            marginTop: heightPercentageToDP('3'),
            left: heightPercentageToDP('1.5'),
            resizeMode:'contain'
             }} />
            </View>

        <Spacer height={2} />
        <TouchableOpacity>     
        <CustomButton
          text="Create a new event"
          primary
          shadow
        />
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
export default Accountsone