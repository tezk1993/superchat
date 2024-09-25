import styles from "./SignIn.module.css";
import React from 'react'
import firebase from 'firebase/compat/app';
import { signInAnonymously } from "firebase/auth";
import {app,auth,firestore} from '../../firebase';

export const SignIn = () => {
    
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((result) => {
          console.log("Logged In", result);
        })
        .catch((error) => {
          console.log("Caught error Popup closed");
        });
    }

  const signInAnon = () => {
    signInAnonymously(auth)
    .then(() => {
      // Signed in..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  }


  return (
    <body>
        <div className={styles.signinframe}>
          <div className={styles.content}>
            <h2>Welcome To Superchat</h2>

                <button onClick={signInWithGoogle}>Sign in with Google</button>

                <button onClick={signInAnon}>Sign in anonymously </button>

          </div>
    
        </div>
    </body>
  )
}
