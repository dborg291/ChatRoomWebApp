import React from 'react';
import { Button } from 'react-bootstrap';
import { FiLogOut } from 'react-icons/fi'
import './SignOut.css';

export default function SignOut(props) {
  const { auth } = props;

  const signOut = () => {
    localStorage.removeItem('currentRoom');
    auth.signOut();
  }
  return (
    auth.currentUser && (
      <div className="sign-out">
        <Button onClick={() => signOut()} variant='dark'>
          <FiLogOut size={22} /> {' '}Sign Out
        </Button>
      </div>
    )
  );
}
