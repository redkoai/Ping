import React, { useState} from "react"
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

    const [search, setSearch] = useState([])

    const updateSearch = (search) => {
        setSearch(search)
    }

    // firebase.auth().


    console.log(search)
    return(
        <View>
            
            <SearchBar
                placeholder="Search for user email..."
                onChangeText={updateSearch}
                value={search}
            />

            <TouchableOpacity onPress={() => { 
                navigation.navigate('Chat')
            }}>
                <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('0') }} />
            </TouchableOpacity>
        </View>
    )

}


export default CreateNewMessage;