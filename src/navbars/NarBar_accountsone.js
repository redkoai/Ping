import {useNavigation} from "@react-navigation/native";
import {Image, View} from "react-native";
import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState}  from "react";
import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homebtn from 'ping/assets/navbar/home.png'
import Eventsbtn from 'ping/assets/navbar/events.png'
import Invitebtn from 'ping/assets/navbar/add.png'
import Messagesbtn from 'ping/assets/navbar/messages.png'
import Accountsbtn from 'ping/assets/navbar/accountg.png'
import navContainer from 'ping/assets/navbar/navCont.png'
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler'
import {useRoute} from '@react-navigation/native';

function NavBar_accountsone({}){
    const navigation = useNavigation();

    
    return(
        <View style={{ backgroundColor:'white',  border: "black", alignItems:'center', alignContent:'center', width: widthPercentageToDP('100'), height: heightPercentageToDP('10'), paddigBottom:'10' }}>
             <Image source={navContainer} style={{ position: 'absolute', width: widthPercentageToDP('100'),height:heightPercentageToDP(15)}} />
            <View style={{flexDirection:'row', width:'90%', justifyContent: 'space-between', paddingBottom:10}}>
                <TouchableOpacity onPress={() => { 
                    navigation.navigate('HomeScreenEmpty')
                }}>
                    <Image source={Homebtn} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('12'),  resizeMode:'contain', bottom: heightPercentageToDP('3') }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                    navigation.navigate('Events')
                }}>
                    <Image source={Eventsbtn} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('12'),  resizeMode:'contain', bottom: heightPercentageToDP('3') }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('createnewtemplates')
                    }}>
                    <Image source={Invitebtn} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('12'),  resizeMode:'contain', bottom: heightPercentageToDP('3')}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                     navigation.navigate('Messages')
                    }}>
                    <Image source={Messagesbtn} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('12'),  resizeMode:'contain', bottom: heightPercentageToDP('3')}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>{
                     navigation.navigate('Accountsone')
                    }}>
                    <Image source={Accountsbtn} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('12'),  resizeMode:'contain', bottom: heightPercentageToDP('3')}}/>
                </TouchableOpacity>
                    
            </View>
        </View>
    )
}

export default NavBar_accountsone