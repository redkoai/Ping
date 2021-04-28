import React, { useState, useContext,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet, StatusBar, View,Text,TouchableOpacity, ImageBackground } from 'react-native';
import NewInviteContext from 'ping/src/contexts/NewInviteContext';
import AuthContext from 'ping/src/contexts/AuthContext';
import Spacer from 'ping/src/components/Spacer';
import { colors, textStyles } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import CalendarIcon from 'ping/src/icons/CalendarIcon';
import LocationNearMeIcon from 'ping/src/icons/LocationNearMeIcon';
import { Entypo, MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons'; 
import ReactRoundedImage from "react-rounded-image";
import { actuatedNormalize } from "ping/util/fontScaler";
// import MyPhoto from 'ping/assets/createnew/MyInvite/men.jpg';
import CustomText from 'ping/src/components/CustomText';
import CustomTextInput from 'ping/src/components/inputs/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Moment from 'moment';
import add from "ping/assets/invites/add.png";
import send from "ping/assets/invites/send.png";
import newMessageBtn from "ping/assets/newMessage.png"



import firebase from 'firebase';
import 'firebase/firestore'


function MyInvite({navigation, route }) {

  // const navigation = useNavigation()

  const { eventID } = route.params
  console.log(eventID.eventID)
  const { control, errors, setValue, reset, handleSubmit } = useForm({
    //resolver: yupResolver(DETAILS_SCHEMA),
  });

 



  //TODO: PULL WITH INVITE ID, AUTOMATICALLY ADD TO CALENDAR SENT INVITE 
    const [loggedInUser,setLoggedInUser]=useState([]);
    const [state,setState]=useState([]);
    const { user } = useContext(AuthContext);
    const UserInfo = { "uid": user.uid, "email": user.email }
    const [secretCode, setSecretCode] = useState('');

    const [event, setEvent] = useState({})


    /////////////////////////
    // Firebase query
    /////////////////////////
    const db = firebase.database().ref("users")

    const getEvent = () => {
      const event = {}
      db.child(`${user.uid}/Events/${eventID}`).on("child_added", function(snapshot) {
        // console.log("snapshot =", snapshot)
        event[snapshot.key] = snapshot.val()
    })
    setEvent(event)
    console.log("event description = ", event.description)
    console.log("event co host = ", event["co-host-0"] )
    console.log("user.uid = ", user.uid)
    console.log("event = ", event)

    }

    /////////////////////////////////////////////
    // Firebase query for event host information
    //////////////////////////////////////////////
    const [hostEmail, setHostEmail] = useState()
    const [hostUsername, setHostUsername] = useState()
    const getHostInfo = () => {
      db.on("child_added", function(snapshot) {
        if (snapshot.key == event["co-host-0"]){
          setHostEmail(snapshot.val().email)
          setHostUsername(snapshot.val().username)
        }
      })
    }

    console.log("host email =", hostEmail)
    console.log("host username =", hostUsername)


   

    useEffect(() => {
        getEvent()
        getHostInfo()
        const userUID=UserInfo.uid;
        // console.log("userid: ", userUID);
       //firebase.database().ref('/InviteForms').child("-MW_XbsJOLm2BCA6nA_K").child("formData").on('value',(snapshot)=>{
      //firebase.database().ref('/InviteForms').limitToLast(1).on('value',(snapshot)=>{ 
        firebase.database().ref('/InviteForms').limitToLast(1).on('value',(snapshot)=>{ 
          let data = snapshot.val() ? snapshot.val() : {};
          Object.keys(data).forEach(key => {
            const dataobject =data[key];
            const formval= dataobject.formData
            setState(formval);
          })
            })
     }, []);

    // const { formData, updateFormData, bgImage } = useContext(NewInviteContext);
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: 'white' }}
        contentContainerStyle={{ alignItems: 'space-evenly' }}
      >
        <StatusBar backgroundColor={colors.primary} />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: widthPercentageToDP(3),
          }}
        >    
        <View>
              {/* <ImageBackground
              source={bgImage}
              style={{
                height: heightPercentageToDP('35'),
                width: widthPercentageToDP('95'),
                marginTop: heightPercentageToDP('-1'),
                resizeMode: 'contain',
                
              }}
        > */}
          <Text style={[textStyles.bigBold,{marginTop: heightPercentageToDP('29'),left:heightPercentageToDP('3')}]}>{event.event}</Text> 
          <Text style={[textStyles.normalBold,{left:heightPercentageToDP('25'),marginTop: heightPercentageToDP('-22')}]}>{event.startdate}</Text>
          <Text style={[textStyles.normalBold,{left:heightPercentageToDP('13'),marginTop: heightPercentageToDP('3')}]}>{event.location}</Text>
          {/* </ImageBackground>  */}
        </View>


          <View  >
          <Text style={[textStyles.bigBold,{marginTop: heightPercentageToDP('3'),left:heightPercentageToDP('3')} ]}>{event.event}</Text>
          </View>

          <View style={{ 
          height: heightPercentageToDP('10'),
          width :widthPercentageToDP('20'), 
          resizeMode:'contain',
          marginTop: heightPercentageToDP('3'),
          left:heightPercentageToDP('3')
          }}>
          <CustomButton text="Secret Code" narrow primary onPress={() => { navigation.navigate('SecretCode')}}/>
          </View>

          <TouchableOpacity >
          <View style={{ 
          height: heightPercentageToDP('10'),
          width :widthPercentageToDP('20'), 
          resizeMode:'contain',
          marginTop: heightPercentageToDP('-8'),
          left:heightPercentageToDP('32')}}>
          {/* <Text style={[textStyles.bigBold,{ color: colors.primary }]}>Edit</Text>
          <View style={{marginTop: heightPercentageToDP('-3.5'),left:heightPercentageToDP('5')}}>
          <MaterialIcons name="edit" size={32} color="#A6ACE9" />
          </View>  */}
          </View>
          </TouchableOpacity>


          <View
            style={{
                borderBottomColor: '#E5E5E5',
                borderBottomWidth: 1,
                width:widthPercentageToDP('100'),
            }}
            />

        

        {/* <View style={{ 
          height: heightPercentageToDP('10'),
          width :widthPercentageToDP('50'), 
          resizeMode:'contain',
          marginTop: heightPercentageToDP('0'),
          left:heightPercentageToDP('25')}}>
          <Text style={[ { color: colors.darkGrey }]}>{event.startdate}</Text>
          </View> */}

        <View style={{left:heightPercentageToDP('4'),textAlign: 'center',marginTop: heightPercentageToDP('1')}}>
          <Text style={[ { color: colors.darkGrey }]}>{event.description}</Text>
          </View>

          <View>
          <Entypo name="location-pin" size={28} color="black" />
          <Text style={[textStyles.normalBold,{left:heightPercentageToDP('4'),marginTop: heightPercentageToDP('-2.8')}]}>{event.location}</Text>
          <TouchableOpacity >
          <LocationNearMeIcon style={{left:heightPercentageToDP('40'),marginTop: heightPercentageToDP('-2.2')}} size={heightPercentageToDP(3)} color={colors.darkGrey} />
          </TouchableOpacity>
          </View>

          <Spacer height={1} />

          <View>
          <CalendarIcon style={{left:heightPercentageToDP('0.5')}} size={heightPercentageToDP(2.8)} color="black" />
          <Text style={[textStyles.normalBold,{marginTop: heightPercentageToDP('-2.5'),left:heightPercentageToDP('5')}]}>{event.startdate}</Text>
          </View>

          <Spacer height={1} />
          
          <View > 
          <View style={{left:heightPercentageToDP('0.5')}} size={heightPercentageToDP(2.8)}>
          <MaterialCommunityIcons name="hanger" size={32} color="black" />
          </View>
          <Text style={[textStyles.normalBold,{left:heightPercentageToDP('5'),marginTop: heightPercentageToDP('-2.6')}]}>{event['radio-buttons']}</Text>
          <View  style={{left:heightPercentageToDP('40'),marginTop: heightPercentageToDP('-3')}} size={heightPercentageToDP(3)} >
          <TouchableOpacity>
          <MaterialIcons name="arrow-drop-down" size={32} color="black" />
          </TouchableOpacity>
          </View>
          </View>

          <View style={{left:heightPercentageToDP('0.3')}}>
          <MaterialCommunityIcons name="frequently-asked-questions" size={32} color="black" />
          <Text style={[textStyles.normalBold,{left:heightPercentageToDP('5'),marginTop: heightPercentageToDP('-2.6')}]}>FAQ'S</Text>
          <View  style={{left:heightPercentageToDP('40'),marginTop: heightPercentageToDP('-3')}} size={heightPercentageToDP(3)} >
          <TouchableOpacity>
          <MaterialIcons name="arrow-drop-down" size={32} color="black" />
          </TouchableOpacity>
          </View>
          </View>

          <Spacer height={3} />
{/* 
          <View >
          <Text style={[textStyles.bigSemiBold,{left:heightPercentageToDP('2')}]}>
           Photos
          </Text>
          <TouchableOpacity >
            <Text style={[textStyles.bigRegular, { color: colors.darkGrey }, {left:heightPercentageToDP('35'),marginTop: heightPercentageToDP('-3')}]}>See all</Text>
          </TouchableOpacity>
          </View> */}

          {/* <View style={{left:heightPercentageToDP('2')}}>
          <Image
            style={styles.image}
            source={MyPhoto}
            resizeMode={"cover"} />
          </View> */}
          

        <Spacer height={5} />

        {/* <View >
          <Text style={[textStyles.bigSemiBold,{left:heightPercentageToDP('2')}]}>
           Guest List ( )
          </Text>
          <TouchableOpacity >
            <Text style={[textStyles.bigRegular, { color: colors.primary }, {left:heightPercentageToDP('28'),marginTop: heightPercentageToDP('-3')}]}>See all invites</Text>
          </TouchableOpacity>
        </View> */}

        {/* <View style={{left:heightPercentageToDP('2')}}>
          <Image
            style={styles.image}
            source={MyPhoto}
            resizeMode={"cover"} />
           <Text>{event['co-host-1']}</Text> 
          </View> */}

          <Spacer height={5} />

          {/* <View>
          <Text style={[textStyles.bigSemiBold,{left:heightPercentageToDP('2')}]}>
           Send message to all guests
          </Text>
          <View style={{left:heightPercentageToDP('1'),marginTop: heightPercentageToDP('-1')}}>
        <CustomTextInput
          control={control}
          errors={errors}
          input={{
            name: 'send-messages',
            label: '',
            placeholder: 'Message them....',
            defaultValue: '',
          }}
          rules={{ multiline: true, numberOfLines: 5 }}  
        />
        </View> */}
        </View>
        
    

        
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: widthPercentageToDP(0),
          }}
        >
          <View style={{  marginLeft:widthPercentageToDP(10) }}>
           <CustomButton  text="RSVP" small primary />
           </View>

          {/* TODO MESSSAGE HOST TAKE HOST UID AND MESSAGE */}
          {/* navigation.navigate("Invest", { screen: "InvestScreen" }) */}
          {/* navigation.navigate("**stack_Name**", {
 screen:"screen_name_connect_with_**stack_name**",
 params:{
 user:"anything_string_or_object"
}
}) */}
          <View style={{  marginLeft:widthPercentageToDP(10) }}>
          <TouchableOpacity style={{alignContent:'center',marginLeft:widthPercentageToDP(10)}} onPress={() => { 
                navigation.navigate('Messages', {
                  screen: 'Chat', 
                  params: {
                    OtherUserInfo: {
                      _id: event["co-host-0"],
                      email: hostEmail,
                      username: hostUsername
                    }}
                  }
                )
            }}>
              <Image source={newMessageBtn} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('70'), marginTop: heightPercentageToDP('5'), resizeMode:'contain', left:heightPercentageToDP('2.5') }} />
              {/* <CustomButton text="Message Host" narrow primary /> */}
          </TouchableOpacity>
          </View>
          </View>
  
          <Spacer height={2} />
      
      </KeyboardAwareScrollView>
    );
  }

  const styles = StyleSheet.create({
    textConatiner: {
      width: widthPercentageToDP(60),
      left:heightPercentageToDP(2),
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    textendConatiner: {
      width: widthPercentageToDP(95),
      marginTop: heightPercentageToDP('-2.6'),
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    image: {
      width: 65,
      height: 65,
      borderWidth: 0,
      borderRadius: 75,
      justifyContent: 'space-around'
    },
  });
  
  export default MyInvite;
  