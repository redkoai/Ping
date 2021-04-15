import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
// import imageupload from "../assets/upload.png"
import { widthPercentageToDP, heightPercentageToDP } from "ping/util/scaler";
import upload from "ping/assets/createnew/dresscode/upload.png";
//import ImagePicker from "react-native-image-crop-picker";
const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY,
      Permissions.CAMERA
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    console.log("pressed");
    // const hasPermission = await verifyPermissions();
    // if (!hasPermission) {
    //   return;
    // }
    // const image = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [16, 9],
    //   quality: 1,
    // });
    // setPickedImage(image.uri);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })
      .then()
      .catch((e) => console.log(e));
    console.log(result);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <TouchableOpacity onPress={takeImageHandler}>
        {/* <Button
        title="Take Image"
        onPress={takeImageHandler}
      /> */}
        <Image
          source={upload}
          style={{
            height: heightPercentageToDP("17"),
            width: widthPercentageToDP("95"),
            marginTop: heightPercentageToDP(2),
            left: heightPercentageToDP("-4.5"),
            resizeMode: "contain",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
