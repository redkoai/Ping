import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, View, ScrollView, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from "react-native";
import { colors, textStyles } from "ping/src/styles/styles";
import { widthPercentageToDP, heightPercentageToDP } from "ping/util/scaler";
import React, { useContext, useEffect, useState } from "react";
import tempprogline from "ping/assets/createnew/templates/tempprogline.png";
// import temp1 from 'ping/assets/createnew/templates/templates1.png';
import inv1 from "ping/assets/invites/1.png";
import inv2 from "ping/assets/invites/2.png";
import inv3 from "ping/assets/invites/3.png";
import inv4 from "ping/assets/invites/4.png";
import inv5 from "ping/assets/invites/5.png";
import inv6 from "ping/assets/invites/6.png";
import inv7 from "ping/assets/invites/7.png";
import inv8 from "ping/assets/invites/8.png";
import inv9 from "ping/assets/invites/9.png";
import inv10 from "ping/assets/invites/10.png";
import inv11 from "ping/assets/invites/11.png";
import inv12 from "ping/assets/invites/12.png";
import inv13 from "ping/assets/invites/13.png";
import inv14 from "ping/assets/invites/14.png";
import inv15 from "ping/assets/invites/15.png";
import NewInviteContext from "ping/src/contexts/NewInviteContext";
import CreatePicker from "ping/src/components/inputs/CreatePicker";
import * as ImagePicker from 'expo-image-picker';
import upload from 'ping/assets/createnew/templates/picker.png';
import firebase from "firebase";

function createnewtemplates({}) {
  const navigation = useNavigation();
  const { bgImage, setSelectedImage } = useContext(NewInviteContext);

  const [image, setImage] = useState(null);
      useEffect(() => {
      async () => {
        if (Platform.OS !== 'web'){
          const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect: [2,2],
        quality: 1,
    });
    console.log(result);
    if (!result.cancelled){
        setImage(result.uri);
// let bucketName="images"
// let file =result.uri
//   firebase.storage()
//   .ref(`${bucketName}/${file}`)
//   //eventID as the path name to be able to access 
//   .put(file)
//   .then((snapshot) => {
//     //You can check the image is now uploaded in the storage bucket
//     console.log(`image has been successfully uploaded.`);
//   })
//   .catch((e) => console.log('uploading image error => ', e));
//     }
};
  }
  // const [img,setImg] = useState([{idnum:1}]);

  const handlePress = (imagePath) => {
    setSelectedImage(imagePath);
    navigation.navigate("Details", { imagePath: image });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground source={emptyHome} style={styles.homeEmpty}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginTop: widthPercentageToDP(3),
            marginLeft: widthPercentageToDP(5),
          }}
        >
          <Image
            source={tempprogline}
            style={{
              height: heightPercentageToDP("7"),
              width: widthPercentageToDP("88"),
              resizeMode: "contain",
              marginTop: heightPercentageToDP("0"),
            }}
          />
<View style={{flexDirection:'row'}}>

        <TouchableOpacity onPress={pickImage}>
                <Image source={upload} style={{marginBottom:'2%', marginLeft:widthPercentageToDP('-27'), width :widthPercentageToDP('90'), height :heightPercentageToDP('20'), resizeMode:'contain'}} />
                
                 {/* <Text  style={[textStyles.normalSemiBold, { marginTop:'2%',color: colors.primary }]}> Pick Your Profile Image</Text> */}
            </TouchableOpacity>
            {image && <Image source={{uri: image}} style={{marginTop:'2%',marginLeft:widthPercentageToDP('-20'), height: heightPercentageToDP('15'), width: widthPercentageToDP('47')}} />}
            </View>
          {/* <CreatePicker /> */}
          {/* <TouchableOpacity
            onPress={() => {
              //navigation.navigate('SecretCode');
              navigation.navigate('Details');
            }}
          >
            <Image
              source={temp1}
              style={{
                height: heightPercentageToDP('25'),
                width: widthPercentageToDP('45'),
                marginTop: heightPercentageToDP('-0.5'),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity> */}

          <Text
            style={[
              textStyles.bigBold,
              {
                left: widthPercentageToDP("3"),
                marginTop: heightPercentageToDP("2"),
              },
            ]}
          >
            Brunch
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: widthPercentageToDP(3),
              marginLeft: widthPercentageToDP(0),
            }}
          >
            <ScrollView horizontal={true}>
              <TouchableOpacity
                onPress={() => {
                  //setImg(inv1)
                  handlePress("1.png");
                }}
              >
                <Image
                  source={inv1}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePress("2.png");
                  //navigation.navigate('Details');
                }}
              >
                <Image
                  source={inv2}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  handlePress("3.png");
                }}
              >
                <Image
                  source={inv3}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
          <Text
            style={[
              textStyles.bigBold,
              {
                left: widthPercentageToDP("3"),
                marginTop: heightPercentageToDP("0"),
              },
            ]}
          >
            Party
          </Text>
          <ScrollView horizontal={true}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: widthPercentageToDP(3),
                marginLeft: widthPercentageToDP(3),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  handlePress(inv4);
                }}
              >
                <Image
                  source={inv4}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  handlePress(inv5);
                }}
              >
                <Image
                  source={inv5}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Text
            style={[
              textStyles.bigBold,
              {
                left: widthPercentageToDP("3"),
                marginTop: heightPercentageToDP("0"),
              },
            ]}
          >
            Birthday
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: widthPercentageToDP(3),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handlePress(inv6);
              }}
            >
              <Image
                source={inv6}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handlePress(inv7);
              }}
            >
              <Image
                source={inv7}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              textStyles.bigBold,
              {
                left: widthPercentageToDP("3"),
                marginTop: heightPercentageToDP("0"),
              },
            ]}
          >
            Holidays
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: widthPercentageToDP(3),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handlePress(inv8);
              }}
            >
              <Image
                source={inv8}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handlePress(inv10);
              }}
            >
              <Image
                source={inv10}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: widthPercentageToDP(3),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handlePress(inv11);
              }}
            >
              <Image
                source={inv11}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-8.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handlePress(inv12);
              }}
            >
              <Image
                source={inv12}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-8.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: widthPercentageToDP(3),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handlePress(inv13);
              }}
            >
              <Image
                source={inv13}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-8.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handlePress(inv14);
              }}
            >
              <Image
                source={inv14}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-8.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default createnewtemplates;
