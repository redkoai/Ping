import {StyleSheet} from "react-native";
// import { Dimensions } from 'react-native';
import {widthPercentageToDP,heightPercentageToDP} from '../../util/scaler'

const styles = StyleSheet.create({

    homeEmpty: {
        flex: 1,
        resizeMode:'contain',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        opacity: 1
    }

})


export default styles;