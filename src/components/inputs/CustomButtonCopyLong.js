import { textStyles, colors } from 'ping/src/styles/styles';
import { heightPercentageToDP, widthPercentageToDP } from 'ping/util/scaler';
import { actuatedNormalize } from "ping/util/fontScaler";
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

function CustomButtonCopyLong({
  icon,
  text,
  onPress,
  shadow = false,
  primary = false,
  narrow = false,
  small = false,
  outline = false,
  disabled = false,
  backgroundImage,
  isLocalImage
}) 

{
  
  const getImage = (img) => {
    if (backgroundImage === "1.png") {
      return {
        image: require("../../../assets/invites/1.png"),
      };
    } else if (backgroundImage === "2.png") {
      return { image: require("../../../assets/invites/2.png") };
    } else if (backgroundImage === "3.png") {
      return { image: require("../../../assets/invites/3.png") };
    } else {
      return { image: require("../../../assets/invites/3.png") };
    }
  };
 


  return (
    <View style={styles.container}>
    
      <TouchableOpacity
        style={[
          styles.button,
          small ? styles.buttonSmall : narrow ? styles.buttonNarrow : styles.buttonLarge,
          primary ? styles.buttonPrimary : styles.buttonSecondary,
          outline && styles.buttonOutline,
          shadow && styles.buttonShadow,
          disabled && primary && styles.primaryDisabled,
          disabled && !primary && styles.secondaryDisabled,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        {icon && <Image source={icon} style={styles.icon} />}
        {!isLocalImage?<ImageBackground source={getImage().image} style={{ 
    
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:'100%'
   
  }}>
        <Text
          style={[
            textStyles.bigBold,
            //small ? textStyles.normalBold : textStyles.bigBold,
            primary ? styles.textPrimary : styles.textSecondary,
            outline && styles.textOutline,
            disabled && primary && styles.textPrimaryDisabled,
            disabled && !primary && styles.textSecondaryDisabled,
          ]}
        >
          {text}
        </Text>
        </ImageBackground>:<ImageBackground source={{uri:backgroundImage}} style={{ 
    
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height:'100%'
   
  }}>
        <Text
          style={[
            textStyles.bigBold,
            //small ? textStyles.normalBold : textStyles.bigBold,
            primary ? styles.textPrimary : styles.textSecondary,
            outline && styles.textOutline,
            disabled && primary && styles.textPrimaryDisabled,
            disabled && !primary && styles.textSecondaryDisabled,
          ]}
        >
          {text}
        </Text>
        </ImageBackground>}
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: heightPercentageToDP(1.2),
    marginBottom: heightPercentageToDP(1.5),
    //borderColor: 'red',
    //borderWidth: 1,
  },
  button: {
    height: heightPercentageToDP(20),
    paddingHorizontal: widthPercentageToDP(1),
    borderRadius: widthPercentageToDP(1),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLarge: {
    width: widthPercentageToDP(30),
    height: heightPercentageToDP(Platform.OS === 'ios' ? 18 : 6.3),
  },
  buttonNarrow: {
    width: widthPercentageToDP(47),
    height: heightPercentageToDP(Platform.OS === 'ios' ? 5.8 : 6.3),
  },
  buttonSmall: {
    minWidth: widthPercentageToDP(28),
    height: heightPercentageToDP(Platform.OS === 'ios' ? 4.2 : 4.8),
  },
  buttonShadow: {
    shadowColor: colors.offBlack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor: colors.primary,
    borderWidth: 3,
  },
  buttonSecondary: {
    backgroundColor: 'white',
  },

  //TODO: PASS IMAGE 

  primaryDisabled: {
    backgroundColor: '#ccc',
  },
  secondaryDisabled: {
    backgroundColor: '#f5f5f5',
  },
  icon: {
    resizeMode: 'contain',
    width: 35,
    height: heightPercentageToDP(2.5),
    marginRight: 8,
  },
  textPrimary: {
    color: 'white',
    fontSize:actuatedNormalize(11)
  },
  textOutline: {
    color: colors.primary,
  },
  textSecondary: {
    color: colors.primary,
    fontSize:actuatedNormalize(11)
  },
  textPrimaryDisabled: {
    color: 'white',
  },
  textSecondaryDisabled: {
    color: '#aaa',
  },
});

export default CustomButtonCopyLong;
