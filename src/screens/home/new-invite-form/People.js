import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NewInviteContext from "ping/src/contexts/NewInviteContext";
import {
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  SafeAreaView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spacer from "ping/src/components/Spacer";
import styles, { textStyles, colors } from "ping/src/styles/styles";
import { widthPercentageToDP, heightPercentageToDP } from "ping/util/scaler";
import Icon from "react-native-vector-icons/Ionicons";
import { AwesomeCard } from "react-native-awesome-card";
import { Card } from "react-native-shadow-cards";
import rsvpprogline from "ping/assets/createnew/rsvp/rsvpprogline.png";
import CustomButton from "ping/src/components/inputs/CustomButton";
import CustomTextInput from "ping/src/components/inputs/CustomTextInput";
import { SearchBar } from "react-native-elements";
import firebase from "firebase";
import "firebase/firestore";
import { Button } from "react-native-paper";
import AuthContext from 'ping/src/contexts/AuthContext';
import send from 'ping/assets/invites/sends.png';
import sends from 'ping/assets/invites/send.png';
import adds from 'ping/assets/invites/add.png';
import add from 'ping/assets/invites/adds.png';
import { actuatedNormalize } from "ping/util/fontScaler";
import email from 'react-native-email'



function People({ navigation }) {
  const { formData, updateFormData } = useContext(NewInviteContext);

  const { user } = useContext(AuthContext)

  const { control, errors, reset, setValue, handleSubmit } = useForm({
    //resolver: yupResolver(RSVP_SCHEMA),
  });

  // Trying to update form with the guestlist, need help
  const guests = {}

  const onSubmit = () => {
    updateFormData(guests);
    navigation.navigate("EventInvited");
    reset();
  };

  const consoleLog = () => {
    console.log("guestlist = ", guests)
  }


  //////////////////////////////////////////
  // Send to people that do not have the app
  //////////////////////////////////////////

  const [text, setText] = useState([]) 

  // create randomly generated password
  const [password, setPassword] = useState()

  const updateText = (text) => {
    setText(text);
    setPassword("test1234")
    console.log("text input =", text)
  };

  // const sendInviteToEmail = () => {
  //   console.log("text =", text)
  // }

  const handleEmail = () => {
    const to = text // string or array of email addresses
    email(to, {
        // Optional additional arguments
        cc: [`${text}`], // string or array of email addresses
        bcc: 'jbodoia@gmail.com', // string or array of email addresses
        subject: 'You have an invite from Ping',
        body: `You have been invited to the follow event: 
        
        Event Name: ${formData.event} 
        
        Dresscode: ${formData.dresscode}

        Location: ${formData.location}

        Start Date: ${formData.startdate}

        End Date: ${formData.enddate}

        Link to ping app: 


        Ping login information:
        username: ${text}
        email: ${text}
        password: ${password}
        `
        
        
        
        ,
        
    }).catch(console.error)
    // console.log("one")
    firebase.auth().createUserWithEmailAndPassword(text, password).then(cred => {
      console.log("cred =", cred)
    })
  
}
// TODO: create user using the email that from text input (text state), and then push formData to the user: 

// const signUp = () => {
//   console.log("text = ", text)
//   console.log("password =", password)
//   firebase.auth().createUserWithEmailAndPassword(text, password).then(cred => {
//     console.log("cred =", cred)
//   })
// }



console.log("form data = ", formData)

  ////////////////////////////
  // changing color of buttons
  /////////////////////////////
  // const [button, setButton] = useState(false)
  // const [buttonAdd, setButtonAdd] = useState(false)
  
  // const buttonChange = () => {
  //   setButton(true)
  // }
  // const buttonChangeAdd = () => {
  //   setButtonAdd(true)
  // }
  ///////////////////////////////////////////////////////////
  // Adding firebase query to check if email searched exists
  ///////////////////////////////////////////////////////////
  const db = firebase.database().ref("users");
  const [search, setSearch] = useState([]);


  const sendInvite = () => {
    guests[foundUser.uid] = "no"
    console.log(foundUser);
    console.log(formData);
    // db.child(foundUser.uid);
    db.child(`${foundUser.uid}/Events/${eventID}`).set(formData);
    console.log("Data pushed");
    // db.child(user.user.uid).set({"email" : user.user.email})
  };

  const sendInviteToAllFriends = () => {
    db.child(`${user.uid}/Friends`).on('child_added', function(snapshot) {
      console.log("snpashot = ", snapshot)
      console.log("snapshot key =", snapshot.key)
      console.log("snapshot value =", snapshot.val())
      db.child(`${snapshot.key}/Events/${eventID}`).set(formData)
      console.log('form data pushed')
  })
  }

  const sendHostEvent = () => {
    db.child(`${user.uid}/Events/${eventID}`).set(formData);
    console.log("host data pushed")
  }

  const addFriend = () => {
    // db.child(foundUser.uid);
    // Adding user to foundUser's (email that was searched) friends list
    // db.child(`${foundUser.uid}/Friends/${user.uid}`).set({username: user.username, email: user.email});
    // Check if friend already exists:
    db.child(`${user.uid}/Friends`).on('child_added', function(snapshot) {
      if (snapshot.key == foundUser.uid) {
        console.log('this friend has already been added')
      } else {
        db.child(`${user.uid}/Friends/${foundUser.uid}`).set({username: foundUser.username, email: foundUser.email});
        console.log("friend added!")
      }
  })
  };

   //////////////////////////////////////
    // Firebase query for current friends
    //////////////////////////////////////

    const [friends, setFriends] = useState({})
    // const friends = []
    const queryFriends = () => {
      let friends = {}
      db.child(`${user.uid}/Friends`).on('child_added', function(snapshot) {
        console.log("snapshot value = ", snapshot.val().username)
        console.log("snapshot key = ", snapshot.key)
        friends[snapshot.val().username] = snapshot.key
    })
    return friends
    }


    const friendLoop = Object.keys(friends).map((key) => {
      console.log(key)
      const sendInviteToQueryFriend = () => {
        db.child(`${friends[key]}/Events/${eventID}`).set(formData);
        console.log("Data pushed");
        // db.child(user.user.uid).set({"email" : user.user.email})
      };
      return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <Text  style={{marginLeft:widthPercentageToDP('10'), fontSize:actuatedNormalize(15), marginTop: heightPercentageToDP('3'), }}>
                    {key}</Text>
                <TouchableOpacity onPress={sendInviteToQueryFriend}>
                    <Image source={send}  style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('10'), marginTop: heightPercentageToDP('0'),marginLeft:widthPercentageToDP('23'), resizeMode:'contain' }} />
                </TouchableOpacity>
            </View>
        </View>    
      )
    })


    useEffect(() => {
      // friendLoop()
      // let friends_list = queryFriends()
      setFriends(queryFriends())
      console.log("friends =", friends)
      // console.log("friends list = ", friends_list)

    }, [])


  const [foundUser, setFoundUser] = useState({
    email: null,
    uid: null,
  });

  const updateSearch = (search) => {
    setSearch(search);
  };



  const searchUser = (username) => {
    let foundUser = { username: null, email: null, uid: null, found: false };
    db.ref.orderByKey().on("child_added", function (snapshot) {
      if (snapshot.val().username == username) {
        // setButton(false)
        // setButtonAdd(false)
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

  useEffect(() => {
    queryFriends()
    console.log(friends)
    let foundUser = searchUser(search);
    console.log("foundUser (use effect) = ", foundUser);
    if (foundUser.found) {
      setFoundUser({ username: foundUser.username, email: foundUser.email, uid: foundUser.uid });
      console.log("setting found user state");
    }
  }, [search]);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <StatusBar backgroundColor={colors.primary} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: widthPercentageToDP(3),
        }}
      >
        <Image
          source={rsvpprogline}
          style={{
            height: heightPercentageToDP("10"),
            width: widthPercentageToDP("85"),
            resizeMode: "contain",
            marginTop: heightPercentageToDP("-5"),
            left: heightPercentageToDP("0.7"),
          }}
        />
        <View
          style={{
            height: heightPercentageToDP("7"),
            width: widthPercentageToDP("88"),
            resizeMode: "contain",
            marginTop: heightPercentageToDP("-4"),
            marginLeft: widthPercentageToDP("-13"),
          }}
        >
          {/* <CustomTextInput
          control={control}
          errors={errors}
          input={{
            name: 'people',
            placeholder: 'Add from contacts',
            placeholderTextColor:'#303033',
            defaultValue: '',
          }} 
        /> */}
          <Card style={{ padding: 5, margin: 22, height: 80 }}>
            <SearchBar
              placeholder="Search for user to mesage..."
              autoCapitalize="none"
              containerStyle={{ backgroundColor: "white" }}
              inputStyle={{ color: "black" }}
              inputContainerStyle={{ backgroundColor: "white" }}
              searchIcon={{ color: "black" }}
              clearIcon={{ color: "black" }}
              placeholderTextColor={"black"}
              onChangeText={updateSearch}
              value={search}
            />
          </Card>
          <Card style={{ padding: 5, margin: 22, height: 80 }}>
            <SearchBar
              placeholder="Enter an email to send an invite to..."
              autoCapitalize="none"
              containerStyle={{ backgroundColor: "white" }}
              inputStyle={{ color: "black" }}
              inputContainerStyle={{ backgroundColor: "white" }}
              searchIcon={{ color: "black" }}
              clearIcon={{ color: "black" }}
              placeholderTextColor={"black"}
              onChangeText={updateText}
              value={text}
            />
          </Card>
          <TouchableOpacity>
            <Button onPress={handleEmail} 
            // onPress={ signUp }
          > Send email </Button>
          </TouchableOpacity>
          <TouchableOpacity>
                 {/* temporarily using this as a button to send to all friends */}
                {/* <Image source={send}  style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('10'), marginTop: heightPercentageToDP('0'),marginLeft:widthPercentageToDP('23'), resizeMode:'contain' }} /> */}
             {/* <View style={{
               
               marginLeft:widthPercentageToDP('10')
             }}>         
              <CustomButton
             text="Send Invite to All Friends"
             onPress={sendInviteToAllFriends}
             
             primary
           />
               
             </View> */}
              
            
            </TouchableOpacity>
          {
            foundUser.email != null ?
            <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
              <Text  style={{marginLeft:widthPercentageToDP('10'), fontSize:actuatedNormalize(15), marginTop: heightPercentageToDP('3'), }}>
                  {foundUser.username}
              </Text>
              <TouchableOpacity onPress={sendInvite}>
                <Image source={send}  style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('10'), marginTop: heightPercentageToDP('0'),marginLeft:widthPercentageToDP('23'), resizeMode:'contain' }} />
                {/* <Button onPress={sendInvite}>Send Invite</Button> */}
                {/* {console.log("button = ", button)} */}
              </TouchableOpacity>
              <TouchableOpacity onPress={addFriend}>
                <Image source={add}  style={{height: heightPercentageToDP('10'), width :widthPercentageToDP('10'), marginTop: heightPercentageToDP('0'), marginLeft:widthPercentageToDP('2'), resizeMode:'contain' }} />
                  {/* <Button onPress={addFriend}>Add Friend</Button> */}
               </TouchableOpacity>
            </View>
          </View>
          :
          null
          }


        </View>

        {/* <TouchableOpacity
        style={{
        marginTop: heightPercentageToDP('-4.5'),
        left: heightPercentageToDP('15'),
       borderWidth:1,
       borderColor:'#3D8976',
       alignItems:'center',
       justifyContent:'center',
       width:50,
       height:50,
       backgroundColor:'#3D8976',
       borderRadius:25,
     }}
 >
   <Icon name={"arrow-forward"}  size={30} color="#FFFFFF" />
 </TouchableOpacity> */}

        {/* <TouchableOpacity>
 <Card style={{padding: 15, margin: 22,height: 50}}>
        <Text>Search for friends...</Text>
</Card>
</TouchableOpacity> */}

        <View style={{
               
               marginLeft:widthPercentageToDP('5'),
               marginTop: heightPercentageToDP("40")
              
             }}> 
             {
                  friends ?
                  <View>
                    <Text>
                      Friends:
                    </Text>
                    {friendLoop}
                  </View>
                  :
                  null
                }        
              <CustomButton
             text="Send Invite to All Friends"
             onPress={sendInviteToAllFriends}
             
             primary
           />
               
             </View>
       

        <View
          style={{ alignSelf: "flex-end", left: heightPercentageToDP("-1") }}
        >
          
          <CustomButton
            text="next"
            onPress={handleSubmit(onSubmit)}
            onPress={sendHostEvent}
            onPress={consoleLog}
            narrow
            primary
          />
        </View>

        <Spacer height={2} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default People;
