import AsyncStorage from "@react-native-community/async-storage";
import * as firebase from "firebase";
import SaveItemInStorage from "./SaveItemInStorage";

const LogOutUser = async () =>{
    // sign the user out of firebase.
    await firebase.auth().signOut().then(async (results)=>{
        console.log("Resetting async storacge")

        await SaveItemInStorage("AUTH_EMAIL", "GUEST")
        await SaveItemInStorage("AUTH_PASSWORD", "GUEST")

        // Set async storage to 0's on logout, dont want users spamming this 
        await SaveItemInStorage("FORTUNE_READING_COUNT", "0")
        await SaveItemInStorage("FORTUNE_READING_LAST_USE", new Date().getTime().toString())
        await SaveItemInStorage("PREVIOUS_FORTUNE_COUNT", "0")
        await SaveItemInStorage("CARD_READING_LAST_USE", "0");
        await SaveItemInStorage("CARD_READING_COUNT", "0");
        await SaveItemInStorage("CARD_READING_LAST_USE",new Date().getTime().toString())

    }).catch(async(e) =>{
        console.log(e);
        console.log("Resetting async storacge")
        
        await SaveItemInStorage("AUTH_EMAIL", "GUEST")
        await SaveItemInStorage("AUTH_PASSWORD", "GUEST")

        // Set async storage to 0's on logout, dont want users spamming this 
        await SaveItemInStorage("FORTUNE_READING_COUNT", "0")
        await SaveItemInStorage("FORTUNE_READING_LAST_USE", new Date().getTime().toString())


        await SaveItemInStorage("PREVIOUS_FORTUNE_COUNT", "0")
        await SaveItemInStorage("CARD_READING_LAST_USE", "0");
        await SaveItemInStorage("CARD_READING_COUNT", "0");
        await SaveItemInStorage("CARD_READING_LAST_USE",new Date().getTime().toString())


    });
    console.log("Logged user out!")

}

export default LogOutUser