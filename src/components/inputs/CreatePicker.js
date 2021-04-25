import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// import imageupload from "../assets/upload.png"
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import upload from 'ping/assets/createnew/templates/templates1.png';

const CreatePicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.MEDIA_LIBRARY, Permissions.CAMERA);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }],
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    console.log('pressed');
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    setPickedImage(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
            <TouchableOpacity onPress={takeImageHandler}>
        {/* <Button
        title="Take Image"
        onPress={takeImageHandler}
      /> */}
        <Image
          source={upload}
          style={{
            height: heightPercentageToDP('23'),
            width: widthPercentageToDP('95'),
            marginTop: heightPercentageToDP(2),
            marginBottom: heightPercentageToDP(2),
            left: heightPercentageToDP('-4'),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
      {/* <View style={styles.imagePreview}> */}
        
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CreatePicker;
