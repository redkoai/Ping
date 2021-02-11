import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView,TextInput} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";
import NavBar_invite from "../../navbars/NarBar_invite";


function Form({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
        <View>
            <TextInput 
          placeholder="Email" />
            <TextInput
          secureTextEntry={true}
          placeholder="Password"
            />
        </View>
            <TouchableOpacity onPress={() => { 
                    navigation.navigate('DressCode')
                }}>
            <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-32'),right:heightPercentageToDP('-21'), resizeMode:'contain' }} /> 
            </TouchableOpacity>
            </View>
            </ImageBackground>
            <NavBar_invite/>
        </View>
    )
}
export default Form