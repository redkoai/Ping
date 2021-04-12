import {useNavigation} from "@react-navigation/native";
// import {Image, ImageBackground, View, ScrollView, Text} from "react-native";
import {TouchableOpacity} from 'react-native';

import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState, useContext} from "react";
import createNewEventBtn from "ping/assets/NavBarAssets/createNewEventBtn.png"
import addFriendsBtn from "ping/assets/NavBarAssets/addFriendsBtn.png"
import emptyPic from "ping/assets/events/calendar.png";
import homettl from "ping/assets/events/eventsttl.png";

import {Alert, StyleSheet, Text, View} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Card} from 'react-native-paper'
import AuthContext from 'ping/src/contexts/AuthContext';
import firebase from 'firebase'



const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }



function Events({}) {

  const navigation = useNavigation()

  const [items, setItems] = useState({})


  ///////////////////////////////////////
  // firebase query
  ///////////////////////////////////////
  const db = firebase.database().ref("users")
  const {user} = useContext(AuthContext)
  // console.log(user)

  const newItems = {}

  // const getData = () => {
  //   console.log("get Data is running")
  //   db.child(`${user.uid}/Events`).on("child_added", function(snapshot) {
  //     console.log("snapshot = ", snapshot)
  //     console.log("enddate = ", snapshot.val().enddate)
  //     let date = new Date(snapshot.val().enddate.replace('th', ''))
  //     console.log("date =", date.toDateString())
  //     newItems[date.toISOString().split('T')[0]] = {
  //       name: snapshot.val().event,
  //       height: Math.max(50, Math.floor(Math.random() * 150))
  //     }
      
  //     console.log("newItems = ", newItems)
  // })
  // setItems(newItems)
  // }

  const loadItems = () => {
      setTimeout(() => {
        db.child(`${user.uid}/Events`).on("child_added", function(snapshot) {
          console.log("snapshot = ", snapshot)
          console.log("enddate = ", snapshot.val().enddate)
          let date = new Date(snapshot.val().enddate.replace('th', ''))
          console.log("date =", date.toDateString())
          newItems[date.toISOString().split('T')[0]] = []
          
          newItems[date.toISOString().split('T')[0]].push( {
            name: snapshot.val().event,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            info: snapshot
          })
          
          console.log("newItems = ", newItems)
      });
        setItems(newItems)
      }, 1000);
    }
  

  






    // const loadItems = (day) => {
    //     setTimeout(() => {
    //       console.log("poop3")
    //       for (let i = -15; i < 85; i++) {
    //         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //         const strTime = timeToString(time);
    //         if (!items[strTime]) {
    //           items[strTime] = [];
    //           const numItems = Math.floor(Math.random() * 3 + 1);
    //           for (let j = 0; j < numItems; j++) {
    //             // console.log("String time = ", strTime)
    //             items[strTime].push({
    //               name: 'Item for ' + strTime + ' #' + j,
    //               height: Math.max(50, Math.floor(Math.random() * 150))
    //             });
    //           }
    //         }
    //       }
    //       const newItems = {};
    //       Object.keys(items).forEach((key) => {
    //         newItems[key] = items[key];
    //       });
    //       setItems(newItems)
    //     }, 1000);
    //   }

      renderItem = (item) => {
          return(
          <TouchableOpacity onPress={() => { 
            console.log("button pressed and item info =", item.info)
          }}
          style={{
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

      // const styles = StyleSheet.create({
      //   item: {
      //     backgroundColor: 'red',
      //     flex: 1,
      //     borderRadius: 5,
      //     padding: 10,
      //     marginRight: 10,
      //     marginTop: 17
      //   },
      //   emptyDate: {
      //     height: 15,
      //     flex: 1,
      //     paddingTop: 30
      //   }
      // });

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
                theme={{
                  monthTextColor: "#3D8976",
                  selectedDayBackgroundColor: "#3D8976",
                  agendaDayTextColor: '#3D8976',
                  agendaDayNumColor: '#3D8976',
                  agendaTodayColor: '#3D8976',
                  agendaKnobColor: '#3D8976',
                  dotColor: "#3D8976",
                  todayTextColor: "#3D8976"
                }}
                // style={{}}
            />
        </View>
    )
}

export default Events


