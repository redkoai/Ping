import {useNavigation} from "@react-navigation/native";
import {Image, View} from "react-native";
import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState}  from "react";
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homebtn from '../../assets/NavBarAssets/home.png'
import Eventsbtn from '../../assets/NavBarAssets/Calendar.png'
import Invitebtn from '../../assets/NavBarAssets/add.png'
import Messagesbtn from '../../assets/NavBarAssets/message-circle.png'
import Accountsbtn from '../../assets/NavBarAssets/user.png'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


function NavBar({}){
    // const navigation = useNavigation();

    
    return(
        <View style={{ backgroundColor:'white',  alignItems:'center', alignContent:'center', height: '10%' }}>
            <View style={{flexDirection:'row', width:'90%', justifyContent: 'space-between', alignItems:"center"}}>
                <TouchableOpacity onPress={() => { 
                    // navigation.navigate('Home')
                }}>
                    <Image source={Homebtn} style={{bottom: hp('-3'), left: wp('-0.5') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    // navigation.navigate('Events')
                }}>
                    <Image source={Eventsbtn} style={{bottom: hp('-3'), left: wp('-0.5') }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    // navigation.navigate('Invite')
                    }}>
                    <Image source={Invitebtn} style={{bottom: hp('-3'), left: wp('-0.5') }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    // navigation.navigate('Messages')
                    }}>
                    <Image source={Messagesbtn} style={{bottom: hp('-3'), left: wp('-0.5') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    // navigation.navigate('Account')
                    }}>
                    <Image source={Accountsbtn} style={{bottom: hp('-3'), left: wp('-0.5') }}/>
                </TouchableOpacity>
                    
            </View>
        </View>
    )
}

export default NavBar