import React, { useContext, useEffect, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  StatusBar,
  Text,
  ImageBackground,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import INVITE_SCHEMA from 'ping/src/schema/inviteSchema';
import styles, { colors } from 'ping/src/styles/styles';
import Spacer from 'ping/src/components/Spacer';
import { Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import RadioButton from 'rn-radio-button';
import deprogline from 'ping/assets/createnew/dresscode/dresscodeprogline.png';
import optional from 'ping/assets/createnew/dresscode/optional.png';
import ImagePicker from 'ping/src/components/inputs/ImagePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from 'ping/src/components/inputs/CustomTextInput';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import CustomInputLabel from 'ping/src/components/inputs/CustomInputLabel';

function Dresscode({ navigation }) {
  const { data, control, handleSubmit, errors, reset, formState, setValue } = useForm({
    resolver: yupResolver(INVITE_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const onSubmit = () => {
    console.log(data);
    navigation.navigate('FAQ');
  };
  const [radiobtn, setRadiobtn] = useState('');
  const [val, setVal] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  function pressCircle(i) {
    setVal(i);
  }
  const handleDescription = (text) => setDescription(text);

  const listData = [
    { label: 'Casual and Comfortable', value: 1 },
    { label: 'Business casual', value: 2 },
    { label: 'Semi-formal', value: 3 },
    { label: 'Formal/Black tie', value: 4 },
    { label: 'custom', value: 5 },
  ];

  const submited = (val, description) => {
    console.log({ radiovalue: val, description: description });
  };

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
            height: heightPercentageToDP('10'),
            width: widthPercentageToDP('85'),
            resizeMode: 'contain',
            marginTop: heightPercentageToDP('-2.5'),
            left: heightPercentageToDP('2'),
          }}
        />
        <View style={{ position: 'relative', left: 10 }}>
          <RadioButton
            outerWidth={30}
            innerWidth={20}
            borderWidth={1.5}
            data={listData}
            color={'black'}
            onPress={pressCircle}
            wrapperStyle={{ padding: 4 }}
          />
        </View>
        <View
          style={{
            height: heightPercentageToDP('12'),
            width: widthPercentageToDP('95'),
            marginTop: heightPercentageToDP('1'),
            right: heightPercentageToDP('-2'),
            resizeMode: 'contain',
          }}
        >
          <CustomTextInput
            input={{
              name: 'dresscode',
              label: '',
              placeholder:
                "Do you have specific theme or color in mind? Don't make your guests guess!",
              defaultValue: '',
            }}
            control={control}
            errors={errors}
            value={description}
            onChangeText={handleDescription}
            rules={{ multiline: 'true', numberOfLines: '5' }}
          />
        </View>

        <CustomInputLabel text="Share some Inspo" optional />
        <Spacer height={1} />
        <ImagePicker />

        <Spacer height={5} />
        <View style={{ alignSelf: 'flex-end' }}>
          <CustomButton text="next" onPress={handleSubmit(onSubmit)} narrow primary />
        </View>
        <Spacer height={2} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Dresscode;
