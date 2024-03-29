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
  // console.log("user = ", user);

  // const [eventID, setEventID] = useState()

  //////////////////////////
  //  Firebase query
  //////////////////////////
  const db = firebase.database().ref("users");

  const [myInvites, setMyInvites] = useState({});

  useEffect(() => {
    db.child(`${user.uid}/Events/`).on("child_added", function (snapshot) {
      // if(snapshot.val().imagePath ===undefined || snapshot.val().imagePath===null){
      //   setIsLocalImage(false)
      // }
      // if(snapshot.val().imagePath !=undefined && snapshot.val().imagePath!=null){
      //   setIsLocalImage(true)
      // }
    })();
  }, []);

  const [myEvents, setMyEvents] = useState({});
  const [isLocalImage, setIsLocalImage] = useState(false);
  const eventQuery = () => {
    const myEvents_obj = {};
    const myInvites_obj = {};
    db.child(`${user.uid}/Events/`).on("child_added", function (snapshot) {
      // setEventID(snapshot.key)
      // console.log("snapshot = ", snapshot);
      // console.log("snapshot event = ", snapshot)
      // console.log("snapshot event cohost", snapshot.val()["co-host-0"])
      // console.log("user uid =", user.uid)

      
      if (snapshot.val()["co-host-0"] == user.uid) {
        // console.log("event snapshot =", snapshot);
        let arr = [];
        arr[2] = true;
        if (snapshot.val().imagePath == "null") {
          arr[0] = snapshot.val().event;
          arr[1] = snapshot.val().fbImage;
          arr[2] = true;

          myEvents_obj[snapshot.key] = arr;
        } else {
          // snapshot.val().imagePath !=undefined &&

          arr[0] = snapshot.val().event;
          arr[1] = snapshot.val().imagePath;
          arr[2] = false;
          myEvents_obj[snapshot.key] = arr;
        }
      } else {

        // console.log(snapshot.val(), "sonic");

        let arr = [];
        // console.log(snapshot.key, "greenBacon");

        // console.log(snapshot.val()[Object.keys(snapshot.val())[0]], "bolt");

        if (
          snapshot.val().imagePath == "null"
        ) {
          // console.log("awesome");
          arr[0] = snapshot.val().event;
          arr[1] = snapshot.val().fbImage;
          arr[2] = true;
          myInvites_obj[snapshot.key] = arr;

          
        } else {
          // console.log(snapshot.val(), "arrayvalue");
          arr[0] = snapshot.val().event;
          arr[1] = snapshot.val().imagePath;
          arr[2] = false;

          myInvites_obj[snapshot.key] = arr;
        }

        // if (
        //   snapshot.val()[Object.keys(snapshot.val())[0]].imagePath == "null"
        // ) {
        //   // console.log("awesome");
        //   arr[0] = snapshot.val()[Object.keys(snapshot.val())[0]].event;
        //   arr[1] = snapshot.val()[Object.keys(snapshot.val())[0]].fbImage;
        //   arr[2] = true;
        //   myInvites_obj[snapshot.key] = arr;

          
        // } else {
        //   // console.log(snapshot.val(), "arrayvalue");
        //   arr[0] = snapshot.val()[Object.keys(snapshot.val())[0]].event;
        //   arr[1] = snapshot.val()[Object.keys(snapshot.val())[0]].imagePath;
        //   arr[2] = false;

        //   myInvites_obj[snapshot.key] = arr;
        // }

        // myInvites_obj[snapshot.key] = snapshot.val().arr;
        // console.log("my invites = ", myInvites_obj);
      }
    });

    setMyInvites(myInvites_obj);
    // console.log("MyInvites =", myInvites)
    setMyEvents(myEvents_obj);
  };



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
    // console.log(" invites = ", myInvites);
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

  const EventLoop = Object.keys(myEvents).map((key) => {
    const eventID = key;
    // console.log("strrawberryPie ", eventID);

    return (
      <TouchableOpacity
        onPress={() => {
          // console.log("eventID =  ", eventID);
          navigation.navigate("Events", {
            screen: "MyEvent",
            params: { eventID: eventID},
          });
        }}
        style={{
          marginRight: 0,
          marginTop: 0,
          padding: 0,
        }}
      >
        <View
          style={{
            marginRight: widthPercentageToDP(0),

            padding: widthPercentageToDP(1),
          }}
        >
          <CustomButtonCopyLong
            text={myEvents[key][0]}
            backgroundImage={myEvents[key][1]}
            buttonSecondary
            isLocalImage={myEvents[key][2]}
            shadow
            style={{ fontSize: actuatedNormalize(11) }}
            onPress={() => {
              navigation.navigate("Events", {
                screen: "MyEvent",
                params: { eventID: eventID},
              });
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
    const inviteID = key;
    // console.log(inviteID, 'invitedidddd')

    // console.log(key, "strawberryWaffles");

    return (
      <View
        style={{
          marginRight: widthPercentageToDP(1),
          // marginTop: 30,

          padding: widthPercentageToDP(1),
        }}
      >
        <CustomButtonCopyLong
          text={myInvites[key][0]}
          buttonSecondary
          backgroundImage={myInvites[key][1]}
          isLocalImage={myInvites[key][2]}
          shadow
          isLocalImage={myInvites[key][2]}
          style={{ fontSize: actuatedNormalize(11) }}
          onPress={() => {
            navigation.navigate("Events", {
              screen: "MyInvite",
              params: { inviteID: inviteID},
            });
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
                justifyContent: "flex-start",
                marginTop: widthPercentageToDP(0),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: widthPercentageToDP(0),
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
                  marginTop: widthPercentageToDP(0),
                  marginBottom: widthPercentageToDP(0),
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

                  marginBottom: heightPercentageToDP("1"),
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

              {/* <TouchableOpacity  style={{left: heightPercentageToDP('2.5')}} onPress={() => { 
    navigation.navigate('Account', {screen: " Accountsone"})

}}>      
        <CustomButton
          text="Add friends"
          shadow
        />
        </TouchableOpacity> */}
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
                  marginTop: widthPercentageToDP(0),
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
