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
import { widthPercentageToDP, heightPercentageToDP } from "../../../../util/scaler.js";
import { actuatedNormalize } from "../../../../util/fontScaler";
import { enableScreens } from "react-native-screens";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from 'ping/src/contexts/AuthContext';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import { colors, textStyles } from 'ping/src/styles/styles';
import * as WebBrowser from 'expo-web-browser';

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


  useEffect(() => {
    let mounted = true;
  });
  return (
    <SafeAreaView  style={{backgroundColor:'white' }}>
      <View style={{backgroundColor:'white' }}>
        <ImageBackground
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(105),
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              marginTop: widthPercentageToDP(1),
            }}
          >
 
<Text style={[textStyles.bigBold,{fontSize:actuatedNormalize(20), left:widthPercentageToDP('16'),marginBottom:heightPercentageToDP('2')} ]}>Settings & Information</Text>


<View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:widthPercentageToDP(3)}}>
<Text style={[textStyles.bigBold,{left:heightPercentageToDP('2'),marginBottom:heightPercentageToDP('2')} ]}>Terms and Conditions</Text>
<TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://www.theredko.com/tango-terms-of-use')}>
<Text style={[textStyles.smallSemiBold,{color:'gray', fontSize:actuatedNormalize(12),left:heightPercentageToDP('-3')} ]}>Read</Text>
</TouchableOpacity>
</View>
<View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop:widthPercentageToDP(3)}}>
<Text style={[textStyles.bigBold,{left:heightPercentageToDP('2'),marginBottom:heightPercentageToDP('2')} ]}>Privacy Policy</Text>
<TouchableOpacity onPress={() => WebBrowser.openBrowserAsync("https://www.theredko.com/tango-privacy-policy")}>
<Text style={[textStyles.smallSemiBold,{color:'gray', fontSize:actuatedNormalize(12),left:heightPercentageToDP('-3')} ]}>Read</Text>
</TouchableOpacity>
</View>

          </View>

        
 {/* <View style={{marginTop:heightPercentageToDP(40),  alignItems: "center" }}>    
             
              {!skipped && (
                <CustomButton
                  text="Sign Out"
                  onPress={async () => await singOutAsync(onSuccess, onFailure)}
                  shadow
                  primary
                />
              )}
            </View> */}
          
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

export default Settings;
