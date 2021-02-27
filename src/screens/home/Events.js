import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView, Text} from "react-native";
import {TouchableOpacity} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState} from "react";
import createNewEventBtn from "ping/assets/NavBarAssets/createNewEventBtn.png"
import addFriendsBtn from "ping/assets/NavBarAssets/addFriendsBtn.png"
import emptyPic from "ping/assets/events/calendar.png";
import homettl from "ping/assets/events/eventsttl.png";


function Events({}) {
    const navigation = useNavigation()

    return (
        // <View style={{flex: 1}}>    
        //     <ImageBackground source={emptyHome} style={styles.homeEmpty}>
        //     <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
        //     <Image source={homettl} style={{height: heightPercentageToDP('15'), width :widthPercentageToDP('90'),  resizeMode:'contain',marginTop: heightPercentageToDP('10'), }} />
        //     <Image source={emptyPic} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('0'), resizeMode:'contain' }} />
        //         <TouchableOpacity onPress={() => { 
        //             // navigation.navigate('HomeScreenEmpty')
        //         }}>
        //             <Image source={createNewEventBtn} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('5') }} />
        //         </TouchableOpacity>
        //         <TouchableOpacity onPress={() => { 
        //             // navigation.navigate('HomeScreenEmpty')
        //         }}>
        //             <Image source={addFriendsBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginBottom: heightPercentageToDP('15'), resizeMode:'contain' , left:heightPercentageToDP('5')}} />
        //         </TouchableOpacity>
        //     </View>
        //     </ImageBackground>
        // </View>
        <View>
            <Calendar
                // Specify style for calendar container element. Default = {}
                style={{
                    height: 350
                }}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    selectedDayBackgroundColor: 'green',
                    todayTextColor: 'green',
                    arrowColor: 'green'
                }}
            />

        </View>
    )
}

export default Events