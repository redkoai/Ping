import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground,TouchableOpacity, View, ScrollView,StyleSheet,Text} from "react-native";
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState} from "react";
import createNewEventBtn from "ping/assets/NavBarAssets/createNewEventBtn.png"
import addFriendsBtn from "ping/assets/NavBarAssets/addFriendsBtn.png"
import CustomButton from 'ping/src/components/inputs/CustomButton';
import Spacer from 'ping/src/components/Spacer';
import settings from "ping/assets/Accounts/settings.png";
import Accname from "ping/assets/Accounts/AccountName.png";
import Accfriends from "ping/assets/Accounts/friends.png";
import Accactivity from "ping/assets/Accounts/Accountactivity.png";
import Acccenterone from "ping/assets/Accounts/Accountscenterone.png";
import newMessageBtn from "ping/assets/newMessage.png"
import {SearchBar} from "react-native-elements"
import AuthContext from 'ping/src/contexts/AuthContext';
import firebase from 'firebase';
import RetrieveData from "../../../util/GetItemInStorage";
import LoginChecker from "../../../util/validators/LoginChecker";
import 'firebase/firestore'


function Accountsone({}) {
    // const navigation = useNavigation()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser,setLoggedInUser]=useState([]);


    const pullProfileInfo = () => {
      try {
        db.collection("users").doc(firebase.auth().currentUser.uid).get();
      } catch (e) {
        console.log(e);
      }
    };


    const _CheckOnboarding = async () => {
      await RetrieveData('Onboarding').then( async (val) => {
            if(val !== 'DONE') { // if Onboarding
              await StoreData("Onboarding", 'PENDING');
              //console.log(`Onboarding State 1: ${RetrieveData('Onboarding')}`);
              await StoreData("Onboarding", "DONE");
              navigation.navigate("Onboarding", { screen: "Onboarding" });
  
              
            }
            else {
              console.log(`Onboarding State: ${JSON.stringify(val)}`);
            }
          }
      )
    }

  useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        // Login Checker
        _CheckOnboarding().then((r) => console.log("Checked on Boarding"));
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

    const navigation = useNavigation()

    const db = firebase.database().ref("users")
    const [search, setSearch] = useState([])

    const [foundUser, setFoundUser] = useState({
        email:null,
        uid:null
    })

    const updateSearch = (search) => {
        setSearch(search)
    }

    const searchUser = (email) => {
        let foundUser = {email:null, uid:null, found:false}
        db.ref.orderByKey().on("child_added", function(snapshot) {
            if (snapshot.val().email == email) {
                console.log("found user", snapshot.val())
                foundUser = {email:snapshot.val().email, uid: snapshot.key, found:true}
                return 
            } 
        })
        return foundUser
    }
    // console.log(searchUser(search))

    useEffect(() => {
        let foundUser = searchUser(search)
        console.log("foundUser (use effect) = ", foundUser)
        if (foundUser.found) {
            console.log("poop")
            setFoundUser({email:foundUser.email,uid:foundUser.uid})
            console.log("setting found user state")
        }
        
      }, [search]);
    // if (searchUser(search)) {
    //     console.log("poop")
    //     setFoundUser(search)
    //     console.log("setting found user state")
    // }
    console.log("found user = ", foundUser)


    // const searchUser = (email) => {
    //     db.ref.orderByKey().on("child_added", function(snapshot) {
    //         if (snapshot.val().email == "jbodoia@gmail.com") {
    //             console.log("found user")
    //         }
    // }}

    console.log(search)

    return (
        <View style={{ flex: 1 }}>

          <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            
  {isLoggedIn ? (
          <View>
            
            <SearchBar
                placeholder="Search for users..."
                autoCapitalize = "none"
                containerStyle = {{backgroundColor: "white"}}
                inputStyle = {{color: "black"}}
                inputContainerStyle = {{backgroundColor: "white"}}
                searchIcon = {{color: "black"}}
                clearIcon = {{color: "black"}}
                placeholderTextColor = {"black"}
                onChangeText={updateSearch}
                value={search}
            />
            <View style={styles.container}>
                <Text>{foundUser.email}</Text>
            </View>
            <TouchableOpacity onPress={() => { 
                navigation.navigate('Chat', { OtherUserInfo: {
                    _id: foundUser.uid,
                    email: foundUser.email
                }})
            }}>
                <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'),  marginLeft: widthPercentageToDP('15'), resizeMode:'contain'}} />
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

<TouchableOpacity onPress={() => navigation.navigate('settings')}>
            <Image 
            source={settings} 
            style={{
            height: heightPercentageToDP('3'),
            width :widthPercentageToDP('30'), 
            resizeMode:'contain',
            marginTop: heightPercentageToDP('0'), 
            left: heightPercentageToDP('32'),
            
            }} />
            </TouchableOpacity>

            {/* <Image source={Accname} style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('10'), }} /> */}
            
            {/* <Image 
            source={Accfriends} 
            style={{height: heightPercentageToDP('4'),
             width :widthPercentageToDP('30'), 
             resizeMode:'contain',
             marginTop: heightPercentageToDP('1'),
              }} /> */}

            {/* <Image source={Accactivity} style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('-7'), resizeMode:'contain' }} /> */}
            
            <Image 
            source={Acccenterone} 
            style={{height: heightPercentageToDP('40'),
            width :widthPercentageToDP('95'),
            marginTop: heightPercentageToDP('3'),
            left: heightPercentageToDP('1.5'),
            resizeMode:'contain'
             }} />
            </View>

        <Spacer height={2} />
        {/* <TouchableOpacity  style={{left: heightPercentageToDP('3.5')}}>       
        <CustomButton
          text="Create a new event"
          primary
          shadow
        />
        </TouchableOpacity>  */}
        
        <TouchableOpacity  style={{left: heightPercentageToDP('3.5')}}>     
        <CustomButton
          text="Add friends"
          shadow
        />
        </TouchableOpacity>
 </View>
          )}
            
        </ImageBackground>
        </View>

    )
}
export default Accountsone