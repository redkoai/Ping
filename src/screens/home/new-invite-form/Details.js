import React, { useState, useContext } from 'react';
import NewInviteContext from 'ping/src/contexts/NewInviteContext';

import { yupResolver } from '@hookform/resolvers/yup';
import { DETAILS_SCHEMA } from 'ping/src/schema/detailsSchema';
import { StatusBar, Image, View, Text } from 'react-native';
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

function Details({ navigation }) {
  const { formData, updateFormData } = useContext(NewInviteContext);

  const [errorMsg, setErrorMsg] = useState(false)

  const { control, errors, setValue,reset, handleSubmit } = useForm({
    resolver: yupResolver(DETAILS_SCHEMA),
  });
  const onSubmit = (data) => {
    const {startdate, enddate} = data;
    const convertedStartDate = startdate.replace("th", '')
    const convertedEndDate = enddate.replace("th", '')
console.log(new Date(convertedEndDate).getTime(), "end date");
console.log(new Date(convertedStartDate).getTime(), "start date");
    if(new Date(convertedStartDate).getTime() - new Date(convertedEndDate).getTime() > 0) {
      console.log("error")
      setErrorMsg(true)
      return;
    }
    updateFormData(data);
    navigation.navigate('Dresscode');
    //reset();
  
    //console.log("New context", userData);
    //console.log("After Submit ---", formData);
  };
  const [coHosts, setCoHosts] = useState([]);
  const addCoHost = () => setCoHosts([...coHosts, 1]);

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
        
        <Image
          source={deprogline}
          style={{
            height: heightPercentageToDP('7'),
            width: widthPercentageToDP('88'),
            resizeMode: 'contain',
            marginTop: heightPercentageToDP('-2'),
          }}
        />
        {errorMsg ? <Text style={{color:'red'}}>Start Date can't be greater than end Date</Text> : null}
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
          input={{ name: 'startdate', label: 'Start Date', placeholder: '', defaultValue: '' }}
        />
        <DateInput
          control={control}
          errors={errors}
          setValue={setValue}
          input={{ name: 'enddate', label: 'End Date', placeholder: '', defaultValue: '' }}
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
            name: 'co-host-0',
            label: 'Hosted by',
            placeholder: 'Host/organization name',
            defaultValue: '',
          }}
          optional
        />

        {coHosts.map((item, index) => (
          <View style={{ resizeMode: 'contain', marginTop: heightPercentageToDP('-3') }}>
            <CustomTextInput
              control={control}
              errors={errors}
              input={{
                name: `co-host-${index + 1}`,
                placeholder: 'Host/organization name',
                defaultValue: '',
              }}
            />
          </View>
        ))}

        <CustomAddButton text="Add a co-host" onPress={addCoHost} />
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
          <CustomButton text="next" onPress={handleSubmit(onSubmit)} narrow primary />
        </View>

        <Spacer height={2} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Details;
