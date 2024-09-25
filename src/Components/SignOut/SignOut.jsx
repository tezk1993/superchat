import styles from "./SignOut.module.css";
import React from 'react'
import firebase from 'firebase/compat/app';
import { signInAnonymously } from "firebase/auth";
import {app,auth,firestore} from '../../firebase';

import React from 'react'

export const SignOut = () => {
  return (
    <div>SignOut</div>
  )
}
