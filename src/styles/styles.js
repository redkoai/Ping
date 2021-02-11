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
    },

    homeEmpty1: {
        flex: 1,
        resizeMode:'contain',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        opacity: 1
    },
    textinput:{
        fontSize:15,
        backgroundColor:'lightgray',
        borderColor:'gray',
        borderRadius:4,
        borderWidth:0,
        height:50,
        width:'99%'
    }
})


export default styles;