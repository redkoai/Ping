import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView,Text} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useEffect, useState, useContext} from "react";
import createNewEventBtn from "ping/assets/NavBarAssets/createNewEventBtn.png"
import addFriendsBtn from "ping/assets/NavBarAssets/addFriendsBtn.png"
import emptyPic from "ping/assets/homeScreen/homeEmptyPic.png";
import homettl from "ping/assets/homeScreen/homettl.png";
import StoreData from "../../../util/SaveItemInStorage";
import RetrieveData from "../../../util/GetItemInStorage";
import LoginChecker from "../../../util/validators/LoginChecker";
import CustomText from 'ping/src/components/CustomText';
import { colors, textStyles } from 'ping/src/styles/styles';
import AuthContext from 'ping/src/contexts/AuthContext';
import { actuatedNormalize } from "../../../util/fontScaler";
import profileIm from "ping/assets/NavBarAssets/prof.png"
import CustomButton from 'ping/src/components/inputs/CustomButton';

import firebase from "firebase"


function HomeScreenEmpty({}) {
    const navigation = useNavigation()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser,setLoggedInUser]=useState([]);
    const [state,setState]=useState([]);
    const { user } = useContext(AuthContext);
    console.log("user = ", user)


    //////////////////////////
    //  Firebase query
    //////////////////////////
    const db = firebase.database().ref("users");


    const eventQuery = () => {
      db.child(`${user.uid}/Events/`).on("child_added", function (snapshot) {
        console.log("snapshot event = ", snapshot)
        console.log("snapshot event cohost", snapshot.val()["co-host-0"])
        console.log("user uid =", user.uid)
        if (snapshot.val()["co-host-0"] == user.uid) {
          console.log("user is the host of:", snapshot)
        }
      });
    }




    // useEffect(() => {
    //     const userUID=UserInfo.uid;
    //     console.log("userid: ", userUID);
    //    firebase.database().ref('/InviteForms').child("-MW_XbsJOLm2BCA6nA_K").child("formData").on('value',(snapshot)=>{
    //   //firebase.database().ref('/InviteForms').limitToLast(1).on('value',(snapshot)=>{ 
    //   let data = snapshot.val() ? snapshot.val() : {};
    //     let todoItems = {...data};
    //     setState(todoItems );
    //     //console.log("useritem: ",Object.keys(todoItems))
    //     })
    //  }, []);

    const pullProfileInfo = () => {
        try {
          db.collection("users").doc(firebase.auth().currentUser.uid).get();
        } catch (e) {
          console.log(e);
        }
      };


      // const _CheckOnboarding = async () => {
      //   await RetrieveData('Onboarding').then( async (val) => {
      //         if(val !== 'DONE') { // if Onboarding
      //           await StoreData("Onboarding", 'PENDING');
      //           //console.log(`Onboarding State 1: ${RetrieveData('Onboarding')}`);
      //           await StoreData("Onboarding", "DONE");
      //           navigation.navigate("Onboarding", { screen: "Onboarding" });
    
                
      //         }
      //         else {
      //           console.log(`Onboarding State: ${JSON.stringify(val)}`);
      //         }
      //       }
      //   )
      // }

    useEffect(() => {
      eventQuery()
        const unsubscribe = navigation.addListener("focus", () => {
          // Login Checker
          // _CheckOnboarding().then((r) => console.log("Checked on Boarding"));
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

    return (
        <View style={{flex: 1}}>    
            <ImageBackground source={emptyHome} style={styles.homeEmpty}>
                 {isLoggedIn ? (
       
<View style={{ flexDirection: 'column', marginLeft:'-10%',justifyContent: 'flex-end',marginTop:widthPercentageToDP(-43)}}>
                        
<View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:widthPercentageToDP(45),marginBottom:heightPercentageToDP('1')}}>
<Text style={[textStyles.bigBold,{left:heightPercentageToDP('0')} ]}>Home</Text>
<TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Account", { screen: "SignIn" })
                  }
                >
<Image source={profileIm} style={{height: heightPercentageToDP('4'), width :widthPercentageToDP('8'), marginBottom: heightPercentageToDP('2'), resizeMode:'contain' , left:heightPercentageToDP('2')}} />
</TouchableOpacity>
</View>




<View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:widthPercentageToDP(3)}}>
<Text style={[textStyles.bigBold,{left:heightPercentageToDP('0'),marginBottom:heightPercentageToDP('2')} ]}>My Events</Text>
<TouchableOpacity onPress={() => { 
    navigation.navigate("Events", { screen: "Events" })

}}>
<Text style={[textStyles.smallSemiBold,{color:'gray', fontSize:actuatedNormalize(12),left:heightPercentageToDP('3')} ]}>See all</Text>
</TouchableOpacity>
</View>
<ScrollView  horizontal={true} style={{ flexDirection: 'row',marginTop:widthPercentageToDP(3)}}>

<TouchableOpacity >
</TouchableOpacity>
</ScrollView>
<View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:widthPercentageToDP(3),marginBottom:heightPercentageToDP('2')}}>
<Text style={[textStyles.bigBold,{left:heightPercentageToDP('0')} ]}>My Invites</Text>
<TouchableOpacity onPress={() => { 
   navigation.navigate("Events", { screen: "Events" })

}}>
<Text style={[textStyles.smallSemiBold,{color:'gray', fontSize:actuatedNormalize(12),left:heightPercentageToDP('3')} ]}>See all</Text>
</TouchableOpacity>
</View>
<ScrollView  horizontal={true} style={{ flexDirection: 'row',marginTop:widthPercentageToDP(3)}}>

<TouchableOpacity >
</TouchableOpacity>
</ScrollView>
        <TouchableOpacity  style={{left: heightPercentageToDP('2.5'), marginBottom:widthPercentageToDP(5)}}  onPress={() => { 
    navigation.navigate('NewInvite')

}}>     
        <CustomButton
          text="Create a new event"
          primary
          shadow
        />
        </TouchableOpacity> 
        
        {/* <TouchableOpacity  style={{left: heightPercentageToDP('2.5')}} onPress={() => { 
    navigation.navigate('Account', {screen: " Accountsone"})

}}>      
        <CustomButton
          text="Add friends"
          shadow
        />
        </TouchableOpacity> */}
</View>
                ) : (
                    <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:widthPercentageToDP(-10),marginBottom:heightPercentageToDP('3')}}>
<Text style={[textStyles.bigBold,{left:heightPercentageToDP('0')} ]}>Home</Text>
<TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Account", { screen: "SignUp" })
                  }
                >
<Image source={profileIm} style={{height: heightPercentageToDP('4'), width :widthPercentageToDP('8'), marginBottom: heightPercentageToDP('2'), resizeMode:'contain' , left:heightPercentageToDP('0')}} />
</TouchableOpacity>
</View>
                    <Image source={emptyPic} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('85'), marginTop: heightPercentageToDP('0'), resizeMode:'contain' }} />

                    <TouchableOpacity  style={{left: heightPercentageToDP('1'), marginBottom:widthPercentageToDP(5), marginTop:widthPercentageToDP(30)}}  onPress={() => { 
    navigation.navigate('NewInvite')

}}>     
        <CustomButton
          text="Create a new event"
          primary
          shadow
        />
        </TouchableOpacity> 
                        {/* <TouchableOpacity onPress={() => { 
                            navigation.navigate('NewInvite')
        
                        }}>
                            <Image source={createNewEventBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('5'),marginBottom:heightPercentageToDP('20') }} />
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={() => { 
                           navigation.navigate('SignUp')
                          //navigation.navigate('SecretCode')
                        }}>
                            <Image source={addFriendsBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginBottom: heightPercentageToDP('15'), resizeMode:'contain' , left:heightPercentageToDP('5')}} />
                        </TouchableOpacity> */}
                        </View>
                )}
            </ImageBackground>
        </View>
    )
}

export default HomeScreenEmpty