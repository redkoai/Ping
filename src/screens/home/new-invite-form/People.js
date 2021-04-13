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

function People({ navigation }) {
  const { formData, updateFormData } = useContext(NewInviteContext);

  const { control, errors, reset, setValue, handleSubmit } = useForm({
    //resolver: yupResolver(RSVP_SCHEMA),
  });
  const onSubmit = (data) => {
    //updateFormData(data);
    navigation.navigate("EventInvited");
    reset();
  };

  ///////////////////////////////////////////////////////////
  // Adding firebase query to check if email searched exists
  ///////////////////////////////////////////////////////////
  const db = firebase.database().ref("users");
  const [search, setSearch] = useState([]);

  const sendData = () => {
    console.log(foundUser);
    console.log(formData);
    db.child(foundUser.uid);
    db.child(`${foundUser.uid}/Events/`).push(formData);
    console.log("Data pushed");
    // db.child(user.user.uid).set({"email" : user.user.email})
  };

  const [foundUser, setFoundUser] = useState({
    email: null,
    uid: null,
  });

  const updateSearch = (search) => {
    setSearch(search);
  };

  const searchUser = (email) => {
    let foundUser = { email: null, uid: null, found: false };
    db.ref.orderByKey().on("child_added", function (snapshot) {
      if (snapshot.val().email == email) {
        console.log("found user", snapshot.val());
        foundUser = {
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
    let foundUser = searchUser(search);
    console.log("foundUser (use effect) = ", foundUser);
    if (foundUser.found) {
      setFoundUser({ email: foundUser.email, uid: foundUser.uid });
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
          <View style={styles.container}>
            <Text>
              {foundUser.email}
              <Button onPress={sendData}>Send Invite</Button>
            </Text>
          </View>
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

        <Spacer height={45} />

        <View
          style={{ alignSelf: "flex-end", left: heightPercentageToDP("-1") }}
        >
          <CustomButton
            text="next"
            onPress={handleSubmit(onSubmit)}
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
