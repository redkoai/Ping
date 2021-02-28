import {useNavigation} from "@react-navigation/native";
// import {Image, ImageBackground, View, ScrollView, Text} from "react-native";
import {TouchableOpacity} from 'react-native';

import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState} from "react";
import createNewEventBtn from "ping/assets/NavBarAssets/createNewEventBtn.png"
import addFriendsBtn from "ping/assets/NavBarAssets/addFriendsBtn.png"
import emptyPic from "ping/assets/events/calendar.png";
import homettl from "ping/assets/events/eventsttl.png";

import {Alert, StyleSheet, Text, View} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper'



const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }



function Events({}) {
    const navigation = useNavigation()

    const [items, setItems] = useState({})

    const loadItems = (day) => {
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            if (!items[strTime]) {
              items[strTime] = [];
              const numItems = Math.floor(Math.random() * 3 + 1);
              for (let j = 0; j < numItems; j++) {
                items[strTime].push({
                  name: 'Item for ' + strTime + ' #' + j,
                  height: Math.max(50, Math.floor(Math.random() * 150))
                });
              }
            }
          }
          const newItems = {};
          Object.keys(items).forEach((key) => {
            newItems[key] = items[key];
          });
          setItems(newItems)
        }, 1000);
      }

      renderItem = (item) => {
          return(
          <TouchableOpacity style={{
              marginRight: 10,
              marginTop: 30,
              padding: 10
            }}>
              <Card >
                  <Card.Content >
                      <View style={{flexDirection:"row", justifyContent:"center"}}>
                        <Text>{item.name}</Text>
                      </View>
                  </Card.Content>
              </Card>
          </TouchableOpacity>)

      }

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
        <View style={{flex: 1}}>
            {/* <Calendar
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
                markedDates={{
                    // '2021-02-16': {selected: true, marked: true, selectedColor: 'blue'},
                    '2021-02-17': {marked: true},
                    '2021-02-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                    '2021-02-19': {marked: true, dotColor: 'orange', activeOpacity: 0}
                  }}
            /> */}
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                // selected={'2021-02-18'}
                renderItem={renderItem}

            />
        </View>
    )
}

export default Events


