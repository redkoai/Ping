import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Button,
  Modal,
} from "react-native";
import NewInviteContext from "ping/src/contexts/NewInviteContext";
import AuthContext from "ping/src/contexts/AuthContext";
import Spacer from "ping/src/components/Spacer";
import { colors, textStyles } from "ping/src/styles/styles";
import { widthPercentageToDP, heightPercentageToDP } from "ping/util/scaler";
import CustomButton from "ping/src/components/inputs/CustomButton";
import CalendarIcon from "ping/src/icons/CalendarIcon";
import LocationNearMeIcon from "ping/src/icons/LocationNearMeIcon";
import * as WebBrowser from "expo-web-browser";
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ReactRoundedImage from "react-rounded-image";
import { actuatedNormalize } from "ping/util/fontScaler";
// import MyPhoto from 'ping/assets/createnew/MyInvite/men.jpg';
import CustomText from "ping/src/components/CustomText";
import CustomTextInput from "ping/src/components/inputs/CustomTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Moment from "moment";
import add from "ping/assets/invites/add.png";
import send from "ping/assets/invites/send.png";
import newMessageBtn from "ping/assets/invites/messagehost.png";

import firebase from "firebase";
import "firebase/firestore";
import Events from "../Events";

function MyEvent({ navigation, route }) {
  // const navigation = useNavigation()

  const { eventID } = route.params;
  console.log(eventID.eventID);
  const { control, errors, setValue, reset, handleSubmit } = useForm({
    //resolver: yupResolver(DETAILS_SCHEMA),
  });

  //TODO: PULL WITH INVITE ID, AUTOMATICALLY ADD TO CALENDAR SENT INVITE
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [state, setState] = useState([]);
  const { user } = useContext(AuthContext);
  const UserInfo = { uid: user.uid, email: user.email };
  const [secretCode, setSecretCode] = useState("");

  const [event, setEvent] = useState({});

  const [areYouSureInviteAllFriends, setAreYouSureInviteAllFriends] = useState(
    false
  );
  const sendInviteToAllFriends = () => {
    setAreYouSureInviteAllFriends(true);
  };

  const sendInviteToAllFriendsConfirmation = () => {
    db.child(`${user.uid}/Friends`).on("child_added", function (snapshot) {
      console.log("snpashot = ", snapshot);
      console.log("snapshot key =", snapshot.key);
      console.log("snapshot value =", snapshot.val());
      db.child(`${snapshot.key}/Events/${route.params.eventID}`).set(formData);
      console.log("form data pushed");
    });
    setSentInviteToAllFriendsBool(!sentInviteToAllFriendsBool);
    setAreYouSureInviteAllFriends(false);
  };

  /////////////////////////
  // Firebase query
  /////////////////////////
  const db = firebase.database().ref("users");

  const getEvent = () => {
    const event = {};
    db.child(`${user.uid}/Events/${eventID}`).on(
      "child_added",
      function (snapshot) {
        // console.log("snapshot =", snapshot)
        event[snapshot.key] = snapshot.val();
      }
    );
    setEvent(event);
    console.log("event description = ", event.description);
    console.log("event co host = ", event["co-host-0"]);
    console.log("user.uid = ", user.uid);
    console.log("event = ", event);
  };

  const url = "https://www.google.com/maps/place/" + event.location;

  /////////////////////////////////////////////
  // Firebase query for event host information
  //////////////////////////////////////////////
  const [hostEmail, setHostEmail] = useState();
  const [hostUsername, setHostUsername] = useState();
  const [photo, setPhoto] = useState("");
  const [noToRSVP, setNoToRSVP] = useState(false);
  const [yesToRSVP, setYesToRSVP] = useState(false);
  const getHostInfo = () => {
    db.on("child_added", function (snapshot) {
      if (snapshot.key == event["co-host-0"]) {
        setHostEmail(snapshot.val().email);
        setHostUsername(snapshot.val().username);
      }
    });
  };

  console.log("host email =", hostEmail);
  console.log("host username =", hostUsername);
  console.log(event, "brown");

  //////////////////////////////
  // Send RSVP
  /////////////////////////////

  // const sendRSVP = () => {
  //   const message = {
  //     text: "Yes",
  //     timestamp: firebase.database.ServerValue.TIMESTAMP,
  //     user: {
  //       _id: user.uid,
  //       email: user.email
  //     },
  //     userTo: {
  //       _id: event["co-host-0"],
  //       email: hostEmail,
  //       username: hostUsername
  //     }
  // }
  // db.child(`${user.uid}/messages/${event["co-host-0"]}`).push(message)
  // db.child(`${event["co-host-0"]}/messages/${user.uid}`).push(message)

  // }

  useEffect(() => {
    getEvent();
    getHostInfo();
    const userUID = UserInfo.uid;
    // console.log("userid: ", userUID);
    //firebase.database().ref('/InviteForms').child("-MW_XbsJOLm2BCA6nA_K").child("formData").on('value',(snapshot)=>{
    //firebase.database().ref('/InviteForms').limitToLast(1).on('value',(snapshot)=>{
    firebase
      .database()
      .ref("/InviteForms")
      .limitToLast(1)
      .on("value", (snapshot) => {
        let data = snapshot.val() ? snapshot.val() : {};
        Object.keys(data).forEach((key) => {
          const dataobject = data[key];
          const formval = dataobject.formData;
          setState(formval);
        });
      });

    //get Image
    let storeRef = firebase.storage().ref();
    storeRef
      .child(`images/${route.params.eventID}`)
      .getDownloadURL()
      .then((url) => {
        console.log(url, "bananas");

        setPhoto(url);
      });
  }, []);

  // const { formData, updateFormData, bgImage } = useContext(NewInviteContext);

  const imagePath = `../../../../assets/invites/${event.imagePath}`;

  const getImage = (img) => {
    console.log(route.params, "greenblue");
    if (route.params.imagePath === "1.png") {
      return {
        image: require("../../../../assets/invites/1.png"),
      };
    } else if (route.params.imagePath === "2.png") {
      return { image: require("../../../../assets/invites/2.png") };
    } else if (route.params.imagePath === "3.png") {
      return { image: require("../../../../assets/invites/3.png") };
    } else if (route.params.imagePath === "4.png") {
      return { image: require("../../../../assets/invites/4.png") };
    } else if (route.params.imagePath === "5.png") {
      return { image: require("../../../../assets/invites/5.png") };
    } else if (route.params.imagePath === "6.png") {
      return { image: require("../../../../assets/invites/6.png") };
    } else if (route.params.imagePath === "7.png") {
      return { image: require("../../../../assets/invites/7.png") };
    } else if (route.params.imagePath === "8.png") {
      return { image: require("../../../../assets/invites/8.png") };
    } else if (route.params.imagePath === "9.png") {
      return { image: require("../../../../assets/invites/9.png") };
    } else if (route.params.imagePath === "10.png") {
      return { image: require("../../../../assets/invites/10.png") };
    } else if (route.params.imagePath === "11.png") {
      return { image: require("../../../../assets/invites/11.png") };
    } else if (route.params.imagePath === "12.png") {
      return { image: require("../../../../assets/invites/12.png") };
    } else if (route.params.imagePath === "13.png") {
      return { image: require("../../../../assets/invites/13.png") };
    } else if (route.params.imagePath === "14.png") {
      return { image: require("../../../../assets/invites/14.png") };
    } else if (route.params.imagePath === "15.png") {
      return { image: require("../../../../assets/invites/15.png") };
    } else if (route.params.imagePath === "cards/1.png") {
      return { image: require("../../../../assets/invites/cards/1.png") };
    } else if (route.params.imagePath === "cards/2.png") {
      return { image: require("../../../../assets/invites/cards/2.png") };
    } else if (route.params.imagePath === "cards/3.png") {
      return { image: require("../../../../assets/invites/cards/3.png") };
    } else if (route.params.imagePath === "cards/4.png") {
      return { image: require("../../../../assets/invites/cards/4.png") };
    } else if (route.params.imagePath === "cards/5.png") {
      return { image: require("../../../../assets/invites/cards/5.png") };
    } else if (route.params.imagePath === "cards/6.png") {
      return { image: require("../../../../assets/invites/cards/6.png") };
    } else if (route.params.imagePath === "cards/7.png") {
      return { image: require("../../../../assets/invites/cards/7.png") };
    } else if (route.params.imagePath === "cards/8.png") {
      return { image: require("../../../../assets/invites/cards/8.png") };
    } else if (route.params.imagePath === "cards/9.png") {
      return { image: require("../../../../assets/invites/cards/9.png") };
    } else if (route.params.imagePath === "cards/10.png") {
      return { image: require("../../../../assets/invites/cards/10.png") };
    } else if (route.params.imagePath === "cards/11.png") {
      return { image: require("../../../../assets/invites/cards/11.png") };
    } else if (route.params.imagePath === "cards/12.png") {
      return { image: require("../../../../assets/invites/cards/12.png") };
    } else if (route.params.imagePath === "cards/13.png") {
      return { image: require("../../../../assets/invites/cards/13.png") };
    } else if (route.params.imagePath === "cards/14.png") {
      return { image: require("../../../../assets/invites/cards/14.png") };
    } else if (route.params.imagePath === "cards/15.png") {
      return { image: require("../../../../assets/invites/cards/15.png") };
    } else if (route.params.imagePath === "cards/16.png") {
      return { image: require("../../../../assets/invites/cards/16.png") };
    } else if (route.params.imagePath === "cards/17.png") {
      return { image: require("../../../../assets/invites/cards/17.png") };
    } else if (route.params.imagePath === "cards/18.png") {
      return { image: require("../../../../assets/invites/cards/18.png") };
    } else if (route.params.imagePath === "cards/19.png") {
      return { image: require("../../../../assets/invites/cards/19.png") };
    } else if (route.params.imagePath === "cards/20.png") {
      return { image: require("../../../../assets/invites/cards/20.png") };
    } else if (route.params.imagePath === "cards/11.png") {
      return { image: require("../../../../assets/invites/cards/21.png") };
    } else if (route.params.imagePath === "cards/.22png") {
      return { image: require("../../../../assets/invites/cards/22.png") };
    } else if (route.params.imagePath === "cards/23.png") {
      return { image: require("../../../../assets/invites/cards/23.png") };
    } else if (route.params.imagePath === "cards/24.png") {
      return { image: require("../../../../assets/invites/cards/24.png") };
    } else if (route.params.imagePath === "cards/25.png") {
      return { image: require("../../../../assets/invites/cards/25.png") };
    } else if (route.params.imagePath === "cards/26.png") {
      return { image: require("../../../../assets/invites/cards/26.png") };
    } else if (route.params.imagePath === "cards/27.png") {
      return { image: require("../../../../assets/invites/cards/27.png") };
    } else if (route.params.imagePath === "cards/28.png") {
      return { image: require("../../../../assets/invites/cards/28.png") };
    } else if (route.params.imagePath === "cards/29.png") {
      return { image: require("../../../../assets/invites/cards/29.png") };
    } else if (route.params.imagePath === "cards/30.png") {
      return { image: require("../../../../assets/invites/cards/30.png") };
    } else {
      return { image: require("../../../../assets/invites/3.png") };
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ alignItems: "space-evenly" }}
    >
      <StatusBar backgroundColor={colors.primary} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          marginTop: widthPercentageToDP(3),
        }}
      >
        <View>
          {route.params.fbImage != null ? (
            <ImageBackground
              //source={getImage().image}
              source={{ uri: photo }}
              style={{
                height: heightPercentageToDP("30"),
                width: widthPercentageToDP("100"),
                marginLeft: widthPercentageToDP("0"),
                marginTop: heightPercentageToDP("-1"),
                resizeMode: "stretch",
              }}
            />
          ) : (
            <ImageBackground
              source={getImage().image}
              // source={{ uri: photo }}
              style={{
                height: heightPercentageToDP("30"),
                width: widthPercentageToDP("100"),
                marginLeft: widthPercentageToDP("0"),
                marginTop: heightPercentageToDP("-1"),
                resizeMode: "stretch",
              }}
            />
          )}
          <Modal
            animationType={"fade"}
            transparent={true}
            visible={areYouSureInviteAllFriends}
            onTouchOutside={() => {
              setAreYouSureInviteAllFriends(false);
            }}
          >
            <View
              style={{
                backgroundColor: "#A6ACE9",
                height: heightPercentageToDP("15"),
                width: widthPercentageToDP("60"),
                marginLeft: widthPercentageToDP("15"),
                borderRadius: 10,
              }}
            >
              <Text
                style={[
                  textStyles.bigRegular,
                  {
                    color: "white",
                    marginTop: heightPercentageToDP("2"),
                    marginLeft: widthPercentageToDP("2"),
                  },
                ]}
              >
                Are you sure you want to send to all friends?
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <TouchableOpacity onPress={sendInviteToAllFriendsConfirmation}>
                  <Text
                    style={[
                      textStyles.bigRegular,
                      {
                        color: "white",
                        marginTop: heightPercentageToDP("2"),
                        marginLeft: widthPercentageToDP("2"),
                      },
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setAreYouSureInviteAllFriends(false)}
                >
                  <Text
                    style={[
                      textStyles.bigRegular,
                      {
                        color: "white",
                        marginTop: heightPercentageToDP("2"),
                        marginLeft: widthPercentageToDP("2"),
                      },
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* <Text
            style={[
              textStyles.bigBold,
              {
                marginTop: heightPercentageToDP("31"),
                left: heightPercentageToDP("0"),
              },
            ]}
          >
            {event.event}
          </Text>
          <Text
            style={[
              textStyles.normalBold,
              {
                left: heightPercentageToDP("27"),
                marginTop: heightPercentageToDP("-35"),
              },
            ]}
          >
            {event.startdate}
          </Text>

          <Text
            style={[
              textStyles.normalBold,
              {
                left: heightPercentageToDP("1"),
                marginTop: heightPercentageToDP("-4"),
              },
            ]}
          >
            {event.location}
          </Text> */}
          {/* </ImageBackground>  */}
        </View>

        <View>
          <Text
            style={[
              textStyles.bigBold,
              {
                marginTop: heightPercentageToDP("3"),
                left: heightPercentageToDP("3"),
              },
            ]}
          >
            {event.event}
          </Text>
        </View>

        <View
          style={{
            height: heightPercentageToDP("10"),
            width: widthPercentageToDP("20"),
            resizeMode: "contain",
            flexDirection: "row",
            marginTop: heightPercentageToDP("3"),
            left: heightPercentageToDP("3"),
          }}
        >
          <CustomButton
            text="Secret Code"
            narrow
            primary
            onPress={() => {
              navigation.navigate("SecretCode");
            }}
          />
          <View
            style={{
              marginLeft: widthPercentageToDP(10),
              marginTop: heightPercentageToDP("-5"),
            }}
          >
            <Text
              style={[
                textStyles.normalBold,
                {
                  left: widthPercentageToDP("10"),
                  marginTop: heightPercentageToDP("0"),
                },
              ]}
            >
              RSVP
            </Text>
            {!yesToRSVP ? (
              <CustomButton
                text="Yes"
                small
                secondary
                outline
                onPress={() => {
                  setYesToRSVP(true);
                  console.log("host email =", hostEmail);
                  console.log("host username =", hostUsername);
                  const message = {
                    text:
                      "RSVP: Yes I will be attending " +
                      event.event +
                      " on " +
                      event.startdate,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: {
                      _id: user.uid,
                      email: user.email,
                    },
                    userTo: {
                      _id: event["co-host-0"],
                      email: `${hostEmail}`,
                      username: `${hostUsername}`,
                    },
                  };
                  db.child(`${user.uid}/messages/${event["co-host-0"]}`).push(
                    message
                  );
                  db.child(`${event["co-host-0"]}/messages/${user.uid}`).push(
                    message
                  );
                  navigation.navigate("Messages", {
                    screen: "Chat",
                    params: {
                      OtherUserInfo: {
                        _id: event["co-host-0"],
                        email: hostEmail,
                        username: hostUsername,
                      },
                    },
                  });
                }}
              />
            ) : (
              <CustomButton text="Yes" small secondary disabled />
            )}
          </View>
          <View
            style={{
              marginLeft: widthPercentageToDP(-28),
              marginTop: heightPercentageToDP("3"),
            }}
          >
            {!noToRSVP ? (
              <CustomButton
                text="No"
                small
                secondary
                outline
                onPress={() => {
                  setNoToRSVP(true);
                  console.log("host email =", hostEmail);
                  console.log("host username =", hostUsername);
                  const message = {
                    text:
                      "RSVP: No I will not be attending" + event.description,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    user: {
                      _id: user.uid,
                      email: user.email,
                    },
                    userTo: {
                      _id: event["co-host-0"],
                      email: `${hostEmail}`,
                      username: `${hostUsername}`,
                    },
                  };
                  db.child(`${user.uid}/messages/${event["co-host-0"]}`).push(
                    message
                  );
                  db.child(`${event["co-host-0"]}/messages/${user.uid}`).push(
                    message
                  );
                  navigation.navigate("Messages", {
                    screen: "Chat",
                    params: {
                      OtherUserInfo: {
                        _id: event["co-host-0"],
                        email: hostEmail,
                        username: hostUsername,
                      },
                    },
                  });
                }}
              />
            ) : (
              <CustomButton text="No" small secondary disabled />
            )}
          </View>

          {/* TODO MESSSAGE HOST TAKE HOST UID AND MESSAGE */}
          {/* navigation.navigate("Invest", { screen: "InvestScreen" }) */}
          {/* navigation.navigate("**stack_Name**", {
 screen:"screen_name_connect_with_**stack_name**",
 params:{
 user:"anything_string_or_object"
}
}) */}
        </View>

        {/* <TouchableOpacity>
          <View
            style={{
              height: heightPercentageToDP("10"),
              width: widthPercentageToDP("20"),
              resizeMode: "contain",
              marginTop: heightPercentageToDP("-8"),
              left: heightPercentageToDP("32"),
            }}
          >
            <Text style={[textStyles.bigBold,{ color: colors.primary }]}>Edit</Text>
          <View style={{marginTop: heightPercentageToDP('-3.5'),left:heightPercentageToDP('5')}}>
          <MaterialIcons name="edit" size={32} color="#A6ACE9" />
          </View> 
          </View>
        </TouchableOpacity> */}

        <View
          style={{
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
            width: widthPercentageToDP("100"),
          }}
        />

        {/* <View style={{ 
          height: heightPercentageToDP('10'),
          width :widthPercentageToDP('50'), 
          resizeMode:'contain',
          marginTop: heightPercentageToDP('0'),
          left:heightPercentageToDP('25')}}>
          <Text style={[ { color: colors.darkGrey }]}>{event.startdate}</Text>
          </View> */}
        <View
          style={{
            left: heightPercentageToDP("2"),
            flexDirection: "column",
            textAlign: "center",
            marginTop: heightPercentageToDP("1"),
          }}
        >
          <View
            style={{
              paddingHorizontal: widthPercentageToDP("3"),
              marginBottom: heightPercentageToDP("1"),
              textAlign: "center",
              marginTop: heightPercentageToDP("1"),
            }}
          >
            <Text
              style={[
                textStyles.normalRegular,
                {
                  left: widthPercentageToDP("0"),
                  marginRight: widthPercentageToDP("2"),
                  marginTop: heightPercentageToDP("0"),
                  color: colors.darkGrey,
                },
              ]}
            >
              {event.description}
            </Text>
          </View>

          <View>
            <TouchableOpacity
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://www.google.com/maps/place/" + event.location
                )
              }
            >
              <Entypo name="location-pin" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://www.google.com/maps/place/" + event.location
                )
              }
            >
              <Text
                style={[
                  textStyles.normalBold,
                  {
                    left: widthPercentageToDP("10"),
                    marginTop: heightPercentageToDP("-1.8"),
                  },
                ]}
              >
                {event.location}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  "https://www.google.com/maps/place/" +
                    JSON.stringify(event.location)
                )
              }
            >
              <LocationNearMeIcon
                style={{
                  left: heightPercentageToDP("40"),
                  marginTop: heightPercentageToDP("-3"),
                }}
                size={heightPercentageToDP(3)}
                color={colors.darkGrey}
              />
            </TouchableOpacity>
          </View>

          <Spacer height={1} />

          <View>
            <CalendarIcon
              style={{ left: heightPercentageToDP("0.5") }}
              size={heightPercentageToDP(2.8)}
              color="black"
            />
            <Text
              style={[
                textStyles.normalBold,
                {
                  marginTop: heightPercentageToDP("-2.5"),
                  left: heightPercentageToDP("5"),
                },
              ]}
            >
              {event.startdate}
            </Text>
            <Text
              style={[
                textStyles.normalBold,
                {
                  left: heightPercentageToDP("5"),
                  marginTop: heightPercentageToDP("0"),
                },
              ]}
            >
              {event.enddate}
            </Text>
          </View>

          <Spacer height={1} />

          <View>
            <View
              style={{ left: heightPercentageToDP("0.5") }}
              size={heightPercentageToDP(2.8)}
            >
              <MaterialCommunityIcons name="hanger" size={32} color="black" />
            </View>
            {event["radio-buttons"] === "casual-and-comfortable" ? (
              <View>
                <Text
                  style={[
                    textStyles.normalBold,
                    {
                      left: heightPercentageToDP("5"),
                      marginTop: heightPercentageToDP("-2.6"),
                    },
                  ]}
                >
                  Casual and Comfortable
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={[
                    textStyles.normalBold,
                    {
                      left: heightPercentageToDP("5"),
                      marginTop: heightPercentageToDP("-2.6"),
                    },
                  ]}
                >
                  {event["radio-buttons"]}
                </Text>
              </View>
            )}
            <View
              style={{
                left: heightPercentageToDP("40"),
                marginTop: heightPercentageToDP("1"),
              }}
              size={heightPercentageToDP(3)}
            ></View>
          </View>

          <View style={{ left: heightPercentageToDP("0.3") }}>
            <MaterialCommunityIcons
              name="frequently-asked-questions"
              size={32}
              color="black"
            />
            <Text
              style={[
                textStyles.normalBold,
                {
                  left: heightPercentageToDP("5"),
                  marginTop: heightPercentageToDP("-2.6"),
                },
              ]}
            >
              FAQ'S
            </Text>

            <View>
              <Text
                style={[
                  textStyles.normalBold,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                Guests Per Invite
              </Text>
              <Text
                style={[
                  textStyles.normalRegular,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                {event["total-invited"]}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  textStyles.normalBold,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                Guests Should Bring
              </Text>
              <Text
                style={[
                  textStyles.normalRegular,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                {event.faqguests}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  textStyles.normalBold,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                Where To Park
              </Text>
              <Text
                style={[
                  textStyles.normalRegular,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                {event.faqpeoplepark}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  textStyles.normalBold,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                Secret Code
              </Text>
              <Text
                style={[
                  textStyles.normalRegular,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                {event.faqsecretcode}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  textStyles.normalBold,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                Co-Host
              </Text>
              <Text
                style={[
                  textStyles.normalRegular,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                {event["co-host-1"]}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  textStyles.normalBold,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                Can Kids Come?
              </Text>
              <Text
                style={[
                  textStyles.normalRegular,
                  {
                    marginTop: heightPercentageToDP(".5"),
                    left: heightPercentageToDP("5"),
                  },
                ]}
              >
                {event["request-num-of-kids"] === true ? "Yes" : "No"}
              </Text>
            </View>

            <View
              style={{
                left: heightPercentageToDP("40"),
                marginTop: heightPercentageToDP("-3"),
              }}
              size={heightPercentageToDP(3)}
            ></View>
          </View>
        </View>
        {/* <Spacer height={3} /> */}
        {/* 
          <View >
          <Text style={[textStyles.bigSemiBold,{left:heightPercentageToDP('2')}]}>
           Photos
          </Text>
          <TouchableOpacity >
            <Text style={[textStyles.bigRegular, { color: colors.darkGrey }, {left:heightPercentageToDP('35'),marginTop: heightPercentageToDP('-3')}]}>See all</Text>
          </TouchableOpacity>
          </View> */}

        {/* <View style={{left:heightPercentageToDP('2')}}>
          <Image
            style={styles.image}
            source={MyPhoto}
            resizeMode={"cover"} />
          </View> */}

        {/* <Spacer height={5} /> */}

        {/* <View >
          <Text style={[textStyles.bigSemiBold,{left:heightPercentageToDP('2')}]}>
           Guest List ( )
          </Text>
          <TouchableOpacity >
            <Text style={[textStyles.bigRegular, { color: colors.primary }, {left:heightPercentageToDP('28'),marginTop: heightPercentageToDP('-3')}]}>See all invites</Text>
          </TouchableOpacity>
        </View> */}

        {/* <View style={{left:heightPercentageToDP('2')}}>
          <Image
            style={styles.image}
            source={MyPhoto}
            resizeMode={"cover"} />
           <Text>{event['co-host-1']}</Text> 
          </View> */}

        {/* <Spacer height={5} /> */}

        {/* <View>
          <Text style={[textStyles.bigSemiBold,{left:heightPercentageToDP('2')}]}>
           Send message to all guests
          </Text>
          <View style={{left:heightPercentageToDP('1'),marginTop: heightPercentageToDP('-1')}}>
        <CustomTextInput
          control={control}
          errors={errors}
          input={{
            name: 'send-messages',
            label: '',
            placeholder: 'Message them....',
            defaultValue: '',
          }}
          rules={{ multiline: true, numberOfLines: 5 }}  
        />
        </View> */}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: widthPercentageToDP(0),
        }}
      >
        <View style={{ marginLeft: widthPercentageToDP(10) }}>
          <TouchableOpacity
            style={{
              alignContent: "center",
              marginLeft: widthPercentageToDP(10),
            }}
            onPress={() => {
              navigation.navigate("Messages", {
                screen: "Chat",
                params: {
                  OtherUserInfo: {
                    _id: event["co-host-0"],
                    email: hostEmail,
                    username: hostUsername,
                  },
                },
              });
            }}
          >
            <Image
              source={newMessageBtn}
              style={{
                height: heightPercentageToDP("20"),
                width: widthPercentageToDP("90"),
                marginTop: heightPercentageToDP("5"),
                resizeMode: "contain",
                left: heightPercentageToDP("-7"),
              }}
            />
            {/* <CustomButton text="Message Host" narrow primary /> */}
          </TouchableOpacity>
        </View>
      </View>

      <Spacer height={2} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  textConatiner: {
    width: widthPercentageToDP(60),
    left: heightPercentageToDP(2),
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textendConatiner: {
    width: widthPercentageToDP(95),
    marginTop: heightPercentageToDP("-2.6"),
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  image: {
    width: 65,
    height: 65,
    borderWidth: 0,
    borderRadius: 75,
    justifyContent: "space-around",
  },
});

export default MyEvent;
