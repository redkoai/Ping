import React, { useContext, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {useNavigation} from "@react-navigation/native";
import {Image,StatusBar, ImageBackground, View, ScrollView, KeyboardAvoidingView,TouchableOpacity, Dimensions,SafeAreaView,ActivityIndicator} from "react-native";
import emptyHome from "../../../assets/homeScreen/bg.png";
import styles from "../../styles/styles";
import { colors } from 'ping/src/styles/styles';
import {widthPercentageToDP,heightPercentageToDP,} from '../../../util/scaler';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';
import Spacer from 'ping/src/components/Spacer';
import { StartInput,EventInput,EndInput,HostedInput,DescriptionInput,CalendarInput, LocationInput} from 'ping/src/components/CustomTextInput';
import deprogline from "../../../assets/createnew/details/detailsprogressline.png";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import denext from "../../../assets/createnew/details/detailsnext.png";
import demsg from "../../../assets/createnew/details/detailswritemessage.png";
import LocationPicker from './../../components/LocationPicker';
import NavBar from "../../navbars/NarBar";
import NavBar_invite from "../../navbars/NarBar_invite";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';




function Details({}) {
    const { control, handleSubmit, errors, reset, formState } = useForm({
        resolver: yupResolver(AUTH_SCHEMA),
      });
      const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
      const [start, setStart] = useState('');
      const [end, setEnd] = useState('');
      const[showloc,setShowloc]=useState(false);
      const[currentDatePickerActive, setCurrentDatePickerActive] = useState("start");
      useFocusEffect(useCallback(reset));
    const navigation = useNavigation()

    const showDatePicker = (activeDatePicker) => {
        setDatePickerVisibility(true);
        setCurrentDatePickerActive(activeDatePicker);
      };

      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (dateVal) => {
        hideDatePicker();
        const formattedDate=moment(dateVal).format('MMMM, Do YYYY hh:mm a');
        if(currentDatePickerActive === 'start'){
            setStart(formattedDate);
        } else {
            setEnd(formattedDate);
        }
      };
    return (
        
        <View style={{flex: 1}}> 
         <ScrollView> 
      <ImageBackground source={emptyHome} style={styles.homeEmpty}>
      <View style={{ flexDirection: 'column', justifyContent: 'center',marginTop:widthPercentageToDP(3)}}>
      <Image source={deprogline} style={{height: heightPercentageToDP('7'), width :widthPercentageToDP('88'),  resizeMode:'contain',marginTop: heightPercentageToDP('-2'), }} />
      <EventInput control={control} errors={errors} />
      <StartInput control={control} errors={errors} calendarClick={() => showDatePicker("start")} value={start}/>
      <EndInput control={control} errors={errors} calendarClick={() => showDatePicker("end")} value={end}/>
      <View >
      <LocationInput control={control} errors={errors} locationClick={()=>setShowloc(true)} />
      </View>
      <HostedInput control={control} errors={errors} />
      <Image source={demsg} style={{height: heightPercentageToDP('40'), width :widthPercentageToDP('35'), marginTop: heightPercentageToDP('-20'), resizeMode:'contain' }} /> 
      <DescriptionInput control={control} errors={errors} />
      <TouchableOpacity onPress={() => { 
                    navigation.navigate('Dresscode')
                }}>
    <Image source={denext} style={{height: heightPercentageToDP('47'), width :widthPercentageToDP('45'), marginTop: heightPercentageToDP('-20'),right:heightPercentageToDP('-21'), resizeMode:'contain' }} /> 
    </TouchableOpacity>
    <Spacer height={1} />
    </View>
    </ImageBackground>
    </ScrollView>
    <NavBar_invite/>
    <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />  
    {showloc?<LocationPicker/>:null} 
    </View>
    
    )
}
export default Details