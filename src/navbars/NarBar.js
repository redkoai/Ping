import {useNavigation} from "@react-navigation/native";
import {Image, View} from "react-native";
import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState}  from "react";
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homebtn from '../../assets/NavBarAssets/homeg.png'
import Eventsbtn from '../../assets/NavBarAssets/eventsb.png'
import Invitebtn from '../../assets/NavBarAssets/addb.png'
import Messagesbtn from '../../assets/NavBarAssets/messagesb.png'
import Accountsbtn from '../../assets/NavBarAssets/accb.png'
import {widthPercentageToDP,heightPercentageToDP,} from '../../util/scaler'
import {useRoute} from '@react-navigation/native';

function NavBar({}){
    const navigation = useNavigation();

    
    return(
        <View style={{ backgroundColor:'white',  border: "black", alignItems:'center', alignContent:'center', width: widthPercentageToDP('100'), height: heightPercentageToDP('10'), paddigBottom:'10' }}>
            <View style={{flexDirection:'row', width:'90%', justifyContent: 'space-between', paddingBottom:10}}>
                <TouchableOpacity onPress={() => { 
                    navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={Homebtn} style={{bottom: heightPercentageToDP('-2.4'), left: heightPercentageToDP('-0.1') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    navigation.navigate('Events')
                }}>
                    <Image source={Eventsbtn} style={{bottom: heightPercentageToDP('-2.4'), left: heightPercentageToDP('-0.1') }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    // navigation.navigate('Invite')
                    }}>
                    <Image source={Invitebtn} style={{bottom: heightPercentageToDP('-2.4'), left: heightPercentageToDP('-0.1') }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                     navigation.navigate('Messages')
                    }}>
                    <Image source={Messagesbtn} style={{bottom: heightPercentageToDP('-2.4'), left: heightPercentageToDP('-0.1') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    navigation.navigate('Account')
                    }}>
                    <Image source={Accountsbtn} style={{bottom: heightPercentageToDP('-2.4'), left: heightPercentageToDP('-0.1') }}/>
                </TouchableOpacity>
                    
            </View>
        </View>
    )
}

export default NavBar