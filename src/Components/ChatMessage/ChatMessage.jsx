import React from 'react'
import {app,auth,firestore} from '../../firebase';
import styles from "./ChatMessage.module.css";

export const ChatMessage = (props) => {
  const {text, uid,photoURL} = props.message;


  return (
    <div className={uid === auth.currentUser.uid ? styles.sent : styles.received} id={styles.message}>
      <img src={photoURL} alt='user image'/>
      <p>{text}</p>
    </div>
  )
}