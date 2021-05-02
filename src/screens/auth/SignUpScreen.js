import { textStyles, colors } from 'ping/src/styles/styles';
import { widthPercentageToDP, heightPercentageToDP } from 'ping/util/scaler';
import PingIcon from 'ping/src/icons/PingIcon';
import googleLogo from 'ping/assets/Google_G_Logo.png';
import firebase from 'firebase';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useContext, useCallback, useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from 'ping/src/contexts/AuthContext';
import profileIm from "ping/assets/NavBarAssets/prof.png";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Dimensions, View,Text, TouchableOpacity,Image } from 'react-native';


// import storage from '@react-native-firebase/storage';
// import * as Progress from 'react-native-progress';

// import ImagePicker from 'react-native-image-picker';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AUTH_SCHEMA from 'ping/src/schema/authSchema';

import Spacer from 'ping/src/components/Spacer';
import { EmailInput, PasswordInput, UserNameInput } from 'ping/src/components/inputs/CustomTextInput';
import CustomButton from 'ping/src/components/inputs/CustomButton';

console.disableYellowBox = true;

function SignUpScreen({ navigation }) {
  const db = firebase.database().ref("users")
  const { signUpWithEmailAsync, signInWithGoogleAsync } = useContext(AuthContext);
  const { control, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(AUTH_SCHEMA),
  });
  useFocusEffect(useCallback(reset));

  const [username, setUsername] = useState()
  
  const storageRef = firebase.storage().ref(user + '/profilePicture/' + file.name);
  

  const onSignUpSuccess = (user) => {
    console.log("user = ", user)
    db.child(`${user.user.uid}`).set({"email" : user.user.email, "username" : username, "avatar" : image})
    storageRef.put(image)
  };
  const onSignUpFailure = (errorMessage) => {
    console.log("user failure = ", user)
    console.log("error message = ", errorMessage)
    alert(errorMessage);
  };

  const onChange = (username) => {
    setUsername(username)
  }

  const [image, setImage] = useState(null);
      useEffect(() => {
      async () => {
        if (Platform.OS !== 'web'){
          const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect: [2,2],
        quality: 1,
    });
    console.log(result);
    if (!result.cancelled){
        setImage(result.uri);
    }
};

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: Math.round(Dimensions.get('window').height),
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={-240}
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
        style={{ flex: 1, alignItems: 'center' }}
      >
        <PingIcon size={heightPercentageToDP(12)} color={colors.primary} style={styles.logo} />
        <Spacer height={6.5} />
        {image && <Image source={{uri: image}} style={{marginTop:'0%', height: heightPercentageToDP('10'), width: widthPercentageToDP('30')}} />}
        <TouchableOpacity onPress={pickImage}>
                {/* <Image source={profileIm} style={{marginBottom:'2%', width :widthPercentageToDP('30'), height :heightPercentageToDP('8'), resizeMode:'contain'}} /> */}
                
                 <Text  style={[textStyles.normalSemiBold, { marginTop:'2%',color: colors.primary }]}> Pick Your Profile Image</Text>
            </TouchableOpacity>

        <UserNameInput control={control} errors={errors} onChangeText={onChange} value={username}/>
        <EmailInput control={control} errors={errors} />
        <PasswordInput control={control} errors={errors} />
       
        <Spacer height={2} />

        <CustomButton
          text="Sign Up"
          onPress={handleSubmit(
            async (data) => await signUpWithEmailAsync(data, onSignUpSuccess, onSignUpFailure),
          )}
          primary
        />
        {/* <CustomButton
          icon={googleLogo}
          text="Continue with Google"
          onPress={async () => await signInWithGoogleAsync(onSignUpSuccess, onSignUpFailure)}
        /> */}
        <View style={[styles.registerButton], {flexDirection:'row'}}>
          <Text style={[textStyles.smallRegular, { color: colors.offBlack }]}>
            Have an account? 
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={[textStyles.normalSemiBold, { color: colors.primary }]}>  Sign In</Text>
          </TouchableOpacity>
    
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: 'relative',
    left: widthPercentageToDP(2),
    top: heightPercentageToDP(2),
  },
  registerButton: {
    position: 'absolute',
    bottom: heightPercentageToDP(3),
    flexDirection: 'row',
    width: widthPercentageToDP(50),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SignUpScreen;
