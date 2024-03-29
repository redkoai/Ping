
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
import { colors, textStyles } from 'ping/src/styles/styles';
import { actuatedNormalize } from "../../../util/fontScaler";
import giffy from '../../../assets/homeScreen/giffy.gif'


function Settings({}) {
  const [loggedInUser,setLoggedInUser]=useState([]);
  const [state,setState]=useState([]);
  const { user } = useContext(AuthContext);
  const UserInfo = { "uid": user.uid, "email": user.email }
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

    /////////////////////////////////
    // Firebase Query to get username
    //////////////////////////////////
    const db = firebase.database().ref("users");

    const [username, setUsername] = useState()

    const getUsername = () => {
      db.child(`${user.uid}`).on('child_added', function(snapshot) {
        if (snapshot.key == "username"){
          console.log(snapshot.val())
          setUsername(snapshot.val())
        }
    })
    }

    useEffect(() => {
      getUsername()
      console.log(username)
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

      /////////////////////////////////////////
      // Old render
      /////////////////////////////////////////

        <View style={{ flex: 1 }}>
          {/* <ImageBackground source={emptyHome} style={styles.homeEmpty}> */}
          <View style={{ backgroundColor: 'white', flex: 1 }}>
          <TouchableOpacity onPress={() => navigation.navigate('settings')}>
            <Image 
            source={settings} 
            style={{
            height: heightPercentageToDP('3'),
            width :widthPercentageToDP('30'), 
            resizeMode:'contain',
            marginTop: heightPercentageToDP('2'), 
            left: widthPercentageToDP('75'),
            
            }} />
            </TouchableOpacity>
          {isLoggedIn ? (
             <View>

               <View>
               <View style={{flexDirection:'row'}} >
               {/* <Image source={{uri: user.avatar}} style={{marginTop:'0%', height: heightPercentageToDP('10'), width: widthPercentageToDP('30')}} /> */}
                  <Text style={[textStyles.smallSemiBold,{ fontSize:actuatedNormalize(18), marginLeft:widthPercentageToDP('5'), marginTop:widthPercentageToDP('5')}]}>Hello</Text>
                  <Text style={[textStyles.smallSemiBold,{ fontSize:actuatedNormalize(18), marginLeft:widthPercentageToDP('0'), marginTop:widthPercentageToDP('5')}]}> {username},</Text>
                  </View>
                  <View style={{flexDirection:'row'}} >
                  <Text style={[textStyles.smallSemiBold,{ fontSize:actuatedNormalize(13), marginLeft:widthPercentageToDP('5'), marginTop:widthPercentageToDP('5')}]}>Your email is</Text>

                  <Text style={[textStyles.smallSemiBold,{ fontSize:actuatedNormalize(13), marginLeft:widthPercentageToDP('0'), marginTop:widthPercentageToDP('5')}]}> {user.email}</Text>
               </View>
               </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: widthPercentageToDP(3),
              }}
            >
            {/* <Image source={Accname} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('10'), }} /> */}

            
            {/* <Image 
            source={Accfriends} 
            style={{
            height: heightPercentageToDP('4'),
            width :widthPercentageToDP('30'), 
            resizeMode:'contain',
            marginTop: heightPercentageToDP('1'), 
            left: heightPercentageToDP('1'),
            
            }} />  */}
            {/* <Image source={Accevents} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-7'), resizeMode:'contain' }} /> */}
            {/* <Image 
            source={Acccenter} 
            style={{height: heightPercentageToDP('32'),
            width :widthPercentageToDP('95'), 
            marginTop: heightPercentageToDP('4'), 
            left: heightPercentageToDP('1'),
            resizeMode:'contain' 
            }} /> */}
        </View>
        <Image 
            source={giffy} 
            style={{
            height: heightPercentageToDP('30'),
            width :widthPercentageToDP('100'), 
            resizeMode:'contain',
            marginTop: heightPercentageToDP('2'), 
            // left: heightPercentageToDP('35'),
            
            }} />
        <Spacer height={2}  />

         <View style={{left: heightPercentageToDP('4.5')}}>    
        <CustomButton 
          text="Create a new event"
          primary
          shadow
          onPress={() => { 
            navigation.navigate('NewInvite')}}
        />
        
        </View> 
        
        {/* <TouchableOpacity  style={{left: heightPercentageToDP('3.5')}}>     
        <CustomButton
          text="Add friends"
          shadow
        />
        </TouchableOpacity> */}



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
          <TouchableOpacity onPress={() => navigation.navigate('settings')}>
          <Image 
          source={settings} 
          style={{
          height: heightPercentageToDP('3'),
          width :widthPercentageToDP('30'), 
          resizeMode:'contain',
          marginTop: heightPercentageToDP('-15'), 
          left: heightPercentageToDP('32'),
          
          }} />
          </TouchableOpacity>
          
        
          {/* <Image source={Accevents} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-7'), resizeMode:'contain' }} /> */}
          {/* <Image 
          source={Acccenter} 
          style={{height: heightPercentageToDP('32'),
          width :widthPercentageToDP('95'), 
          marginTop: heightPercentageToDP('4'), 
          left: heightPercentageToDP('1'),
          resizeMode:'contain' 
          }} /> */}
      </View>


      </View>

          )

}
<View style={{left: heightPercentageToDP('4.5')}}>
            {!skipped &&
              <CustomButton 
                  text="Sign Out"
                  onPress={async () => await singOutAsync(onSuccess, onFailure)}
                  shadow
                  primary
              />
            
            }
            </View>
      {/* </ImageBackground> */}
    </View>
    </View>

  

)}

export default Settings;

const stylesone = StyleSheet.create({
    scene: {
      flex: 1,
    },
  });