import React, { useState, useEffect} from "react"
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, Image, StyleSheet} from "react-native"
import newMessageBtn from "ping/assets/newMessage.png"
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import {SearchBar} from "react-native-elements"
import AuthContext from 'ping/src/contexts/AuthContext';
import firebase from 'firebase';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import { colors, textStyles } from 'ping/src/styles/styles';
import { actuatedNormalize } from "ping/util/fontScaler";
import 'firebase/firestore'


const styles= StyleSheet.create({
    container: {
        textAlign:"center"
    }
})


function CreateNewMessage({ }) {
    const navigation = useNavigation()

    const db = firebase.database().ref("users")
    const [search, setSearch] = useState([])

    const [foundUser, setFoundUser] = useState({
        username: null,
        email:null,
        uid:null
    })

    const updateSearch = (search) => {
        setSearch(search)
    }

    const searchUser = (username) => {
        let foundUser = { username: null, email: null, uid: null, found: false };
        db.ref.orderByKey().on("child_added", function (snapshot) {
          if (snapshot.val().username == username) {
            console.log("found user", snapshot.val());
            foundUser = {
              username: snapshot.val().username,
              email: snapshot.val().email,
              uid: snapshot.key,
              found: true,
            };
            return;
          }
        });
        return foundUser;
      };

    // const searchUser2 = (email) => {
    //     let foundUser = {email:null, uid:null, found:false}
    //     db.ref.orderByKey().on("child_added", function(snapshot) {
    //         if (snapshot.val().email == email) {
    //             console.log("found user", snapshot.val())
    //             foundUser = {email:snapshot.val().email, uid: snapshot.key, found:true}
    //             return 
    //         } 
    //     })
    //     return foundUser
    // }
    // console.log(searchUser(search))

    useEffect(() => {
        let foundUser = searchUser(search)
        console.log("foundUser (use effect) = ", foundUser)
        if (foundUser.found) {
            setFoundUser({username: foundUser.username, email:foundUser.email,uid:foundUser.uid})
            console.log("setting found user state")
        }
        
      }, [search]);
    // if (searchUser(search)) {
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
    return(
        <View>

{/* <Text style={[textStyles.normalBold,{left:heightPercentageToDP('25'),marginTop: heightPercentageToDP('-22')}]}>{event.startdate}</Text> */}
            
            <SearchBar
                placeholder="Search for user to mesage..."
                autoCapitalize = "none"
                containerStyle = {{backgroundColor: "white"}}
                inputStyle = {{color: "black"}}
                inputContainerStyle = {{backgroundColor: "white"}}
                searchIcon = {{color: "black"}}
                clearIcon = {{color: "black"}}
                placeholderTextColor = {"black"}
                onChangeText={updateSearch}
                value={search}
                style={[textStyles.normalRegular], {fontSize:actuatedNormalize(13)}}
                
            />
            <View style={styles.container}>
                <Text>{foundUser.username}</Text>
            </View>
            <TouchableOpacity style={{alignContent:'center',marginLeft:widthPercentageToDP(10)}} onPress={() => { 
                navigation.navigate('Chat', { OtherUserInfo: {
                    _id: foundUser.uid,
                    email: foundUser.email,
                    username: foundUser.username
                }})
            }}>

            <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('2.5') }} />
                
                {/* <CustomButton
                text="Create a new message"
                primary
                shadow
                /> */}
        </TouchableOpacity> 
        </View>
    )

}


export default CreateNewMessage;