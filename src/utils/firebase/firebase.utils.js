import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { 
   getFirestore,
   doc, 
   getDoc, 
   setDoc,
   collection,
   writeBatch,
  query,
  getDocs,
 } from "firebase/firestore";

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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);

  });

  await batch.commit();
  console.log('done');
  
}
// getting categories from firestore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc; 
  }, {});

    return categoryMap;
}




export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
  ) => {

  if(!userAuth) return ;
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
            createdAt,
            ...additionalInformation,
        });
    }catch(error){
        console.log('error creating the user', error.message);
    }
  }
 //if user data exists then,
  //return userDocref
  return userDocref;

};

export const createAuthUserWithEmailAndPassword = async (email,password) => {

  if(!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);

};

export const signInAuthUserWithEmailAndPassword = async (email,password) => {

  if(!email || !password) return;

   return await signInWithEmailAndPassword(auth, email, password);

};

export const signOutUser = async () =>  await signOut(auth);

export const onAuthStateChangedListener =(callback) => 
  onAuthStateChanged(auth, callback);