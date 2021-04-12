
import {useNavigation} from "@react-navigation/native";
import {Image, ImageBackground, View, ScrollView, SafeAreaView,StyleSheet,Text} from "react-native";
import {TouchableOpacity} from 'react-native';
import emptyHome from "ping/assets/homeScreen/bg.png";
import styles from "ping/src/styles/styles";
import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP,} from 'ping/util/scaler';
import React, {useContext, useEffect, useState} from "react";
import AuthContext from 'ping/src/contexts/AuthContext';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import Spacer from 'ping/src/components/Spacer';

import * as firebase from 'firebase';

function MyEventsInvited({}) {
  const [loggedInUser,setLoggedInUser]=useState([]);
  const [state,setState]=useState([]);
  const { user } = useContext(AuthContext);
  // const UserInfo = { "uid": user.uid, "email": user.email }
    const navigation = useNavigation();
    const { singOutAsync, skipped } = useContext(AuthContext);
 
 
    return (

        <View style={{ flex: 1 }}>
          <ImageBackground source={emptyHome} style={styles.homeEmpty}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: widthPercentageToDP(3),
              }}
            >
          
        <Spacer height={2} />
        <TouchableOpacity>
        <CustomButton
          text="Add to calendar"
          shadow
        />
        </TouchableOpacity>
        
        <TouchableOpacity>
        <CustomButton
          text="Back to Home"
          shadow
        />
        </TouchableOpacity>
        
        <TouchableOpacity>
        <CustomButton
         text="View Event"
         onPress={navigation.navigate('MyEvents')}
         shadow
         primary
         />
         </TouchableOpacity>

        </View> 
      </ImageBackground>
    </View>
  );
}



const stylesone = StyleSheet.create({
    scene: {
      flex: 1,
    },
  });

  export default MyEventsInvited;