import { Platform, StyleSheet } from 'react-native';
// import { Dimensions } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from '../../util/scaler';

const styles = StyleSheet.create({
  homeEmpty: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    opacity: 1,
  },

  homeEmpty1: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    opacity: 1,
  },
});

export const textStyles = StyleSheet.create({
  // big
  bigRegular: {
    fontFamily: 'FiraSans_400Regular',
    fontSize: 20,
  },
  bigMedium: {
    fontFamily: 'FiraSans_500Medium',
    fontSize: 20,
  },
  bigSemiBold: {
    fontFamily: 'FiraSans_600SemiBold',
    fontSize: 20,
  },
  bigBold: {
    fontFamily: 'FiraSans_700Bold',
    fontSize: 20,
  },
  // normal
  normalRegular: {
    fontFamily: 'FiraSans_400Regular',
    fontSize: 14,
  },
  normalMedium: {
    fontFamily: 'FiraSans_500Medium',
    fontSize: 14,
  },
  normalSemiBold: {
    fontFamily: 'FiraSans_600SemiBold',
    fontSize: 14,
  },
  normalBold: {
    fontFamily: 'FiraSans_700Bold',
    fontSize: 14,
  },
  // small
  smallRegular: {
    fontFamily: 'FiraSans_400Regular',
    fontSize: 12,
  },
  smallMedium: {
    fontFamily: 'FiraSans_500Medium',
    fontSize: 12,
  },
  smallSemiBold: {
    fontFamily: 'FiraSans_600SemiBold',
    fontSize: 12,
  },
  smallBold: {
    fontFamily: 'FiraSans_700Bold',
    fontSize: 12,
  },
  // tiny
  tinyRegular: {
    fontFamily: 'FiraSans_400Regular',
    fontSize: 8,
  },
  tinyMedium: {
    fontFamily: 'FiraSans_500Medium',
    fontSize: 8,
  },
  tinySemiBold: {
    fontFamily: 'FiraSans_600SemiBold',
    fontSize: 8,
  },
  tinyBold: {
    fontFamily: 'FiraSans_700Bold',
    fontSize: 8,
  },
});

export const colors = {
  primary: '#3D8976',
  redError: '#FE5F5F',
  offBlack: '#555',
  darkGrey: '#777',
  offWhite: '#F7F8FA',
};

export const headerPaddings = {
  horizontal: widthPercentageToDP(6) + 2,
  vertical: Platform.OS === 'ios' ? 5 : 1,
};

export const headerStyles = {
  backgroundColor: 'white',
  shadowColor: 'transparent',
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0,
};

export const headerOptions = {
  headerTitle: false,
  headerStyle: headerStyles,
};

export default styles;
