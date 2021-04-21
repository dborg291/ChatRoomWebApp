import React from 'react';
import { Button } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'

export default function SignIn(props) {
  const { auth, firebase } = props;
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const { displayName, email, uid, photoURL } = result.user;
        const firestore = firebase.firestore();
        const userRef = firestore.collection('users').doc(uid);
        await userRef.set({
          displayName,
          email,
          photoURL,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button className="sign-in" onClick={signInWithGoogle} variant="light">
      <FcGoogle />
      {' '}
      Sign in with Google
    </Button>
  );
}
