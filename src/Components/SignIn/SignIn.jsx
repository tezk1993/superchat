import styles from "./SignIn.module.css";
import React from 'react'
import firebase from 'firebase/compat/app';


const auth = firebase.auth();

export const SignIn = () => {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

  return (
    <button onClick={signInWithGoogle}>Sign in with Googles</button>
  )
}
