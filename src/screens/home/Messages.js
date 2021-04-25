

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
import StoreData from "../../../util/SaveItemInStorage";
import RetrieveData from "../../../util/GetItemInStorage";
import LoginChecker from "../../../util/validators/LoginChecker";



function Messages({}) {
    const navigation = useNavigation()
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [userHistory, setUserHistory] = useState({

    })

    const { user } = useContext(AuthContext);

    const db = firebase.database().ref("users")

    const pullProfileInfo = () => {
      try {
        db.collection("users").doc(firebase.auth().currentUser.uid).get();
      } catch (e) {
        console.log(e);
      }
    };


  useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        // Login Checker
    
        LoginChecker().then((results) => {
          console.log("USER IS LOGGED IN : ", results);
          setIsLoggedIn(results);
  
          if (results) {
            pullProfileInfo();
          } else {
            console.log("User isn't logged in");
          }
        });
      });
  
      return unsubscribe;
    }, [navigation]);


    const queryUserHistory = () => {
      console.log("queryUserHistory")
      let userHistory = {}
      db.child(`${user.uid}/messages/`).on("child_added", function(snapshot) {
        // console.log("snapshot = ", snapshot)
        // console.log("snapshot key = ", snapshot.key)
        // console.log("snapshot val = ", Object.keys(snapshot.val())[0])
        // console.log("snapshot user id =", snapshot.val()["-MZ9UNyCVaJAZkhAlxo-"].user._id)
        console.log("snapshot val user._id", snapshot.val()[`${Object.keys(snapshot.val())[0]}`].user._id)
          if (snapshot.val()[`${Object.keys(snapshot.val())[0]}`].user._id == user.uid) {
              console.log("found user", snapshot.val())
              userHistory[snapshot.val()[`${Object.keys(snapshot.val())[0]}`].userTo.email] = {
                text: snapshot.val()[`${Object.keys(snapshot.val())[0]}`].text, 
                timestamp: snapshot.val()[`${Object.keys(snapshot.val())[0]}`].timestamp,
                _id: snapshot.val()[`${Object.keys(snapshot.val())[0]}`].userTo._id
              }
          } 
          if (snapshot.val()[`${Object.keys(snapshot.val())[0]}`].userTo._id == user.uid) {
            console.log("found user", snapshot.val())
            userHistory[snapshot.val()[`${Object.keys(snapshot.val())[0]}`].user.email] = {
              text: snapshot.val()[`${Object.keys(snapshot.val())[0]}`].text, 
              timestamp: snapshot.val()[`${Object.keys(snapshot.val())[0]}`].timestamp,
              _id: snapshot.val()[`${Object.keys(snapshot.val())[0]}`].user._id
            }
        } 
      })
      return userHistory
  }

  useEffect(() => {
      setUserHistory(queryUserHistory())
    }, []);

  console.log("user history = ", userHistory)
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
                 <Image source={newMessageBtn} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('80'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:widthPercentageToDP('9') }} />
            </TouchableOpacity>

            {/* <TouchableOpacity style={{alignContent:'center',marginLeft:widthPercentageToDP(10)}} onPress={() => { 
                navigation.navigate('CreateNewMessage') }}>
                    <CustomButton
                        text="Create a new message"
                        primary
                        shadow
                      />
            </TouchableOpacity>  */}
            
            
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
              <Text>Current Chats:</Text>
              {userHistoryLoop}
              <View 
            style={{ 
                flexDirection: 'column', 
                justifyContent: 'center',
                marginTop:widthPercentageToDP(3)
                }}>

            {/* <Image 
            source={emptyPic}
            style={{height: heightPercentageToDP('40'), 
              width :widthPercentageToDP('85'),
              marginTop: heightPercentageToDP('10'),
              resizeMode:'contain', 
              left:heightPercentageToDP('5') 
              
              }} /> */}
            
            </View>

              
            <TouchableOpacity onPress={() => { 
                navigation.navigate('CreateNewMessage')
            }}>
                <Image source={newMessageBtn} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('80'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:widthPercentageToDP('9') }} />
            </TouchableOpacity>

              {/* <TouchableOpacity style={{alignContent:'center',marginLeft:widthPercentageToDP(10)}} onPress={() => { 
                navigation.navigate('CreateNewMessage') }}>
                    <CustomButton
                      text="Create a new message"
                      primary
                      shadow
                    />
              </TouchableOpacity>  */}
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