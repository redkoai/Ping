import React, { useState, useContext } from 'react';
import NewInviteContext from 'ping/src/contexts/NewInviteContext';
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

function Details({ navigation }) {
  const { updateFormData } = useContext(NewInviteContext);

  const { control, errors, setValue, handleSubmit } = useForm();
  const onSubmit = (data) => {
    updateFormData(data)
    navigation.navigate('Dresscode');
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
            name: 'hosted',
            label: 'Hosted by',
            placeholder: 'Host/organization name',
            defaultValue: '',
          }}
          optional
        />

        {coHosts.map((item) => (
          <View style={{ resizeMode: 'contain', marginTop: heightPercentageToDP('-3') }}>
            <CustomTextInput
              control={control}
              errors={errors}
              input={{
                name: 'hosted',
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

// style={{height: heightPercentageToDP('20'), width :widthPercentageToDP('95'),  resizeMode:'contain',marginTop: heightPercentageToDP('17'), }}
