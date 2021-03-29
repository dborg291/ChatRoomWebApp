import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import constants from './constants';

import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import NewChatRoomForm from './components/chatRoom/NewChatRoomForm';
import LoadChatRooms from './components/chatRoom/LoadChatRooms';

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
            <LoadChatRooms
              auth={auth}
              firebase={firebase}
              firestore={firestore}
            />
            <NewChatRoomForm
              auth={auth}
              firebase={firebase}
              firestore={firestore}
            />
          </>
        ) : (
          <SignIn auth={auth} firebase={firebase} />
        )}
      </section>
    </div>
  );
}

export default App;
