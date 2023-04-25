import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgA1ZcFJ0nsd0ga1iPMZSQP2L_q1LRkm4",
  authDomain: "star-clothing-db-85d08.firebaseapp.com",
  projectId: "star-clothing-db-85d08",
  storageBucket: "star-clothing-db-85d08.appspot.com",
  messagingSenderId: "249508161379",
  appId: "1:249508161379:web:df14a35b562e3bc8fbd556",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocref = doc(db, "users", userAuth.uid);

  console.log(userDocref);

  const userSnapshot = await getDoc(userDocref);

  console.log(userSnapshot);
  console.log(userSnapshot.exists());

   // if user data not exist then,
  //create / set the document with the data from userAuth in my collection
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
        await setDoc(userDocref, {
            displayName,
            email,
            createdAt
        });
    }catch(error){
        console.log('error creating the user', error.message);
    }
  }
 //if user data exists then,
  //return userDocref
  return userDocref;

};
