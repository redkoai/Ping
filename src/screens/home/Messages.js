

import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView, Text, ul, option, Button} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState, useContext} from "react";
import CustomButton from 'ping/src/components/inputs/CustomButton';
import Spacer from 'ping/src/components/Spacer';
import emptyPic from "ping/assets/messages/img.png";
import homettl from "ping/assets/messages/messagettl.png";
import AuthContext from 'ping/src/contexts/AuthContext';
import firebase from 'firebase';
import newMessageBtn from "ping/assets/newMessage.png"


function Messages({}) {
    const navigation = useNavigation()

    const [userHistory, setUserHistory] = useState({

    })

    const { user } = useContext(AuthContext);

    const db = firebase.database().ref("messages")


    const queryUserHistory = () => {
      let userHistory = {}
      db.ref.orderByKey().on("child_added", function(snapshot) {
          if (snapshot.val().user._id == user.uid) {
              console.log("found user", snapshot.val())
              userHistory[snapshot.val().userTo.email] = {
                text: snapshot.val().text, 
                timestamp: snapshot.val().timestamp,
                _id: snapshot.val().userTo._id
              }
          } 
          if (snapshot.val().userTo._id == user.uid) {
            console.log("found user", snapshot.val())
            userHistory[snapshot.val().user.email] = {
              text: snapshot.val().text, 
              timestamp: snapshot.val().timestamp,
              _id: snapshot.val().user._id
            }
        } 
      })
      return userHistory
  }

  useEffect(() => {
      setUserHistory(queryUserHistory())
    }, []);

  console.log("user history =", userHistory)
  const userHistoryLoop = Object.keys(userHistory).map((key) => {
    return (
      <Button title={key} onPress={() => { 
        navigation.navigate('Chat', { OtherUserInfo: {
            _id: userHistory[key]._id,
            email: key
        }})
    }}>
      {key}
      </Button>
    )
  })


    return (
      <View>
        {
          userHistory == {}
          ? (
            <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View 
            style={{ 
                flexDirection: 'column', 
                justifyContent: 'center',
                marginTop:widthPercentageToDP(3)
                }}>

            <Image 
            source={emptyPic}
            style={{height: heightPercentageToDP('40'), 
              width :widthPercentageToDP('85'),
              marginTop: heightPercentageToDP('0'),
              resizeMode:'contain'
              }} />
            
            </View>
            <Spacer height={2} />
            <TouchableOpacity onPress={() => { 
                navigation.navigate('CreateNewMessage')
            }}>
                <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), left:heightPercentageToDP('7'),resizeMode:'contain', }} />
            </TouchableOpacity>
            
            
            <TouchableOpacity>
            <CustomButton
              text="Add friends"
              shadow
            />
            </TouchableOpacity>
                
            
            </ImageBackground>
            </View>
          )
          : (
            <View>
              {userHistoryLoop}
              <View 
            style={{ 
                flexDirection: 'column', 
                justifyContent: 'center',
                marginTop:widthPercentageToDP(3)
                }}>

            <Image 
            source={emptyPic}
            style={{height: heightPercentageToDP('40'), 
              width :widthPercentageToDP('85'),
              marginTop: heightPercentageToDP('10'),
              resizeMode:'contain', 
              left:heightPercentageToDP('5') 
              
              }} />
            
            </View>



              <TouchableOpacity onPress={() => { 
                navigation.navigate('CreateNewMessage')
              }}>
                  <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('7') }} />
              </TouchableOpacity>
            </View>
            )
        }
      </View>
    )
}
export default Messages



{/* <TouchableOpacity
        onPress={() => {
          console.log("button pressed")
          navigation.navigate('NewChat');
        }}>     
          <CustomButton
            text="Create new message"
            primary
            shadow
          />
        </TouchableOpacity>  */}

        {/* <TouchableOpacity onPress={() => { 
            navigation.navigate('Chat')
        }}>
            <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('0') }} />
        </TouchableOpacity> */}