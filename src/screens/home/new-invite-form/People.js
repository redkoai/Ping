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
import AuthContext from "ping/src/contexts/AuthContext";
import send from "ping/assets/invites/sends.png";
import sent from "ping/assets/invites/sent.png";
import sends from "ping/assets/invites/send.png";
import adds from "ping/assets/invites/add.png";
import add from "ping/assets/invites/adds.png";
import { actuatedNormalize } from "ping/util/fontScaler";
import uuid from "react-native-uuid";
import email from "react-native-email";

function People({ route, navigation }) {
  const { formData, updateFormData } = useContext(NewInviteContext);
  const [guestList, setGuestList] = useState([]);
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState("");
  const [eventID, setEventID] = useState("");
  const { control, errors, reset, setValue, handleSubmit } = useForm({
    //resolver: yupResolver(RSVP_SCHEMA),
  });
  const[photo, setPhoto]=useState("")

  useEffect(() => {
    const randomID = uuid.v1();
    setEventID(randomID);

    let bucketName="images"
    let file =route.params.imagePath
      // firebase.storage()
      // .ref(`${bucketName}/${randomID}/${file}`)
      // //eventID as the path name to be able to access 
      // .put(file)
      // .then((snapshot) => {
      //   //You can check the image is now uploaded in the storage bucket
      //   console.log(`image has been successfully uploaded.`);
      // })
      // .catch((e) => console.log('uploading image error => ', e));

      let storageRef =firebase.storage().ref().child(`images/${randomID}`)
      fetch(file).then(res=>res.blob()).then(blob=>
        storageRef.put(blob).then(function(snapshot){
          console.log(snapshot)
          console.log("Uploaded a blob")
        })
        ).catch(e=>console.log(e,"imageError"))
      //eventID as the path name to be able to access 
      // .put(file)
      // .then((snapshot) => {
      //   //You can check the image is now uploaded in the storage bucket
      //   console.log(`image has been successfully uploaded.`);
      // })
      // .catch((e) => console.log('uploading image error => ', e));


  }, []);


 

  // Trying to update form with the guestlist, need help
  const guests = {};
  const rand = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
  const onSubmit = () => {
    sendHostEvent();

    // db.child(`${user.uid}/Events/${eventID}`).on(
    //   "child_added",
    //   function (snapshot) {
    //     console.log("snapshot =", snapshot);
    //     event[snapshot.key] = snapshot.val();
    //   }
    // );

    formData.guestList = guestList;
    firebase
      .database()
      //.ref(`InviteForms/${randomID}`)
      .ref(`InviteForms/`)
      .push({
        formData,
        secret_code: rand(),
      })
      .then((data) => {
        //success callback
        console.log("data ", data);
      })
      .catch((error) => {
        //error callback
        console.log("error ", error);
      });
    updateFormData(guests);
    

    navigation.navigate("Events", {
      screen: "MyInvite",
      params: {
        eventID: eventID,
        imagePath:route.params.imagePath
      },
    });
    reset();
  };

  const consoleLog = () => {
    console.log("guestlist = ", guests);
  };

  //////////////////////////////////////////
  // Send to people that do not have the app
  //////////////////////////////////////////

  const [text, setText] = useState([]);

  // create randomly generated password
  const [password, setPassword] = useState();
  const [emailInviteBool, setEmailInviteBool] = useState(false);

  const updateText = (text) => {
    setText(text);
    // Todo generate this password randomly:
    setPassword("test1234");
    console.log("text input =", text);
  };

  // const sendInviteToEmail = () => {
  //   console.log("text =", text)
  // }

  const handleEmail = () => {
    //todo : array of emails ITERARTE
    setEmailInviteBool(true);
    for (let i = 0; i < emailList.length; i++) {
      const to = emailList[i]; // string or array of email addresses
      email(to, {
        // Optional additional arguments
        // cc: [`${text}`], // string or array of email addresses
        cc: [`${emailList[i]}`],
        bcc: "jbodoia@gmail.com", // string or array of email addresses [`${text}`],
        subject: "You have an invite from Ping",
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
        `,
      }).catch((e) => console.log(e, "blllur"));
    }
    // create a user using the email from input:
    firebase
      .auth()
      .createUserWithEmailAndPassword(text, password)
      .then((cred) => {
        console.log("cred =", cred);
        // create email and username for user in firebase:
        db.child(`${cred.user.uid}`).set({ email: text, username: text });
        // push the invite data to the database for the user created:
        db.child(`${cred.user.uid}/Events`).push(formData);
      });
  };

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
  const inviteFormDB = firebase.database().ref(`InviteForms`);
  const [search, setSearch] = useState([]);
  const [sentInviteToAllFriendsBool, setSentInviteToAllFriendsBool] = useState(
    false
  );
  const [addedFriendsList, setAddedFriendsList] = useState([]);

  const sendInvite = () => {
    guests[foundUser.uid] = "no";
    db.child(foundUser.uid);

    // db.child(user.user.uid).set({ email: user.user.email });

    const modifiedGuestList = guestList;
    const foundUserData = foundUser;
    foundUserData.invited = 1;
    modifiedGuestList.push(foundUserData);
    setGuestList(modifiedGuestList);
    const listFormData = formData;
    listFormData["guest_list"] = guestList;

    db.child(`${foundUser.uid}/Events/${eventID}`).push(listFormData);
    console.log("Data pushed");
    setSentMessgeStatus(!sentMessageStatus);
  };

  const sendInviteToAllFriends = () => {
    db.child(`${user.uid}/Friends`).on("child_added", function (snapshot) {
      console.log("snpashot = ", snapshot);
      console.log("snapshot key =", snapshot.key);
      console.log("snapshot value =", snapshot.val());
      db.child(`${snapshot.key}/Events/${eventID}`).set(formData);
      console.log("form data pushed");
    });
    setSentInviteToAllFriendsBool(!sentInviteToAllFriendsBool);
  };

  const sendHostEvent = () => {
    db.child(`${user.uid}/Events/${eventID}`).set(formData);
    console.log("host data pushed");
  };

  const addFriend = () => {
    // db.child(foundUser.uid);
    // Adding user to foundUser's (email that was searched) friends list
    // db.child(`${foundUser.uid}/Friends/${user.uid}`).set({username: user.username, email: user.email});
    // Check if friend already exists:
    const addedFriendsListArr = addedFriendsList;
    addedFriendsListArr.push(foundUser);

    setAddedFriendsList(() => [...addedFriendsListArr]);
    console.log(addedFriendsList, "addedFriendsList");

    db.child(`${user.uid}/Friends`).on("child_added", function (snapshot) {
      if (snapshot.key == foundUser.uid) {
        console.log("this friend has already been added");
      } else {
        db.child(`${user.uid}/Friends/${foundUser.uid}`).set({
          username: foundUser.username,
          email: foundUser.email,
        });
        console.log("friend added!");
      }
    });
  };

  //////////////////////////////////////
  // Firebase query for current friends
  //////////////////////////////////////

  const [friends, setFriends] = useState({});
  // const friends = []
  // const queryFriends = () => {
  //   let friends = {};
  //   db.child(`${user.uid}/Friends`).on("child_added", function (snapshot) {
  //     console.log("snapshot value = ", snapshot.val().email);
  //     console.log("snapshot key = ", snapshot.key);
  //     friends[snapshot.val().email] = snapshot.key;
  //     setFriends(friends);
  //     console.log(friends, "orages");
  //   });

  //   return friends;
  // };

  const queryFriends = () => {
    let friends = {};
    db.child(`${user.uid}/Friends`).on("child_added", function (snapshot) {
      console.log("snapshot value = ", snapshot.val().username);
      console.log("snapshot key = ", snapshot.key);
      friends[snapshot.val().username] = snapshot.key;
    });
    return friends;
  };

  useEffect(() => {
    // friendLoop()
    // let friends_list = queryFriends()
    queryFriends();
    console.log("friends =", friends);
    // console.log("friends list = ", friends_list)
  }, []);

  useEffect(() => {
    setInterval(() => {
      queryFriends();
    }, 10000);
  }, []);

  const friendLoop = Object.keys(friends).map((key) => {
    console.log(key);
    const sendInviteToQueryFriend = (friendKey) => {
      db.child(`${friends[key]}/Events/${eventID}`).set(formData);
      console.log("Data pushed");

      // db.child(user.user.uid).set({"email" : user.user.email})
    };

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              textStyles.bigRegular,
              {
                marginLeft: widthPercentageToDP("0"),
                fontSize: actuatedNormalize(12),
                marginTop: heightPercentageToDP("2"),
              },
            ]}
          >
            {key}
          </Text>
          <TouchableOpacity onPress={sendInviteToQueryFriend}>
            <Image
              source={send}
              style={{
                height: heightPercentageToDP("10"),
                width: widthPercentageToDP("10"),
                marginTop: heightPercentageToDP("-2"),
                marginLeft: widthPercentageToDP("30"),
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  const [foundUser, setFoundUser] = useState({
    email: null,
    uid: null,
  });

  const [sentMessageStatus, setSentMessgeStatus] = useState(false);
  const [emailList, setEmailList] = useState([]);

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
    queryFriends();
    console.log(friends);
    let foundUser = searchUser(search);
    console.log("foundUser (use effect) = ", foundUser);
    if (foundUser.found) {
      setFoundUser({
        username: foundUser.username,
        email: foundUser.email,
        uid: foundUser.uid,
      });
      console.log("setting found user state");
    }
  }, [search]);

  const addEmail = () => {
    let emailListChangeArr = emailList;
    emailListChangeArr.push(text);
    setEmailList(() => [...emailListChangeArr]);
  };

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
          <View
            style={{
              marginLeft: widthPercentageToDP("5"),
              width: widthPercentageToDP("100"),
            }}
          >
            <Card>
              <SearchBar
                placeholder="Search for user to invite..."
                autoCapitalize="none"
                containerStyle={{ backgroundColor: "white" }}
                inputStyle={{ color: "black" }}
                inputContainerStyle={{ backgroundColor: "white" }}
                searchIcon={{ color: "black" }}
                clearIcon={{ color: "black" }}
                placeholderTextColor={"black"}
                onChangeText={updateSearch}
                value={search}
                lightTheme
              />
            </Card>
          </View>

          {foundUser.email != null ? (
            <View style={styles.container}>
              <View style={{ flexDirection: "row", justifyContent:'space-around' }}>
                <Text
                  style={{
                    marginLeft: widthPercentageToDP("6"),
                    fontSize: actuatedNormalize(15),
                    marginTop: heightPercentageToDP("3"),
                  }}
                >
                  {foundUser.username}
                </Text>
                {/* todo conditional rendering */}
                <TouchableOpacity onPress={addFriend}>
                  <Image
                    source={add}
                    style={{
                      height: heightPercentageToDP("10"),
                      width: widthPercentageToDP("10"),
                      marginTop: heightPercentageToDP("0"),

                      marginLeft: widthPercentageToDP("32"),
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
                {!sentMessageStatus ? (
                  <TouchableOpacity onPress={sendInvite}>
                    <Image
                      source={send}
                      style={{
                        height: heightPercentageToDP("10"),
                        width: widthPercentageToDP("10"),
                        marginTop: heightPercentageToDP("0"),
                        marginLeft: widthPercentageToDP("2"),
                        resizeMode: "contain",
                      }}
                    />

                    {/* <Button onPress={sendInvite}>Send Invite</Button> */}
                    {/* {console.log("button = ", button)} */}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setSentMessgeStatus(!sentMessageStatus)}
                  >
                    <Image
                      source={sent}
                      style={{
                        height: heightPercentageToDP("10"),
                        width: widthPercentageToDP("10"),
                        marginTop: heightPercentageToDP("0"),
                        marginLeft: widthPercentageToDP("2"),
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null}
          <View
            style={{
              marginLeft: widthPercentageToDP("5"),
              marginTop: heightPercentageToDP("2"),
            }}
          >
            {friends && (
              <View>

                <Text
                  style={[
                    textStyles.bigBold,
                    { left: widthPercentageToDP("0") },
                  ]}
                >
                  Friends:
                 
                </Text>
                <View style={{flexDirection:'row'}}>
                {addedFriendsList.map((addedFriend) => (
                   <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                      <View style={{marginTop:heightPercentageToDP("2")}}>
                  <Text style={[
                    textStyles.bigRegular,
                    { left: widthPercentageToDP("4") },
                  ]}>{addedFriend.username}</Text>
                  </View>
                <View style={{left: widthPercentageToDP("37") }}>
                  <CustomButton
                  text="Remove"
                  // onPress={sendInviteToAllFriends}
                  outline
                  small
                  buttonSecondary
                />
                </View>
                 </View>
                ))
                }
                {friendLoop} 
               
              </View>
              </View>
              
            )}
          </View>

          <View
            style={{
              marginLeft: widthPercentageToDP("10"),
              marginTop: heightPercentageToDP("5"),
              marginBottom: heightPercentageToDP("5"),
            }}
          >
            {!sentInviteToAllFriendsBool ? (
              <CustomButton
                text="Send to All Friends"
                onPress={sendInviteToAllFriends}
                outline
                small
                buttonSecondary
              />
            ) : (
              <CustomButton
                text="Send to All Friends"
                onPress={sendInviteToAllFriends}
                disabled
                small
                buttonSecondary
              />
            )}
          </View>

          <View
            style={{
              marginLeft: widthPercentageToDP("5"),
              width: widthPercentageToDP("30"),
            }}
          >
            <Card style={{ justifyContent: "center" }}>
              <SearchBar
                placeholder="Enter an email to send an invite..."
                autoCapitalize="none"
                containerStyle={{ backgroundColor: "white" }}
                inputStyle={{ color: "black" }}
                inputContainerStyle={{ backgroundColor: "white" }}
                searchIcon={{ color: "black" }}
                clearIcon={{ color: "black" }}
                placeholderTextColor={"black"}
                onChangeText={updateText}
                value={text}
                lightTheme
              />
              {/* <TouchableOpacity>
                <Text>ADD</Text>
              </TouchableOpacity> */}
              <CustomButton small onPress={addEmail} text="ADD"/>
            </Card>
            {emailList.map((email) => (
              <Text>{email}</Text>
            ))}
          </View>
          {/* <CustomButton onPress={handleEmail} 
            // onPress={ signUp }
          > Send email </Button> */}
          <TouchableOpacity>
            <View
              style={{
                marginLeft: widthPercentageToDP("12"),
                marginTop: heightPercentageToDP("3"),
              }}
            >
              {!emailInviteBool ? (
                <CustomButton
                  text="Email Invites"
                  onPress={handleEmail}
                  narrow
                  buttonSecondary
                  outline
                  small
                />
              ) : (
                <CustomButton
                  text="Email Invites"
                  onPress={handleEmail}
                  narrow
                  buttonSecondary
                  disabled
                  small
                />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity></TouchableOpacity>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            left: heightPercentageToDP("0"),
            marginTop: heightPercentageToDP("60"),
          }}
        >
          <CustomButton
            text="next"
            onPress={handleSubmit(onSubmit)}
            //onPress={sendHostEvent}
            //onPress={consoleLog}
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
