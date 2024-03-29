import React, { useState, useContext, useEffect, useCallback} from 'react';
import AuthContext from 'ping/src/contexts/AuthContext';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import CustomButton from 'ping/src/components/inputs/CustomButton';
import firebase from 'firebase';
import 'firebase/firestore'
import CreateNewMessage from './CreateNewMessage';




function Chat({route, navigation }) {

    const [messages, setMessages] = useState([])
    const db = firebase.database().ref("users")

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
            // db.child(`${user.uid}/messages/${user.uid}`).push(message)
            db.child(`${user.uid}/messages/${OtherUserInfo._id}`).push(message)
            db.child(`${OtherUserInfo._id}/messages/${user.uid}`).push(message)
            // db.child(`${user.uid}/messages/`).push(message)
            // db.child(`${OtherUserInfo._id}/messages/`).push(message)
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
        // db.child(`${user.uid}/messages/${OtherUserInfo._id}`).on("child_added", snapshot => {
        db.child(`${user.uid}/messages/${OtherUserInfo._id}`).on("child_added", snapshot => {
            callback(parse(snapshot))
            // if (snapshot.val().user._id == user.uid && snapshot.val().userTo._id == OtherUserInfo._id){
            //     console.log("snapshot.val()1 = ",snapshot.val())
            //     callback(parse(snapshot))
            // }
            // console.log("After first check = ", snapshot.val())
            // if (snapshot.val().userTo._id == user.uid && snapshot.val().user._id == OtherUserInfo._id){
            //     console.log("snapshot.val()2 = ",snapshot.val())
            //     callback(parse(snapshot))
            // }
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


        <GiftedChat messages={messages} user = {UserInfo} onSend={send} wrapperStyle={{
            left: {
              backgroundColor: 'white',
            
            },
            right:{
            backgroundColor: '#A6ACE9',
            
            },
          }}/>
        //image?: renderAvatar 

        
    )

}


export default Chat;





