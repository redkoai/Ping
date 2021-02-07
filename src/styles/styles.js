import { StyleSheet } from 'react-native';
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
    fontSize: 14,
  },
  bigMedium: {
    fontFamily: 'FiraSans_500Medium',
    fontSize: 14,
  },
  bigSemiBold: {
    fontFamily: 'FiraSans_600SemiBold',
    fontSize: 14,
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
  lightGray: '#F7F8FA',
  offBlack: '#555',
  redError: '#FE5F5F',
};

export default styles;
