import React, { useState, useEffect} from "react"
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, Image, StyleSheet} from "react-native"
import newMessageBtn from "ping/assets/newMessage.png"
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import {SearchBar} from "react-native-elements"
import AuthContext from 'ping/src/contexts/AuthContext';
import firebase from 'firebase';
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
    return(
        <View>
            
            <SearchBar
                placeholder="Search for user email..."
                autoCapitalize = "none"
                containerStyle = {{backgroundColor: "white"}}
                inputStyle = {{color: "white"}}
                inputContainerStyle = {{backgroundColor: "#3D8976"}}
                searchIcon = {{color: "white"}}
                clearIcon = {{color: "white"}}
                placeholderTextColor = {"white"}
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
                <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('0') }} />
            </TouchableOpacity>
        </View>
    )

}


export default CreateNewMessage;