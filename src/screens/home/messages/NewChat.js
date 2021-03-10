import React, { useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import AuthContext from 'ping/src/contexts/AuthContext';


function NewChat({ navigation }) {
    const { user } = useContext(AuthContext);

    console.log( user.email )
    return(
        <View style = {styles.container}>
            <Text>Chat</Text>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default NewChat;