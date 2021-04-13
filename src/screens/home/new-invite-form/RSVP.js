import React, { useContext, useEffect, useState, useCallback } from "react";
import AuthContext from "ping/src/contexts/AuthContext";
import NewInviteContext from "ping/src/contexts/NewInviteContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { RSVP_SCHEMA } from "ping/src/schema/rsvpSchema";
import { Image, StyleSheet, StatusBar, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spacer from "ping/src/components/Spacer";
import { colors } from "ping/src/styles/styles";
import { widthPercentageToDP, heightPercentageToDP } from "ping/util/scaler";
import { useForm } from "react-hook-form";
import CustomButton from "ping/src/components/inputs/CustomButton";
import CustomText from "ping/src/components/CustomText";
import CustomNumberInput from "ping/src/components/inputs/CustomNumberInput";
import CustomSwitch from "ping/src/components/inputs/CustomSwitch";
import rsvpprogline from "ping/assets/createnew/rsvp/rsvpprogline.png";
import SignInModal from "ping/src/components/inputs/SignInModal";

import firebase from "firebase";
import "firebase/firestore";

function RSVP({ navigation }) {
  const { user } = useContext(AuthContext);
  const { formData, updateFormData } = useContext(NewInviteContext);
  const [isSignInVisible, setSignInVisibility] = useState(false);

  //const [saveData,setSaveData] = useState(false);
  const [state, setState] = useState({});
  // const UserInfo = { "uid": user.uid, "email": user.email }

  const rand = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  const { control, errors, reset, setValue, handleSubmit, formState } = useForm(
    {
      resolver: yupResolver(RSVP_SCHEMA),
    }
  );
  const writeUserData = (formData) => {
    firebase
      .database()
      .ref("InviteForms/")
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
  };
  const fetchdata = () => {
    firebase
      .database()
      .ref("InviteForms/")
      .once("value")
      .then(function (snapshot) {
        const exists = snapshot.val() !== null;
        if (exists) data = snapshot.val();
        console.log("fetched data:", data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("RSVPData:", formData);
  }, [formData]);

  useEffect(() => {
    formState.isSubmitSuccessful && !user && setSignInVisibility(true);
    formState.isSubmitSuccessful && user && writeUserData(formData);
  }, [formState.isSubmitSuccessful]);

  const onSubmit = (data) => {
    const newData = data;
    if (data[Object.keys(data)[0]] === undefined) {
      data["collect-rsvp"] = null;
    }
    if (data[Object.keys(data)[1]] === undefined) {
      data["request-num-of-kids"] = null;
    }
    if (data[Object.keys(data)[3]] === undefined) {
      data["show-guest-list"] = null;
    }
    if (data[Object.keys(data)[2]] === undefined) {
      data["total-invited"] = null;
    }

    updateFormData(data);
    // navigation.navigate('Signinpopup');
    navigation.navigate("People");
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

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Collect RSVPs" header />
            <CustomText
              text="Guests will be able to to let you know if they're attending or not"
              header={false}
            />
          </View>
          <CustomSwitch
            control={control}
            errors={errors}
            input={{ name: "collect-rsvp" }}
          />
        </View>

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Request number of kids attending" header />
            <CustomText
              text="Get head count of both adults and kids attending"
              header={false}
            />
          </View>
          <CustomSwitch
            control={control}
            errors={errors}
            input={{ name: "request-num-of-kids" }}
          />
        </View>

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Total invited per invitation" header />
            <CustomText
              text="This includes the person that receives the invite"
              header={false}
            />
          </View>
          <CustomNumberInput
            control={control}
            errors={errors}
            input={{ name: "total-invited" }}
          />
        </View>

        <View style={styles.wrapperContainer}>
          <View style={styles.textConatiner}>
            <CustomText text="Show guest list" header />
            <CustomText
              text="Names of attending guests will be displayed on the invite"
              header={false}
            />
          </View>
          <CustomSwitch
            control={control}
            errors={errors}
            input={{ name: "show-guest-list" }}
          />
        </View>

        <Spacer height={5} />
        <View style={{ alignSelf: "flex-end" }}>
          <CustomButton
            text="next"
            onPress={handleSubmit(onSubmit)}
            narrow
            primary
          />
        </View>

        <Spacer height={2} />
      </View>
      <SignInModal
        isVisible={isSignInVisible}
        onCancel={() => setSignInVisibility(false)}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    width: widthPercentageToDP(85),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: widthPercentageToDP(7),
  },
  textConatiner: {
    width: widthPercentageToDP(60),
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default RSVP;
