import React from 'react'
import firebase from 'firebase/app';

const auth = firebase.auth();
const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }


export default function SignIn() {
  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}
