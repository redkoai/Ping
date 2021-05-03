import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View, ScrollView, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from "react-native";
import { widthPercentageToDP, heightPercentageToDP } from "ping/util/scaler";
import React, { useEffect, useState, useContext } from "react";
import createNewEventBtn from "ping/assets/NavBarAssets/createNewEventBtn.png";
import addFriendsBtn from "ping/assets/NavBarAssets/addFriendsBtn.png";
import emptyPic from "ping/assets/homeScreen/homeEmptyPic.png";
import homettl from "ping/assets/homeScreen/homettl.png";
import StoreData from "../../../util/SaveItemInStorage";
import RetrieveData from "../../../util/GetItemInStorage";
import LoginChecker from "../../../util/validators/LoginChecker";
import CustomText from "ping/src/components/CustomText";
import { colors, textStyles } from "ping/src/styles/styles";
import AuthContext from "ping/src/contexts/AuthContext";
import { actuatedNormalize } from "ping/util/fontScaler";
import profileIm from "ping/assets/NavBarAssets/prof.png";
import CustomButton from "ping/src/components/inputs/CustomButton";
import CustomButtonCopyLong from "ping/src/components/inputs/CustomButtonCopyLong";
import giffy from "../../../assets/homeScreen/circle.gif";
import firebase from "firebase";

function HomeScreenEmpty({}) {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const [state, setState] = useState([]);
  const { user } = useContext(AuthContext);
  console.log("user = ", user);

  // const [eventID, setEventID] = useState()

  //////////////////////////
  //  Firebase query
  //////////////////////////
  const db = firebase.database().ref("users");

  const [myInvites, setMyInvites] = useState({});

  const [myEvents, setMyEvents] = useState({});

  const eventQuery = () => {
    const myEvents_obj = {};
    const myInvites_obj = {};
    db.child(`${user.uid}/Events/`).on("child_added", function (snapshot) {
      // setEventID(snapshot.key)
      console.log("snapshot = ", snapshot);
      // console.log("snapshot event = ", snapshot)
      // console.log("snapshot event cohost", snapshot.val()["co-host-0"])
      // console.log("user uid =", user.uid)
      if (snapshot.val()["co-host-0"] == user.uid) {
        console.log("event snapshot =", snapshot);
        myEvents_obj[snapshot.key] = snapshot.val().event;
      } else {
        console.log("invite snapshot =", snapshot);
        myInvites_obj[snapshot.key] = snapshot.val().event;
        console.log("my invites = ", myInvites_obj);
      }
    });
    // console.log("my invites =", myInvites)
    setMyInvites(myInvites_obj);
    setMyEvents(myEvents_obj);
  };

  // const imagePath = `../../../assets/invites/${event.imagePath}`;

  // const getImage = (img) => {
  //   if (event.imagePath === "1.png") {
  //     return {
  //       image: require("../../../assets/invites/1.png"),
  //     };
  //   } else if (event.imagePath === "2.png") {
  //     return { image: require("../../../assets/invites/2.png") };
  //   } else if (event.imagePath === "3.png") {
  //     return { image: require("../../../assets/invites/3.png") };
  //   } else {
  //     return { image: require("../../../assets/invites/3.png") };
  //   }
  // };
  // console.log("invite state =", myInvites)

  // useEffect(() => {
  //     const userUID=UserInfo.uid;
  //     console.log("userid: ", userUID);
  ////hard coded
  //    firebase.database().ref('/InviteForms').child("-MW_XbsJOLm2BCA6nA_K").child("formData").on('value',(snapshot)=>{
  //   //firebase.database().ref('/InviteForms').limitToLast(1).on('value',(snapshot)=>{
  //   let data = snapshot.val() ? snapshot.val() : {};
  //     let todoItems = {...data};
  //     setState(todoItems );
  //     //console.log("useritem: ",Object.keys(todoItems))
  //     })
  //  }, []);

  const pullProfileInfo = () => {
    try {
      db.collection("users").doc(firebase.auth().currentUser.uid).get();
    } catch (e) {
      console.log(e);
    }
  };

  // const _CheckOnboarding = async () => {
  //   await RetrieveData('Onboarding').then( async (val) => {
  //         if(val !== 'DONE') { // if Onboarding
  //           await StoreData("Onboarding", 'PENDING');
  //           //console.log(`Onboarding State 1: ${RetrieveData('Onboarding')}`);
  //           await StoreData("Onboarding", "DONE");
  //           navigation.navigate("Onboarding", { screen: "Onboarding" });

  //         }
  //         else {
  //           console.log(`Onboarding State: ${JSON.stringify(val)}`);
  //         }
  //       }
  //   )
  // }

  useEffect(() => {
    eventQuery();
    console.log(" invites = ", myInvites);
    const unsubscribe = navigation.addListener("focus", () => {
      // Login Checker
      // _CheckOnboarding().then((r) => console.log("Checked on Boarding"));
      LoginChecker().then((results) => {
        console.log("USER IS LOGGED IN : ", results);
        setIsLoggedIn(results);

        if (results) {
          pullProfileInfo();
        } else {
          console.log("User isn't logged in");
        }
      });

      setInterval(() => {
        eventQuery();
      }, 1000);
    });

    return unsubscribe;
  }, [navigation]);
  console.log("invite state length = ", Object.keys(myInvites).length);

  const EventLoop = Object.keys(myEvents).map((key) => {
    const eventID = key;
    console.log("event ID = ", eventID);
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("eventID =  ", eventID);
          navigation.navigate("MyInvite", { eventID: eventID });
        }}
        style={{
          marginRight: 10,
          marginTop: 30,
          padding: 10,
        }}
      >
              <View
        style={{
          marginRight: widthPercentageToDP(1),
          
          padding: widthPercentageToDP(1),
        }}
      >
        <CustomButtonCopyLong
          text={myEvents[key]}
          buttonSecondary
          shadow
          style={{ fontSize: actuatedNormalize(11) }}
          onPress={() => {
            navigation.navigate("MyInvite", { eventID: eventID });
          }}
        />
      </View>
      </TouchableOpacity>
    );
  });

  // const visit = (obj, fn) => {
  //   const values = Object.values(obj)

  //   values.forEach(val => val && typeof val == "object" ? visit(val, fn) : fn(val))
  // }

  // const print = (val) => console.log(val)

  // console.log("visit function =", visit(myInvites, print ))

  // const values = Object.values(myInvites).map((value) => {
  //   console.log(value)
  // })

  // console.log("myinvite values = ", values)

  const InviteLoop = Object.keys(myInvites).map((key) => {
    // console.log("invite loop key = ", key)
    // const obj = JSON.stringify(myInvites[key])
    console.log("invite loop event = ", myInvites[key]);
    const eventID = key;
    return (
      //   <TouchableOpacity onPress={() => {
      //     console.log("eventID = ", eventID)
      //     navigation.navigate('MyInvite', { eventID:eventID })
      // }}
      //   style={{
      //         marginRight: 10,
      //         marginTop: 30,
      //         padding: 10
      //       }}>
      //   <View>
      //     <Text>{myInvites[key]}</Text>
      //   </View>
      //   </TouchableOpacity>
      <View
        style={{
          marginRight: widthPercentageToDP(1),
          // marginTop: 30,
          
          padding: widthPercentageToDP(1),
        }}
      >
              {/* <ImageBackground
            source={getImage().image}
            style={{
              height: heightPercentageToDP("30"),
              width: widthPercentageToDP("100"),
              marginLeft: widthPercentageToDP("0"),
              marginTop: heightPercentageToDP("-1"),
              resizeMode: "stretch",
            }}
          /> */}

        <CustomButtonCopyLong
        
          text={myInvites[key]}
          buttonSecondary
          shadow
          style={{ fontSize: actuatedNormalize(11) }}
          onPress={() => {
            navigation.navigate("MyInvite", { eventID: eventID });
          }}
        />
      </View>
    );
  });

  //   renderItem = (item) => {
  //     return(
  //     <TouchableOpacity onPress={() => {
  //       console.log("eventID = ", eventID)
  //       navigation.navigate('MyInvite', { eventID:eventID })
  //   }}
  //     style={{
  //           marginRight: 10,
  //           marginTop: 30,
  //           padding: 10
  //         }}>
  //           <Card >
  //               <Card.Content >
  //                   <View style={{flexDirection:"row", justifyContent:"center"}}>
  //                     <Text>{item.name}</Text>
  //                   </View>
  //               </Card.Content>
  //           </Card>
  //       </TouchableOpacity>)

  // }

  return (
    <View style={{ flex: 1 }}>
      {myEvents && (
        <ImageBackground source={emptyHome} style={styles.homeEmpty}>
          {isLoggedIn ? (
            <View
              style={{
                flexDirection: "column",
                marginLeft: "3%",
                justifyContent: "space-between",
                marginTop: widthPercentageToDP(-43),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: widthPercentageToDP(45),
                  marginBottom: heightPercentageToDP("1"),
                }}
              >
                <Text
                  style={[
                    textStyles.bigBold,
                    { left: heightPercentageToDP("0") },
                  ]}
                >
                  Home
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Account", { screen: "SignIn" })
                  }
                >
                  <Image
                    source={profileIm}
                    style={{
                      height: heightPercentageToDP("4"),
                      width: widthPercentageToDP("8"),
                      marginBottom: heightPercentageToDP("2"),
                      resizeMode: "contain",
                      left: heightPercentageToDP("-2"),
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: widthPercentageToDP(3),
                }}
              >
                <Text
                  style={[
                    textStyles.bigBold,
                    {
                      left: heightPercentageToDP("0"),
                      marginBottom: heightPercentageToDP("2"),
                    },
                  ]}
                >
                  My Events
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Events", { screen: "Events" });
                  }}
                >
                  <Text
                    style={[
                      textStyles.smallSemiBold,
                      {
                        color: "gray",
                        fontSize: actuatedNormalize(12),
                        left: heightPercentageToDP("-3"),
                      },
                    ]}
                  >
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                style={{
                  flexDirection: "row",
                  marginTop: widthPercentageToDP(3),
                }}
              >
                <TouchableOpacity></TouchableOpacity>
                {Object.keys(myEvents).length == 0 ? (
                  <View>
                    <Text
                      style={[
                        textStyles.smallSemiBold,
                        { color: "gray", fontSize: actuatedNormalize(12) },
                      ]}
                    >
                      You don’t have any events scheduled...
                    </Text>
                    <Image
                      source={giffy}
                      style={{
                        height: heightPercentageToDP("17"),
                        width: widthPercentageToDP("85"),
                        marginBottom: heightPercentageToDP("5"),
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                ) : (
                  <View>
                    <Text>{EventLoop}</Text>
                  </View>
                )}
              </ScrollView>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: widthPercentageToDP(3),
                  marginBottom: heightPercentageToDP("2"),
                }}
              >
                <Text
                  style={[
                    textStyles.bigBold,
                    { left: heightPercentageToDP("0") },
                  ]}
                >
                  My Invites
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Events", { screen: "Events" });
                  }}
                >
                  <Text
                    style={[
                      textStyles.smallSemiBold,
                      {
                        color: "gray",
                        fontSize: actuatedNormalize(12),
                        left: heightPercentageToDP("-3"),
                      },
                    ]}
                  >
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal={true}
                style={{
                  flexDirection: "row",
                  marginTop: widthPercentageToDP(3),
                }}
              >
                <TouchableOpacity></TouchableOpacity>
                {Object.keys(myInvites).length != 0 ? (
                  <View>
                    <Text>{InviteLoop}</Text>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={[
                        textStyles.smallSemiBold,
                        { color: "gray", fontSize: actuatedNormalize(12) },
                      ]}
                    >
                      You don’t have any invites yet.{" "}
                    </Text>
                  </View>
                )}
              </ScrollView>

              <View
                style={{
                  left: heightPercentageToDP("3"),
                  marginBottom: widthPercentageToDP(5),
                }}
              >
               
              </View>

              <TouchableOpacity  style={{left: heightPercentageToDP('2.5')}} onPress={() => { 
    navigation.navigate('Account', {screen: " Accountsone"})

}}>      
        <CustomButton
          text="Add friends"
          shadow
        />
        </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                marginTop: widthPercentageToDP(3),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: widthPercentageToDP(-10),
                  marginBottom: heightPercentageToDP("3"),
                }}
              >
                <Text
                  style={[
                    textStyles.bigBold,
                    { left: heightPercentageToDP("0") },
                  ]}
                >
                  Home
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Account", { screen: "SignUp" })
                  }
                >
                  <Image
                    source={profileIm}
                    style={{
                      height: heightPercentageToDP("4"),
                      width: widthPercentageToDP("8"),
                      marginBottom: heightPercentageToDP("2"),
                      resizeMode: "contain",
                      left: heightPercentageToDP("0"),
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Image
                source={emptyPic}
                style={{
                  height: heightPercentageToDP("40"),
                  width: widthPercentageToDP("85"),
                  marginTop: heightPercentageToDP("0"),
                  resizeMode: "contain",
                }}
              />

              <View
                style={{
                  left: heightPercentageToDP("1"),
                  marginBottom: widthPercentageToDP(5),
                  marginTop: widthPercentageToDP(30),
                }}
              >
                <CustomButton
                  text="Create a new event"
                  primary
                  shadow
                  onPress={() => {
                    navigation.navigate("NewInvite");
                  }}
                />
              </View>

              {/* <TouchableOpacity onPress={() => { 
                            navigation.navigate('NewInvite')
        
                        }}>
                            <Image source={createNewEventBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('5'),marginBottom:heightPercentageToDP('20') }} />
                        </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={() => { 
                           navigation.navigate('SignUp')
                          //navigation.navigate('SecretCode')
                        }}>
                            <Image source={addFriendsBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginBottom: heightPercentageToDP('15'), resizeMode:'contain' , left:heightPercentageToDP('5')}} />
                        </TouchableOpacity> */}
            </View>
          )}
        </ImageBackground>
      )}
    </View>
  );
}

export default HomeScreenEmpty;
