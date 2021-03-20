import React, { useState, useContext, useEffect, useCallback} from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';
import { GiftedChat } from 'react-native-gifted-chat'

import firebase from 'firebase';
import 'firebase/firestore'
import CreateNewMessage from './CreateNewMessage';




function Chat({route, navigation }) {

    const [messages, setMessages] = useState([])
    const db = firebase.database().ref("messages")

    const { user } = useContext(AuthContext);

    const { OtherUserInfo } = route.params

    console.log("OtherUserInfo =", OtherUserInfo)


    const UserInfo = { "_id": user.uid, "email": user.email }

    const send = (messages) => {
        messages.forEach(item => {
            const message = {
            text: item.text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: item.user,
            userTo: OtherUserInfo
            }
            db.push(message)
        })
    }

    const parse = (message) => {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user
        }
    }

    const getMessage = (callback) => { // pass in a callback that adds the message to the page
        db.on("child_added", snapshot => {
            if (snapshot.val().user._id == user.uid && snapshot.val().userTo._id == OtherUserInfo._id){
                console.log("snapshot.val()1 = ",snapshot.val())
                callback(parse(snapshot))
            }
            console.log("After first check = ", snapshot.val())
            if (snapshot.val().userTo._id == user.uid && snapshot.val().user._id == OtherUserInfo._id){
                console.log("snapshot.val()2 = ",snapshot.val())
                callback(parse(snapshot))
            }
        })
    }    

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    React.useEffect(()=> {
        getMessage(appendMessages)
    }, [])

    return(
        <GiftedChat messages={messages} user = {UserInfo} onSend={send} />
    )

}


export default Chat;





