import React from 'react';
import './App.css';


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';



if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDqe7nz6R-RLusOkFPAyD5v78_1w3a-ELg",
    authDomain: "chatroomwebapp.firebaseapp.com",
    projectId: "chatroomwebapp",
    storageBucket: "chatroomwebapp.appspot.com",
    messagingSenderId: "639511985569",
    appId: "1:63951198556yarn 9:web:710a3684dd3c4cfed69fe0"
  })
}else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);
  console.log({user});

  return (
    <div className="App">
      <header className="App-header">
        <SignOut />
      </header>
      <section>
        {user ? <DisplayUserInfo client={user}/>: <SignIn />}
      </section>
    </div>
  );
}

function DisplayUserInfo(props){
  const user = props.client;
  return(
    <>
    <section>
      UserInfo:
    </section>
      <img src={user.photoURL} /> <br/>
      displayName: {user.displayName}<br/>
      email: {user.email}<br/>
    </>
  )
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
