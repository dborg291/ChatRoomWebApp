import React, { useState } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { Button, Card } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import constants from './constants';

import SignIn from './components/SignIn';
import SignOut from './components/SignOut';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: constants.apiKey,
    authDomain: constants.authDomain,
    projectId: constants.projectId,
    storageBucket: constants.storageBucket,
    messagingSenderId: constants.messagingSenderId,
    appId: constants.appId,
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
        {user ? (
          <>
            <h4>Current Chat Rooms</h4>
            <LoadChatRooms />
            <NewChatRoomForm />
          </>
        ) : (
          <SignIn auth={auth} firebase={firebase} />
        )}
      </section>
    </div>
  );
}

function NewChatRoomForm() {
  const [formValue, setFormValue] = useState('');

  const createNewChatRoom = async (e) => {
    const { uid, displayName } = auth.currentUser;
    const chatRoomsRef = firestore.collection('chatRooms');
    e.preventDefault();

    await chatRoomsRef.add({
      name: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      creator: {
        uid,
        displayName,
      },
      users: [uid],
    });

    setFormValue('');
  };

  return (
    <form onSubmit={createNewChatRoom}>
      <h4>Create New Chat Room</h4>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
      <button type="submit">Create Room</button>
    </form>
  );
}

function LoadChatRooms() {
  const chatRoomsRef = firestore.collection('chatRooms');
  const query = chatRoomsRef.orderBy('createdAt').limit(25);
  const [chatRooms] = useCollectionData(query, { idField: 'id' });

  return (
    <>
      {chatRooms &&
        chatRooms.map((room) => <ChatRoom key={room.id} roomInfo={room} />)}
    </>
  );
}

function ChatRoom(props) {
  const { name, creator, id, users } = props.roomInfo;
  const { uid } = auth.currentUser;
  const joinRoom = async (id) => {
    console.log('Joinging room: ' + id);
    const { uid } = auth.currentUser;
    const chatRoomRef = firestore.collection('chatRooms').doc(id);
    await chatRoomRef.set(
      {
        users: [uid],
      },
      { merge: true }
    );
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Created By: {creator.displayName}
        </Card.Subtitle>
        <Card.Text>Some for of description</Card.Text>
        {users.includes(uid) ? (
          'Already a member of the room.'
        ) : (
          <Button variant="primary" onClick={() => joinRoom(id)}>
            Join
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default App;
