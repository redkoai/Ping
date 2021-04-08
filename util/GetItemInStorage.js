import AsyncStorage from '@react-native-community/async-storage'
/*

  Async storage : KEY , VALUE => Will stay locally
  To retreive the value, you have to return it as a resolved promise
  Rather than resolving the promise here, please resolve it in an await
  where used.

*/


export default GetItemInStorage = async (key) =>{
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Return the promises resolved result. 
      return value
    }
  } catch (error) {
    console.log("Error : " , error);
  }
}