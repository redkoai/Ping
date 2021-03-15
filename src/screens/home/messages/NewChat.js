import React, { useState, useContext, useEffect, useCallback} from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';
import { GiftedChat } from 'react-native-gifted-chat'

import firebase from 'firebase';
import 'firebase/firestore'


function NewChat({ }) {

    const [messages, setMessages] = useState([])
    const db = firebase.database().ref("messages")

    const { user } = useContext(AuthContext);
    const UserInfo = { "uid": user.uid, "email": user.email }

    const send = (messages) => {
        messages.forEach(item => {
            const message = {
            text: item.text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: item.user
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
        db.on("child_added", snapshot => callback(parse(snapshot)))
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


export default NewChat;





