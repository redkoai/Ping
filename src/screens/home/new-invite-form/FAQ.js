import React, { useState, useContext,useEffect } from 'react';
import NewInviteContext from 'ping/src/contexts/NewInviteContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { FAQ_SCHEMA } from 'ping/src/schema/faqSchema';
import { Image, StatusBar, View } from 'react-native';
import Spacer from 'ping/src/components/Spacer';
import { colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import { useForm } from 'react-hook-form';
import CustomTextInput from 'ping/src/components/inputs/CustomTextInput';
import CustomButton from 'ping/src/components/inputs/CustomButton';
import CustomAddButton from 'ping/src/components/inputs/CustomAddButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import faqprogline from 'ping/assets/createnew/faq/faqprogline.png';

function FAQ({ navigation }) {
  const { formData, updateFormData } = useContext(NewInviteContext);
 

  const { control, errors,reset, handleSubmit } = useForm({
    resolver: yupResolver(FAQ_SCHEMA),
  });
  const onSubmit = (data) => {
    updateFormData(data);
    navigation.navigate('People');
    //reset();
  };
  // useEffect(() => {
  //   console.log('FAQData:', formData);
  //   navigation.navigate('People');
  // }, [formData]);

  const [park, setPark] = useState('');
  const [secretcode, setSecretcode] = useState('');
  const [guests, setGuests] = useState('');
  const [question, setQuestion] = useState('');
  const handlePark = (text) => setPark(text);
  const handleSecret = (text) => setSecretcode(text);
  const handleGuests = (text) => setGuests(text);
  const handleQuestions = (text) => setQuestion(text);

  const [anotherQuestion, setAnotherQuestion] = useState([]);
  const addAnotherQuestion = () => setAnotherQuestion([...anotherQuestion,1]);

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
          source={faqprogline}
          style={{
            height: heightPercentageToDP('10'),
            width: widthPercentageToDP('85'),
            resizeMode: 'contain',
            marginTop: heightPercentageToDP('-4'),
            left: heightPercentageToDP('1'),
          }}
        />
        <CustomTextInput
          input={{
            name: 'faqpeoplepark',
            label: 'Where should people park?',
            placeholder: 'Street parking',
            defaultValue: '',
          }}
          control={control}
          errors={errors}
          optional="true"
        />

        <CustomTextInput
          input={{
            name: 'faqsecretcode',
            label: 'Is there a secret code?',
            placeholder: '52301',
            defaultValue: '',
          }}
          control={control}
          errors={errors}
          optional="true"
        />
        <CustomTextInput
          input={{
            name: 'faqguests',
            label: 'What should guests prepare?',
            placeholder: 'Bring some food for the potluck!',
            defaultValue: '',
          }}
          control={control}
          errors={errors}
          optional="true"
        />

        {anotherQuestion.map((item)=> (
          <View style={{ resizeMode: 'contain', marginTop: heightPercentageToDP('-1') }}>
          <CustomTextInput
            input={{
              name: 'faqquestion',
              label: 'Type your question here',
              placeholder: 'Type the answer to your question',
              defaultValue: '',
            }}
            control={control}
            errors={errors}
          />
        </View>
        ))}

        <CustomAddButton text="Add another question" onPress={addAnotherQuestion} />

        <Spacer height={3} />

    

        <Spacer height={5} />

        <View style={{ alignSelf: 'flex-end' }}>
          <CustomButton text="next" onPress={handleSubmit(onSubmit)} narrow primary />
        </View>

        <Spacer height={2} />
      </View>
    </KeyboardAwareScrollView>
  );
}
export default FAQ;
