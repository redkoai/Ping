import React, { useState, useContext, useEffect } from "react";
import NewInviteContext from "ping/src/contexts/NewInviteContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { DRESSCODE_SCHEMA } from "ping/src/schema/dresscodeSchema";
import { Image, StatusBar, View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { colors } from "ping/src/styles/styles";
import Spacer from "ping/src/components/Spacer";
import { widthPercentageToDP, heightPercentageToDP } from "ping/util/scaler";
import RadioButton from "rn-radio-button";
import deprogline from "ping/assets/createnew/dresscode/dresscodeprogline.png";
import ImagePicker from "ping/src/components/inputs/ImagePicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "ping/src/components/inputs/CustomTextInput";
import CustomButton from "ping/src/components/inputs/CustomButton";
import CustomInputLabel from "ping/src/components/inputs/CustomInputLabel";
import firebase from "firebase"
function Dresscode({ route, navigation }) {
  const { formData, updateFormData } = useContext(NewInviteContext);

  const { control, errors, setValue, reset, handleSubmit } = useForm({
    //resolver: yupResolver(DRESSCODE_SCHEMA),
  });
  const onSubmit = (data) => {

if(route.params.fbImage!=null){

  let storeRef = firebase.storage().ref();
  storeRef
    .child(`images/${route.params.eventID}`)
    .getDownloadURL()
    .then((url) => {
      console.log(url);
      data.fbImage = url
      data.imagePath = "null"

      updateFormData(data)
      navigation.navigate("FAQ", {eventID:route.params.eventID,fbImage:route.params.fbImage, imagePath: route.params.imagePath });
    
    });
}else{
    data.imagePath=route.params.imagePath
    updateFormData(data);
    navigation.navigate("FAQ", {eventID:route.params.eventID,fbImage:route.params.fbImage, imagePath: route.params.imagePath });
    //reset();
    //console.log("After Submit Dresscode---", formData)
  };
  }
  const listData = [
    { label: "Casual and Comfortable", value: "casual-and-comfortable" },
    { label: "Business casual", value: "business-casual" },
    { label: "Semi-formal", value: "semi-formal" },
    { label: "Formal/Black tie", value: "formal-black-tie" },
    { label: "custom", value: "custom" },
  ];

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
          marginTop: widthPercentageToDP(3),
        }}
      >
        <Image
          source={deprogline}
          style={{
            height: heightPercentageToDP("10"),
            width: widthPercentageToDP("85"),
            resizeMode: "contain",
            marginTop: heightPercentageToDP("-2.5"),
            left: heightPercentageToDP("2"),
          }}
        />
        <View style={{ position: "relative", left: 10 }}>
          <Controller
            control={control}
            name="radio-buttons"
            render={({ onChange }) => (
              <RadioButton
                outerWidth={30}
                innerWidth={20}
                borderWidth={1.5}
                data={listData}
                color={"black"}
                onPress={onChange}
                wrapperStyle={{ padding: 4 }}
                horizontal={false}
              />
            )}
          />
        </View>
        <View
          style={{
            height: heightPercentageToDP("12"),
            width: widthPercentageToDP("95"),
            marginTop: heightPercentageToDP("1"),
            right: heightPercentageToDP("-2"),
            resizeMode: "contain",
          }}
        >
          <CustomTextInput
            input={{
              name: "dresscode",
              label: "",
              placeholder:
                "Do you have specific theme or color in mind? Don't make your guests guess!",
              defaultValue: "",
            }}
            control={control}
            rules={{ multiline: true, numberOfLines: 5 }}
          />
        </View>

        {/* <CustomInputLabel text="Share some Inspo" optional />
        <Spacer height={1} />
        <ImagePicker imagePath={route.params.imagePath} /> */}

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
    </KeyboardAwareScrollView>
  );
}

export default Dresscode;
