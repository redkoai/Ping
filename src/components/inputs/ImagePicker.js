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
import firebase from "firebase";
// import imageupload from "../assets/upload.png"
import { widthPercentageToDP, heightPercentageToDP } from "ping/util/scaler";
import upload from "ping/assets/createnew/dresscode/upload.png";
//import ImagePicker from "react-native-image-crop-picker";
const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const [photo, setPhoto] = useState("");
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
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    // const image = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [16, 9],
    //   quality: 1,
    // });
    // setPickedImage(image.uri);

    //<----PHOT UPLOAD NOT WORKING ----->x
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })
      .then()
      .catch((e) => console.log(e));

    let bucketName = "images";
    let file =
      "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg";
    let storageRef = firebase.storage().ref(`${bucketName}/${file}`);
    //putFile
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      let downloadURL = uploadTask.snapshot.downloadURL;
    });
    console.log(result);
  };

  const showImage = () => {
    let file =
      "https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg";
    let storeRef = firebase.storage().ref();
    //let spaceRef = storeRef.child('images/'+"Name of File.name")
    let spaceRef = storeRef.child("images/" + file);
    storeRef
      .child("images/" + file)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setPhoto(url);
      });
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
        {photo != "" && (
          <Image
            source={{ uri: photo }}
            style={{
              height: heightPercentageToDP("17"),
              width: widthPercentageToDP("95"),
              marginTop: heightPercentageToDP(2),
              left: heightPercentageToDP("-4.5"),
              resizeMode: "contain",
            }}
          />
        )}

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
      {/* <TouchableOpacity onPress={showImage}>
        {/* <Button
        title="Take Image"
        onPress={takeImageHandler}
      /> */}
      {/* <Image
          source={upload}
          style={{
            height: heightPercentageToDP("17"),
            width: widthPercentageToDP("95"),
            marginTop: heightPercentageToDP(2),
            left: heightPercentageToDP("-4.5"),
            resizeMode: "contain",
          }}
        />
      </TouchableOpacity> */}
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
