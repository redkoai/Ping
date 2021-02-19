import React, { useContext, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  StatusBar,
  ImageBackground,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import emptyHome from 'ping/assets/homeScreen/bg.png';
import styles, { colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';
import Spacer from 'ping/src/components/Spacer';
import CustomTextInput,{
  StartDateInput,
  EndDateInput,
  LocationInput,
} from 'ping/src/components/CustomTextInput';
import deprogline from 'ping/assets/createnew/details/detailsprogressline.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import denext from 'ping/assets/createnew/details/detailsnext.png';
import demsg from 'ping/assets/createnew/details/detailswritemessage.png';
import LocationPicker from 'ping/src/components/LocationPicker';
import NavBar from 'ping/src/navbars/NarBar';
import NavBar_invite from 'ping/src/navbars/NarBar_invite';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

function Details({}) {
  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [event,setEvent] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [showloc, setShowloc] = useState(false);
  const [hosted,setHosted]=useState('');
  const [description,setDescription]=useState('');

  const [currentDatePickerActive, setCurrentDatePickerActive] = useState('start');
  const navigation = useNavigation();

  const handleEvent = (text) => setEvent(text);
  const handleStart = (text) => setStart(text);
  const handleEnd = (text) => setEnd(text);
  const handleShowloc = (text) => setShowloc(text);
  const handleHosted = (text) => setHosted(text);
  const handleDescription = (text) => setDescription(text);

  const submited=(event,start,end,showloc,hosted,description)=>{
    console.log({eventname: event, start: start, end: end, location: showloc, hostedby: hosted, description: description});
    // Alert.alert('FAQ RESULTS',"park:' + p + 'secret:' + s + 'guests:' + g + 'qsn:' + q",[{text:'okay',style:'destructive'}]);
   }

  const showDatePicker = (activeDatePicker) => {
    setDatePickerVisibility(true);
    setCurrentDatePickerActive(activeDatePicker);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateVal) => {
    hideDatePicker();
    const formattedDate = moment(dateVal).format('MMMM, Do YYYY hh:mm a');
    if (currentDatePickerActive === 'start') {
      setStart(formattedDate);
    } else {
      setEnd(formattedDate);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground source={emptyHome} style={styles.homeEmpty}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: widthPercentageToDP(3),
            }}
          >
            <Image
              source={deprogline}
              style={{
                height: heightPercentageToDP('7'),
                width: widthPercentageToDP('88'),
                resizeMode: 'contain',
                marginTop: heightPercentageToDP('-2'),
              }}
            />
            <CustomTextInput input={{name:'event',label:'Name your event',placeholder:'Halloween party,Jenns birthday dinner,etc.',defaultValue: ''}} 
            control={control}
             errors={errors}
             value={event}
             onChangeText={handleEvent}
            />
            <StartDateInput
              control={control}
              errors={errors}
              calendarClick={() => showDatePicker('start')}
              value={start}
              onChangeText={handleStart}
            />
            <EndDateInput
              control={control}
              errors={errors}
              calendarClick={() => showDatePicker('end')}
              value={end}
              onChangeText={handleEnd}
            />
            <View>
              <LocationInput
                control={control}
                errors={errors}
                value={showloc}
                onChangeText={handleShowloc}
                locationClick={() => setShowloc(true)}
              />
            </View>
            <CustomTextInput input={{name:'hosted',label:'Hosted by',placeholder:'Host/organization name',defaultValue: ''}} 
            control={control}
             errors={errors}
             value={hosted}
             onChangeText={handleHosted}
             optional='true'
            />
            <Image
              source={demsg}
              style={{
                height: heightPercentageToDP('40'),
                width: widthPercentageToDP('35'),
                marginTop: heightPercentageToDP('-20'),
                resizeMode: 'contain',
              }}
            />
            <View  style={{
              height: heightPercentageToDP('40'),
              width: widthPercentageToDP('35'),
              marginTop: heightPercentageToDP('-15'),
              resizeMode: 'contain',
            }}>
            <CustomTextInput input={{name:'Description',label:'Description',placeholder:'Let people know what this event is about at a glance!',defaultValue: ''}} 
            control={control}
             errors={errors}
             value={description}
             onChangeText={handleDescription}
             optional='true'
             rules={{multiline:'true',numberOfLines: 5 }} 
           
            />
            </View>

            <TouchableOpacity
              onPress={() => {
                submited(event,start,end,showloc,hosted,description),
                navigation.navigate('Dresscode');
              }}
            >
              <Image
                source={denext}
                style={{
                  height: heightPercentageToDP('47'),
                  width: widthPercentageToDP('45'),
                  marginTop: heightPercentageToDP('-25'),
                  right: heightPercentageToDP('-21'),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <Spacer height={1} />
          </View>
        </ImageBackground>
      </ScrollView>
      <NavBar_invite />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {showloc ? <LocationPicker /> : null}
    </View>
    </TouchableWithoutFeedback>
  );
}
export default Details;
