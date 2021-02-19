import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Image,
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
import styles from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';
import Spacer from 'ping/src/components/Spacer';
import CustomTextInput, { DateInput, LocationInput } from 'ping/src/components/CustomTextInput';
import CustomButton from 'ping/src/components/CustomButton';
import deprogline from 'ping/assets/createnew/details/detailsprogressline.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import demsg from 'ping/assets/createnew/details/detailswritemessage.png';
import NavBar_invite from 'ping/src/navbars/NarBar_invite';

function Details({ navigation }) {
  const { data, control, handleSubmit, errors, reset, formState, setValue } = useForm({
    //resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const onSubmit = () => {
    console.log(data);
    navigation.navigate('Dresscode');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
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
              <CustomTextInput
                control={control}
                errors={errors}
                input={{
                  name: 'event',
                  label: 'Name your event',
                  placeholder: 'Halloween party,Jenns birthday dinner,etc.',
                  defaultValue: '',
                }}
              />
              <DateInput
                control={control}
                errors={errors}
                setValue={setValue}
                input={{ name: 'start-date', label: 'Start Date' }}
              />
              <DateInput
                control={control}
                errors={errors}
                setValue={setValue}
                input={{ name: 'end-date', label: 'End Date' }}
              />
              <LocationInput control={control} errors={errors} setValue={setValue} />
              <CustomTextInput
                control={control}
                errors={errors}
                input={{
                  name: 'hosted',
                  label: 'Hosted by',
                  placeholder: 'Host/organization name',
                  defaultValue: '',
                }}
                optional
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
              <View
                style={{
                  height: heightPercentageToDP(15),
                  width: widthPercentageToDP(35),
                  marginTop: heightPercentageToDP(-15),
                  resizeMode: 'contain',
                }}
              >
                <CustomTextInput
                  control={control}
                  errors={errors}
                  input={{
                    name: 'description',
                    label: 'Description',
                    placeholder: 'Let people know what this event is about at a glance!',
                    defaultValue: '',
                  }}
                  rules={{ multiline: 'true', numberOfLines: 5 }}
                  optional
                />
              </View>

              <View style={{ alignSelf: 'flex-end' }}>
                <CustomButton text="next" onPress={handleSubmit(onSubmit)} width={47} isPrimary />
              </View>

              <Spacer height={2} />
            </View>
          </ImageBackground>
        </ScrollView>
        <NavBar_invite />
      </View>
    </TouchableWithoutFeedback>
  );
}
export default Details;
