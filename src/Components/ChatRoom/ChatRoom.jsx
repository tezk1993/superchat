import React from 'react'
import styles from "./ChatRoom.module.css";
import { ChatMessage } from '../ChatMessage/ChatMessage';
import {app,auth,firestore} from '../../firebase';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import firebase from 'firebase/compat/app'; 
import { useRef } from 'react';

export const ChatRoom = () => {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, {idField: 'id'});
  
    const [formValue, setFormValue] = useState('');
    const dummy = useRef();
    const sendMessage = async(e) =>{
      e.preventDefault();
      if(formValue === "") return;
      const {uid,photoURL} = auth.currentUser;
  
      await messagesRef.add({
        text:formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      });
  
      setFormValue('');
  
      dummy.current.scrollIntoView({behavior: 'smooth'});
    }
    
    return (
      <div className={styles.container}>
        <main className={styles.messages}>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        </main>
        <div>
          <form  onSubmit={sendMessage} ref={dummy}>
            <input className={styles.textinput} value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
            <button disabled={formValue === "" ? true : false} id={styles.submitbutton}type='submit'>Send <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
          </form>
        </div>
      </div>
  )
  
}
