// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import { useRouteMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGY8x-7yDM4v7E_qhbCg2Uxjh5GVcoxis",
  authDomain: "tryingadmn.firebaseapp.com",
  projectId: "tryingadmn",
  storageBucket: "tryingadmn.appspot.com",
  messagingSenderId: "424062597033",
  appId: "1:424062597033:web:1ee4cb710f172a0fe4f6b8",
  measurementId: "G-VVY2B3VVPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 const auth = getAuth(app);
 const storage = getStorage(app);


export function signUp(email,password){
   return createUserWithEmailAndPassword(auth,email,password)
}

//to sign in
export function login(email,password){
    return signInWithEmailAndPassword(auth,email,password)
}
//to sign out the function
export function logout(){
    return signOut(auth)
 }
 
//custoom react hook
export function useAuth(){
    const [currentUser, setCurrentUser]= useState();
    useEffect(()=>{

      const unsub =  onAuthStateChanged(auth, user => {setCurrentUser(user)});
      return unsub;
    },[])
    return currentUser;
}

//storage
export async function upload(file,currentUser,setLoading){
  const fileRef = ref(storage,currentUser.uid );
  setLoading(true);
  
 const snapshot = await uploadBytes(fileRef,file);


 const photoURL = await getDownloadURL(fileRef);
 updateProfile(currentUser, {photoURL});


 setLoading(false);
 alert("you have uploaded a picture")
}