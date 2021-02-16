import React, { useContext, useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView,TouchableOpacity} from "react-native";
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {FaqpeopleparkInput,FaqsecretcodeInput,FaqguestsInput,FaqquestionInput} from 'ping/src/components/CustomTextInput';
import NavBar from "../../navbars/NarBar";
import faqprogline from "../../../assets/createnew/faq/faqprogline.png";
import message from "../../../assets/createnew/faq/message.png";
import denext from "../../../assets/createnew/details/detailsnext.png";
import NavBar_invite from "../../navbars/NarBar_invite";


function FAQ({}) {
    const navigation = useNavigation()
    const { control, handleSubmit, errors, reset, formState } = useForm({
        resolver: yupResolver(AUTH_SCHEMA),
      });
    useFocusEffect(useCallback(reset));

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
            <Image source={faqprogline} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('85'),  resizeMode:'contain',marginTop: heightPercentageToDP('14'), left:heightPercentageToDP('0')}} />
            <FaqpeopleparkInput control={control} errors={errors} />
            <FaqsecretcodeInput control={control} errors={errors} />
            <FaqguestsInput control={control} errors={errors} />
            <FaqquestionInput control={control} errors={errors} />
            <Image source={message} style={{height: heightPercentageToDP('5'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-3'),left:heightPercentageToDP('0'), resizeMode:'contain' }} /> 
            <TouchableOpacity onPress={() => { 
                    navigation.navigate('RSVP')
                }}>
            <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-12'),right:heightPercentageToDP('-20'), resizeMode:'contain' }} />  
            </TouchableOpacity>
           
            </View>
            </ImageBackground>
            <NavBar_invite/>
        </View>
    )
}
export default FAQ