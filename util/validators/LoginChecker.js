
////////////////////
// Firebase //
////////////////////
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase-firestore'


// Async storage
import SaveItemInStorage from '../SaveItemInStorage'
import GetItemInStorage from '../GetItemInStorage'

const LoginChecker = async () =>{

    const SetTokenInLocalStorage = async (email, pass) => {
        try{
        // THIS IS A BAD WAY OF DOING THIS. But due to time constraint, we just do it like this for now
        // IN the future need to implement a token based login, should never expose user's credentials like so
        await SaveItemInStorage("AUTH_EMAIL", email)
        await SaveItemInStorage("AUTH_PASSWORD", pass)
        console.log("Stored New Credentials")
        }catch(e){
        console.log(e);
        }
    }
  
    try{
        const user = firebase.auth().currentUser;
        // If the user isn't logged in then login
        const email = await GetItemInStorage("AUTH_EMAIL");
        const password = await GetItemInStorage("AUTH_PASSWORD");
        if(!user){
            if(email && password){
                try{
                    await firebase.auth().signInWithEmailAndPassword(email, password).then(async (data) => {
                            console.log('User signed in!');
                            await SetTokenInLocalStorage(email, password)
                            return true;
                            // Store to firebase
                    }).catch(async (error) => {
                            console.log(error)
                            if (error.code === 'auth/email-already-in-use') {
                                console.log(error.code)
                                return false;
                            }
                            if (error.code === 'auth/invalid-email') {
                                console.log(error.code)
                                return false;

                            }
                        console.log(error.code)
                        return false;

                        });
                    }catch(e){
                    console.log(e)
                    return false;
                }
            }
        }else{
            return true;
        }
    }catch(e){
            console.log(e)
            return false;
    }

   

}

export default LoginChecker