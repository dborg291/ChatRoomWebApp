import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import constants from './constants';

import SignIn from './components/auth/SignIn';


import Home from './screens/home/Home'

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
      <section>
        {user ? (
          <Home
            auth={auth}
            firebase={firebase}
            firestore={firestore}
          />
        ) : (
          <div className="welcome">
            <h1>
              Chat Room Web App
            </h1>
            <SignIn auth={auth} firebase={firebase} />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
