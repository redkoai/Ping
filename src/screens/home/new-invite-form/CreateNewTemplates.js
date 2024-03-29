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
import inv16 from "ping/assets/invites/cards/1.png"
import inv17 from "ping/assets/invites/cards/2.png"
import inv18 from "ping/assets/invites/cards/3.png"
import inv19 from "ping/assets/invites/cards/4.png"
import inv20 from "ping/assets/invites/cards/5.png"
import inv21 from "ping/assets/invites/cards/6.png"
import inv22 from "ping/assets/invites/cards/7.png"
import inv23 from "ping/assets/invites/cards/8.png"
import inv24 from "ping/assets/invites/cards/9.png"
import inv25 from "ping/assets/invites/cards/10.png"
import inv26 from "ping/assets/invites/cards/11.png"
import inv27 from "ping/assets/invites/cards/12.png"
import inv28 from "ping/assets/invites/cards/13.png"
import inv29 from "ping/assets/invites/cards/14.png"
import inv30 from "ping/assets/invites/cards/15.png"
import inv31 from "ping/assets/invites/cards/16.png"
import inv46 from "ping/assets/invites/cards/17.png"
import inv32 from "ping/assets/invites/cards/18.png"
import inv33 from "ping/assets/invites/cards/19.png"
import inv36 from "ping/assets/invites/cards/22.png"
import inv37 from "ping/assets/invites/cards/23.png"
import inv38 from "ping/assets/invites/cards/24.png"
import inv39 from "ping/assets/invites/cards/25.png"
import inv40 from "ping/assets/invites/cards/26.png"
import inv41 from "ping/assets/invites/cards/27.png"
import inv42 from "ping/assets/invites/cards/28.png"
import inv43 from "ping/assets/invites/cards/29.png"
import inv44 from "ping/assets/invites/cards/30.png"


import NewInviteContext from "ping/src/contexts/NewInviteContext";
import CreatePicker from "ping/src/components/inputs/CreatePicker";
import * as ImagePicker from 'expo-image-picker';
import upload from 'ping/assets/createnew/templates/picker.png';
import firebase from "firebase";
import CustomButton from "ping/src/components/inputs/CustomButton";

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
    
    if (!result.cancelled){
        setImage(result.uri);

};
  }
  // const [img,setImg] = useState([{idnum:1}]);

  const handlePress = (imagePath) => {


  console.log(imagePath, "strawberries")
    
    if(imagePath){
      navigation.navigate("Details", { imagePath: imagePath,fbImage:null });
    }else{

    
    navigation.navigate("Details", { fbImage: image,imagePath:null });}
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
            {image && 
            <View style={{flexDirection:'column'}}>
            <Image source={{uri: image}} style={{marginTop:'2%',marginLeft:widthPercentageToDP('-20'), height: heightPercentageToDP('15'), width: widthPercentageToDP('47')}} />
            <View style={{left:widthPercentageToDP('-10')}}>
            <CustomButton
          text="Next"
          shadow
          small
          onPress={()=>handlePress(false)}
          />
            </View>
            </View>}
            </View>


          <Text
            style={[
              textStyles.bigBold,
              {
                left: widthPercentageToDP("3"),
                marginTop: heightPercentageToDP("2"),

              },
            ]}
          >
            Birthdays
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: widthPercentageToDP(3),
              marginLeft: widthPercentageToDP(0),
              marginRight:widthPercentageToDP("2"),
            }}
          >
            <ScrollView horizontal={true}>
              <TouchableOpacity
                onPress={() => {
                  //setImg(inv1)
                  handlePress("cards/2.png");
                }}
              >
                <Image
                  source={inv17}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    marginRight:widthPercentageToDP("2"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                handlePress("12.png");
              }}
            >
              <Image
                source={inv12}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePress("cards/1.png");
                  //navigation.navigate('Details');
                }}
              >
                <Image
                  source={inv16}
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
                    marginTop: heightPercentageToDP("-4.5"),marginRight:widthPercentageToDP("2"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePress("cards/18.png");
                }}
              >
                <Image
                  source={inv32}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginRight:widthPercentageToDP("2"),
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
              marginRight:widthPercentageToDP("2"),
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
                    marginRight:widthPercentageToDP("2"),
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
                    marginRight:widthPercentageToDP("2"),
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
                    marginRight:widthPercentageToDP("2"),
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
            Party & Events
          </Text>
          <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: widthPercentageToDP(3),
              marginRight:widthPercentageToDP("2"),
              marginLeft: widthPercentageToDP(0),
            }}
          >
              <TouchableOpacity
                onPress={() => {
                  handlePress('cards/14.png');
                }}
              >
                <Image
                  source={inv29}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    marginRight:widthPercentageToDP("2"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePress('cards/15.png');
                }}
              >
                <Image
                  source={inv30}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    marginRight:widthPercentageToDP("2"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
              
                onPress={() => {
                  handlePress('cards/17.png');
                }}
              >
                <Image
                  source={inv46}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    marginRight:widthPercentageToDP("2"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePress('cards/30.png');
                }}
              >
                <Image
                  source={inv44}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    marginRight:widthPercentageToDP("2"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePress('cards/22.png');
                }}
              >
                <Image
                  source={inv36}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    marginRight:widthPercentageToDP("2"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  handlePress('4.png');
                }}
              >
                <Image
                  source={inv4}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginTop: heightPercentageToDP("-4.5"),
                    marginRight:widthPercentageToDP("2"),
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePress('5.png');
                }}
              >
                <Image
                  source={inv5}
                  style={{
                    height: heightPercentageToDP("25"),
                    width: widthPercentageToDP("45"),
                    marginRight:widthPercentageToDP("2"),
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
            Baby Showers and Kids
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: widthPercentageToDP(3),
            }}
          >
        <ScrollView horizontal={true}>
        <TouchableOpacity
              onPress={() => {
                handlePress('cards/4.png');
              }}
            >
              <Image
                source={inv19}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/5.png');
              }}
            >
              <Image
                source={inv20}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handlePress('cards/6.png');
              }}
            >
              <Image
                source={inv21}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/7.png');
              }}
            >
              <Image
                source={inv22}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/9.png');
              }}
            >
              <Image
                source={inv24}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/10.png');
              }}
            >
              <Image
                source={inv25}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/11.png');
              }}
            >
              <Image
                source={inv26}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/13.png');
              }}
            >
              <Image
                source={inv28}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/19.png');
              }}
            >
              <Image
                source={inv33}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
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
            Holidays
          </Text>
          <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: widthPercentageToDP(3),
            }}
          >
             <TouchableOpacity
              onPress={() => {
                handlePress('7.png');
              }}
            >
              <Image
                source={inv7}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            
             <TouchableOpacity
              onPress={() => {
                handlePress('cards/16.png');
              }}
            >
              <Image
                source={inv31}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('11.png');
              }}
            >
              <Image
                source={inv11}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('9.png');
              }}
            >
              <Image
                source={inv9}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handlePress('cards/12.png');
              }}
            >
              <Image
                source={inv27}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('8.png');
              }}
            >
              <Image
                source={inv8}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>

           

            <TouchableOpacity
              onPress={() => {
                handlePress('14.png');
              }}
            >
              <Image
                source={inv14}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginTop: heightPercentageToDP("-4.5"),
                  marginRight:widthPercentageToDP("2"),
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
            Seasonal and Other
          </Text>
          <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: widthPercentageToDP(3),
            }}
          >
    <TouchableOpacity
              onPress={() => {
                handlePress('10.png');
              }}
            >
              <Image
                source={inv10}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginRight:widthPercentageToDP("2"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('13.png');
              }}
            >
              <Image
                source={inv13}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginRight:widthPercentageToDP("2"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>



            <TouchableOpacity
              onPress={() => {
                handlePress('cards/23.png');
              }}
            >
              <Image
                source={inv37}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginRight:widthPercentageToDP("2"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/24.png');
              }}
            >
              <Image
                source={inv38}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginRight:widthPercentageToDP("2"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/25.png');
              }}
            >
              <Image
                source={inv39}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginRight:widthPercentageToDP("2"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/26.png');
              }}
            >
              <Image
                source={inv40}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginRight:widthPercentageToDP("2"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/27.png');
              }}
            >
              <Image
                source={inv41}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginRight:widthPercentageToDP("2"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/28.png');
              }}
            >
              <Image
                source={inv42}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginRight:widthPercentageToDP("2"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handlePress('cards/29.png');
              }}
            >
              <Image
                source={inv43}
                style={{
                  height: heightPercentageToDP("25"),
                  width: widthPercentageToDP("45"),
                  marginRight:widthPercentageToDP("2"),
                  marginTop: heightPercentageToDP("-4.5"),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
           
            </View>
    </ScrollView>
        
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default createnewtemplates;
