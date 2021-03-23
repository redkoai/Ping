import React, { useState, useContext,useEffect } from 'react';
import { Image, StyleSheet, StatusBar, View,Text } from 'react-native';
import NewInviteContext from 'ping/src/contexts/NewInviteContext';
import AuthContext from 'ping/src/contexts/AuthContext';
import Spacer from 'ping/src/components/Spacer';
import { colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import CalendarIcon from 'ping/src/icons/CalendarIcon';
import LocationNearMeIcon from 'ping/src/icons/LocationNearMeIcon';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Moment from 'moment';

import firebase from 'firebase';
import 'firebase/firestore'


function MyEvents({ navigation }) {

    const [loggedInUser,setLoggedInUser]=useState([]);
    const [state,setState]=useState([]);
    const { user } = useContext(AuthContext);
    const UserInfo = { "uid": user.uid, "email": user.email }

    useEffect(() => {
        const userUID=UserInfo.uid;
        console.log("userid: ", userUID);
       firebase.database().ref('/InviteForms').child("-MWL_C5_t5kg8InruG_4").child("formData").on('value',(snapshot)=>{
       let data = snapshot.val() ? snapshot.val() : {};
        let todoItems = {...data};
        setState(todoItems );
        console.log("useritem: ",todoItems)
        })
     }, []);

    const { formData, updateFormData } = useContext(NewInviteContext);
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <StatusBar backgroundColor={colors.primary} />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: widthPercentageToDP(3),
          }}
        >
            <View style={{fontWeight:'bold'}}>
            <Text>Event name:{state.event}</Text>
            </View>
          <View style={{ alignSelf: 'flex-start' }}>
          <CustomButton text="Invite" narrow primary />
          </View>

          <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
        />
        <View>
             <Text>{Moment(state.startdate).format('d MMM')}</Text>
        </View>

          <View>
          <Text>{state.description}</Text>
          </View>

          <View>
          <LocationNearMeIcon size={heightPercentageToDP(3)} color={colors.darkGrey} />
          <Text>{state.location}</Text>
          </View>

          <View>
          <CalendarIcon size={heightPercentageToDP(2.8)} color={colors.offBlack} />
          <Text>{state.startdate}</Text>
          </View>

  
          <Spacer height={3} />

          <Spacer height={5} />
  
          <View style={{ alignSelf: 'flex-end' }}>
            <CustomButton text="Send" narrow primary />
          </View>
  
          <Spacer height={2} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
  export default MyEvents;
  