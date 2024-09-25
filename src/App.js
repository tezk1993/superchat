import {app,auth,firestore} from './firebase';
import './App.css';

import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 

import {useAuthState} from 'react-firebase-hooks/auth';

import { SignIn } from './Components/SignIn/SignIn';
import { ChatRoom } from './Components/ChatRoom/ChatRoom';
import { useEffect, useState } from 'react';

function App() {
  const [user] = useAuthState(auth);
  const [animalNames,setAnimalNames] = useState([]);

  useEffect(() => {
    fetch('/animals.json')
    .then((response) => response.json())
    .then((json) => setAnimalNames(json.animals));
  }, []);
  if(auth.currentUser != null){
    if(auth.currentUser.displayName == null){
      auth.currentUser.displayName = animalNames[Math.floor(Math.random()*animalNames.length)] + Math.floor(Math.random()*animalNames.length);
    }
  }


  return (
    
    <div className="App">
      {user ? 
          <>
            <header className="App-header" style={user ?{ display:'flex'} : {display:'none'}}>
              <h1>Superchat</h1>
              <h2>Hi there - {auth.currentUser.displayName} !</h2>
              <SignOut/>
            </header>
              <ChatRoom/>
          </>
        :
        <div>
            <SignIn/>
        </div>
        }
    </div>
  
  );
}

function SignOut(){

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
export {auth}


