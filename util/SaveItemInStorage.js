import AsyncStorage from '@react-native-community/async-storage'
/*

  Async storage : KEY , VALUE => Will stay locally
  Just pass the key and value for whatever you want to store, nice and simple
  Resolve the error checking on your function side not here.


*/
export default SaveItemInStorage = async (key, value) =>{
    try {
        await AsyncStorage.setItem(
          key, value
        );
      } catch (error) {
        console.log(e)
    }
}