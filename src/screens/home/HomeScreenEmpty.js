import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "../../../assets/NavBarAssets/emptyHome.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
// import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import React, {useEffect, useState} from "react";
import NavBar from "../../navbars/NarBar";


function HomeScreenEmpty({}) {
    const navigation = useNavigation()

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homefull}>
            </ImageBackground>
            <NavBar/>
        </View>
    )
}

export default HomeScreenEmpty