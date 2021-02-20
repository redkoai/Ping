import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useContext, useEffect, useState} from "react";
import AuthContext from 'ping/src/contexts/AuthContext';
import NavBar from "ping/src/navbars/NarBar";
import CustomButton from 'ping/src/components/CustomButton';
import createNewEventBtn from "ping/assets/NavBarAssets/createNewEventBtn.png"
import addFriendsBtn from "ping/assets/NavBarAssets/addFriendsBtn.png"
import Accname from "ping/assets/Accounts/AccountName.png";
import Accfriends from "ping/assets/Accounts/friends.png";
import Accevents from "ping/assets/Accounts/Accountevents.png";
import Acccenter from "ping/assets/Accounts/Accountscenter.png";
import NavBar_account from "ping/src/navbars/NarBar_account";


function Accounts({}) {
    const navigation = useNavigation()
    const { singOutAsync } = useContext(AuthContext);

    const onSuccess = () => {
        // navigation.navigate('SignIn');
    }
    const onFailure = (errorMessage) => {
        alert(errorMessage)
    };

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={Accname} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('10'), }} />
            <Image source={Accfriends} style={{height: heightPercentageToDP('4'), width :widthPercentageToDP('30'),  resizeMode:'contain',marginTop: heightPercentageToDP('-2'), }} />
            <Image source={Accevents} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-7'), resizeMode:'contain' }} />
            <Image source={Acccenter} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('95'), marginTop: heightPercentageToDP('-2'), resizeMode:'contain' }} />
                <TouchableOpacity onPress={() => { 
                    // navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={createNewEventBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('5') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { 
                    // navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={addFriendsBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginBottom: heightPercentageToDP('15'), resizeMode:'contain' , left:heightPercentageToDP('5')}} />
                </TouchableOpacity>
            </View>
            </ImageBackground>
            <CustomButton
                text="Sign Out"
                onPress={async () => await singOutAsync(onSuccess, onFailure)}
                primary
            />
            <NavBar_account/>
        </View>
    )
}
export default Accounts