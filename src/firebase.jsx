import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 
import { getApp,getApps,initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "superchat-a42cc.firebaseapp.com",
    projectId: "superchat-a42cc",
    storageBucket: "superchat-a42cc.appspot.com",
    messagingSenderId: "816103006469",
    appId: "1:816103006469:web:dac4b25f5ba24a4f47976c",
    measurementId: "G-W7QDFTX92W"
  };
  
const app = getApps().length ? getApp() : firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = getAuth();

export {app,auth,firestore}