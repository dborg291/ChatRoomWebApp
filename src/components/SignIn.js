import React from 'react';

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
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}
