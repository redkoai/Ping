import React, { useState, useEffect} from "react"
import {useNavigation} from "@react-navigation/native";
import {View, Text, TouchableOpacity, Image} from "react-native"
import newMessageBtn from "ping/assets/newMessage.png"
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import {SearchBar} from "react-native-elements"
import AuthContext from 'ping/src/contexts/AuthContext';
import firebase from 'firebase';
import 'firebase/firestore'


function CreateNewMessage({ }) {
    const navigation = useNavigation()

    const db = firebase.database().ref("users")
    const [search, setSearch] = useState([])

    const [foundUser, setFoundUser] = useState([])

    const updateSearch = (search) => {
        setSearch(search)
    }

    const searchUser = (email) => {
        let found = false
        db.ref.orderByKey().on("child_added", function(snapshot) {
            // console.log(snapshot.val().email)
            if (snapshot.val().email == email) {
                console.log("found user")
                found = true
                return
                // return true
            } else {
                console.log("user not found")
            }
        })
        return found
    }
    // console.log(searchUser(search))

    useEffect(() => {
        if (searchUser(search)) {
            console.log("poop")
            setFoundUser(search)
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
                onChangeText={updateSearch}
                value={search}
            />
            <View>
                <Text>{foundUser}</Text>
            </View>
            <TouchableOpacity onPress={() => { 
                navigation.navigate('Chat')
            }}>
                <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('0') }} />
            </TouchableOpacity>
        </View>
    )

}


export default CreateNewMessage;