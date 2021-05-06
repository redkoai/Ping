
import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView, SafeAreaView,StyleSheet,Text} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useContext, useEffect, useState} from "react";
import AuthContext from 'ping/src/contexts/AuthContext';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import Spacer from 'ping/src/components/Spacer';
import settings from "ping/assets/Accounts/settings.png";
import Accfriends from "ping/assets/Accounts/friends.png";
import Acccenter from "ping/assets/Accounts/Accountscenter.png";
import * as firebase from 'firebase';
import StoreData from "../../../util/SaveItemInStorage";
import RetrieveData from "../../../util/GetItemInStorage";
import LoginChecker from "../../../util/validators/LoginChecker";
import { InAppBrowser } from "@matt-block/react-native-in-app-browser";


function Accounts({}) {
  const [loggedInUser,setLoggedInUser]=useState([]);
  const [state,setState]=useState([]);
  const { user } = useContext(AuthContext);
  // const UserInfo = { "uid": user.uid, "email": user.email }
    const navigation = useNavigation();
    const { singOutAsync, skipped } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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
      //  _CheckOnboarding().then((r) => console.log("Checked on Boarding"));
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

 
    const onSuccess = () => {
        // navigation.navigate('SignIn');
    }
    const onFailure = (errorMessage) => {
        alert(errorMessage)
    };

  //   useEffect(() => {
  //     const userUID=UserInfo.uid;
  //     console.log("userid: ", userUID);
  //     firebase.database().ref('/InviteForms').limitToLast(1).on('value',(snapshot)=>{
  //    let data = snapshot.val() ? snapshot.val() : {};
  //    console.log("snapshot value",data);
  //     let todoItems = {...data};
  //     setState(todoItems );
  //     console.log("useritem: ",todoItems)
  //     })
  //  }, []);

    return (

        <View style={{ flex: 1 }}>
          <ImageBackground source={emptyHome} style={styles.homeEmpty}>
       
          {isLoggedIn ? (
             <View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: widthPercentageToDP(3),
              }}
            >
            {/* <Image source={Accname} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('10'), }} /> */}
             <TouchableOpacity onPress={() => InAppBrowser.open("https://www.theredko.com/tango-privacy-policy")}>
            <Image 
            source={settings} 
            style={{
            height: heightPercentageToDP('3'),
            width :widthPercentageToDP('30'), 
            resizeMode:'contain',
            marginTop: heightPercentageToDP('1'), 
            left: heightPercentageToDP('32'),
            
            }} />
            </TouchableOpacity>
            
            <Image 
            source={Accfriends} 
            style={{
            height: heightPercentageToDP('4'),
            width :widthPercentageToDP('30'), 
            resizeMode:'contain',
            marginTop: heightPercentageToDP('1'), 
            left: heightPercentageToDP('1'),
            
            }} /> 
            {/* <Image source={Accevents} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-7'), resizeMode:'contain' }} /> */}
            <Image 
            source={Acccenter} 
            style={{height: heightPercentageToDP('32'),
            width :widthPercentageToDP('95'), 
            marginTop: heightPercentageToDP('4'), 
            left: heightPercentageToDP('1'),
            resizeMode:'contain' 
            }} />
        </View>
        <Spacer height={2} />
         <TouchableOpacity>     
        <CustomButton
          text="Create a new event"
          primary
          shadow
        />
        </TouchableOpacity> 
        
        <TouchableOpacity>
        <CustomButton
          text="Add friends"
          shadow
        />
        </TouchableOpacity>


</View>
          ):( 
            <View>
            <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: widthPercentageToDP(3),
            }}
          >
          {/* <Image source={Accname} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('10'), }} /> */}
          <TouchableOpacity onPress={() => InAppBrowser.open("https://www.theredko.com/tango-privacy-policy")}>
          <Image 
          source={settings} 
          style={{
          height: heightPercentageToDP('3'),
          width :widthPercentageToDP('30'), 
          resizeMode:'contain',
          marginTop: heightPercentageToDP('1'), 
          left: heightPercentageToDP('32'),
          
          }} />
          </TouchableOpacity>
          
        
          {/* <Image source={Accevents} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-7'), resizeMode:'contain' }} /> */}
          <Image 
          source={Acccenter} 
          style={{height: heightPercentageToDP('32'),
          width :widthPercentageToDP('95'), 
          marginTop: heightPercentageToDP('4'), 
          left: heightPercentageToDP('1'),
          resizeMode:'contain' 
          }} />
      </View>


      </View>

          )

}
            {/* {!skipped &&
              <CustomButton
                  text="Sign Out"
                  onPress={async () => await singOutAsync(onSuccess, onFailure)}
                  shadow
                  primary
              />
            } */}
      </ImageBackground>
    </View>

  

)}

export default Accounts;

const stylesone = StyleSheet.create({
    scene: {
      flex: 1,
    },
  });