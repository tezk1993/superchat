import './App.css';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { useState } from 'react';

import { useRef } from 'react';
firebase.initializeApp({
  apiKey: "AIzaSyAAutQqnfIiHMXtGf8besDD8oeM5q6teu0",
  authDomain: "superchat-a42cc.firebaseapp.com",
  projectId: "superchat-a42cc",
  storageBucket: "superchat-a42cc.appspot.com",
  messagingSenderId: "816103006469",
  appId: "1:816103006469:web:dac4b25f5ba24a4f47976c",
  measurementId: "G-W7QDFTX92W"
})

const firestore = firebase.firestore();
const auth = firebase.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
      
    </div>
  );
}

function SignIn(){

  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut(){

  

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom(){
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');
  console.log(firestore.appId)
  const dummy = useRef();
  const sendMessage = async(e) =>{
    e.preventDefault();

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
    <>
      <h1>ChatRoom</h1>
      <h2>Hi there - {auth.currentUser.displayName} !</h2>
      <SignOut/>

      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        <div ref={dummy}></div>

      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type='submit'>Send <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
      </form>

    </>
  )
}


export const ChatMessage = (props) => {
  const {text, uid,photoURL} = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt='user image'/>
      <p>{text}</p>
    </div>
  )
}


export default App;



