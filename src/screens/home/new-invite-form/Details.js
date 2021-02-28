import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Image, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import Spacer from 'ping/src/components/Spacer';
import CustomTextInput, {
  DateInput,
  LocationInput,
} from 'ping/src/components/inputs/CustomTextInput';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import CustomAddButton from 'ping/src/components/inputs/CustomAddButton';
import deprogline from 'ping/assets/createnew/details/detailsprogressline.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import INVITE_SCHEMA from 'ping/src/schema/inviteSchema';

function Details({ navigation }) {
  const { data, control, handleSubmit, errors, reset, formState, setValue } = useForm({
    resolver: yupResolver(INVITE_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  // const onSubmit = useCallback(formData => {
  //   console.log(formData);
    
  // }, []);

  const onSubmit = () => {
    console.log("pressed button")
    console.log(data);
    navigation.navigate('Dresscode');
  };

  return (
    <>
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
            input={{ name: 'start-date', label: 'Start Date',placeholder:'',defaultValue:'' }}
          />
          <DateInput
            control={control}
            errors={errors}
            setValue={setValue}
            input={{ name: 'end-date', label: 'End Date',placeholder:'',defaultValue:'' }}
          />
          <LocationInput
            control={control}
            errors={errors}
            setValue={setValue}
            navigation={navigation}
          />
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

          <CustomAddButton
            text="Add a co-host"
            onPress={() => console.log('Add a co-host pressed')}
          />
          <Spacer height={5} />

          <CustomTextInput
            control={control}
            errors={errors}
            input={{
              name: 'description',
              label: 'Description',
              placeholder: 'Let people know what this event is about at a glance!',
              defaultValue: '',
            }}
            rules={{ multiline: true, numberOfLines: 5 }}
            optional
          />

          <View style={{ alignSelf: 'flex-end' }}>
            <CustomButton text="next" onPress={handleSubmit(onSubmit)} small primary />
          </View>

          <Spacer height={2} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

export default Details;
