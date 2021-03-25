import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDqe7nz6R-RLusOkFPAyD5v78_1w3a-ELg',
    authDomain: 'chatroomwebapp.firebaseapp.com',
    projectId: 'chatroomwebapp',
    storageBucket: 'chatroomwebapp.appspot.com',
    messagingSenderId: '639511985569',
    appId: '1:63951198556yarn 9:web:710a3684dd3c4cfed69fe0',
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <SignOut auth={auth} />
      </header>
      <section>
        {user ? <CreateChatRoom /> : <SignIn auth={auth} firebase={firebase} />}
      </section>
    </div>
  );
}

function CreateChatRoom() {
  const messagesRef = firestore.collection('chatRooms');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [chatRooms] = useCollectionData(query, { idField: 'id' });

  return (
    <>
      {chatRooms &&
        chatRooms.map((room) => <ChatRoom key={room.id} roomInfo={room} />)}
    </>
  );
}

function ChatRoom(props) {
  const { name } = props.roomInfo;

  return <p>{name}</p>;
}

export default App;
