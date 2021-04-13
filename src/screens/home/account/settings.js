import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Linking,
} from "react-native";
// import { textStyles, colors } from "redvest/util/styles";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "../../../../util/scaler";
import { actuatedNormalize } from "../../../../util/fontScaler";
import { enableScreens } from "react-native-screens";
import { Dimensions } from "react-native";
//import alpacaApi from '../services/alpaca'
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "ping/src/contexts/AuthContext";
import CustomButton from "ping/src/components/inputs/CustomButton";
import * as firebase from "firebase";
//import StoreData from "../util/SaveItemInStorage";
//import RetrieveData from "../util/GetItemInStorage";
//import LoginChecker from "../util/validators/LoginChecker";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(118, 159, 35,  ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const screenWidth = Dimensions.get("window").width;

enableScreens(false);

function Settings() {
  const { singOutAsync, skipped } = useContext(AuthContext);

  const navigation = useNavigation();

  OpenWeb = () => {
    Linking.openURL("https://theredko.com");
  };

  useEffect(() => {
    let mounted = true;
  });
  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(105),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              marginTop: widthPercentageToDP(1),
            }}
          >
            <Text
              style={{
                marginLeft: "13%",
                marginTop: "-10%",
                fontSize: actuatedNormalize(22),
              }}
            >
              Settings and Information
            </Text>
          </View>

          <ScrollView
            style={{ height: "200%", flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View
              style={{
                flex: 0.03,
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                padding: 15,
                marginLeft: "3%",
              }}
            >
              {/* <Image
                  source={cashBalance}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(7),
                  }}
                />
                    <TouchableOpacity
                onPress={() => navigation.navigate('Home', {screen: "tutorial"})}>
                <Image
                  source={tut}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity>
        
        <TouchableOpacity
                onPress={() => Linking.openURL("https://alpaca.markets/docs/trading-on-alpaca/paper-trading/")}>
                <Image
                  source={rule}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                 onPress={() => Linking.openURL("https://alpaca.markets/docs/about-us/")}>
                <Image
                  source={alp}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Invest', {screen: "OrderTypeInfo"})}
              >
                <Image
                  source={ot}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity>
     
       
              <TouchableOpacity
                onPress={() => navigation.navigate("manualAuto")}
              >
                <Image
                  source={bp}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Invest', {screen: "TimeInForceInfo"})}
              >
                <Image
                  source={tf}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("Dashboard")}
              >
                <Image
                  source={po}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity> */}
              {/* <TouchableOpacity 
                onPress={alpacaAuthStart}>
                <Image
                  source={au}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity>
            
       
             
                <Image
                  source={lmv}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(9),
                  }}
                />
       
           
           
        

              <TouchableOpacity
                onPress={() => Linking.openURL("https://redvest.app")}>
              
                <Image
                  source={pv}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://redvest.app/terms")}>
                <Image
                  source={tc}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://redvest.app/privacy-policy")}>
                <Image
                  source={pp}
                  style={{
                    resizeMode: "contain",
                    width: widthPercentageToDP(85),
                    height: heightPercentageToDP(5),
                  }}
                />
              </TouchableOpacity> */}
              {!skipped && (
                <CustomButton
                  text="Sign Out"
                  onPress={async () => await singOutAsync(onSuccess, onFailure)}
                  shadow
                  primary
                />
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default Settings;
