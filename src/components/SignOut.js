import React from 'react';

export default function SignOut(props) {
  const { auth } = props;
  return (
    auth.currentUser && (
      <>
        <button className="sign-out" onClick={() => auth.signOut()}>
          Sign Out
        </button>
      </>
    )
  );
}
