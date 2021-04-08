// Async Storage
import AsyncStorage from '@react-native-community/async-storage'
import SaveItemInStorage from '../SaveItemInStorage'
import GetItemInStorage from '../GetItemInStorage'
import LoginChecker from './LoginChecker';


////////////////////
// Firebase //
////////////////////
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase-firestore'



// Users will be checked with each login for token, if not set it
const CheckLoginToken = async () =>{
    //Automatically try and get the user's token
      try{
        // Just need to pass in a Key for storage, need to await the promise
        const email = await GetItemInStorage("AUTH_EMAIL");
        const pass = await GetItemInStorage("AUTH_PASSWORD");
        console.log("Checking login Token")
        if(!email && !pass){
          // Set the default user to Guest if the user is not logged in
          console.log("No token found, setting as guest")
          // Save the AUTH_TOKEN as GUEST
          await SaveItemInStorage("AUTH_EMAIL", "GUEST")
          await SaveItemInStorage("AUTH_PASSWORD", "GUEST")

          return "GUEST";
        }else{
          // If the previous token was GUEST
          if(email === "GUEST" && pass === "GUEST"){ 
            console.log("Returning as GUEST")
            return "GUEST"
          }

          console.log(email, pass)

          if(email && pass){
            // Email and password exists, checking the actual user now.

            console.log("Email and pass exist")
            let user = await firebase.auth().currentUser;
            if(!user){
              console.log("User not found!, will try and login")
              LoginChecker().then((results)=>{
                console.log("User is logged in : ", results)
                return "USER"
              })

              return "USER"
            }
            console.log("This user is a real user, tryign to login now")
            return "USER"
          }

        }
      }catch(e){
        console.log("Error Occured : " , e)
      }
  }
export default  CheckLoginToken