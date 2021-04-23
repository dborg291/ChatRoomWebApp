import React, { useState } from 'react';
import { Button } from 'react-bootstrap'

export default function NewChatRoomForm(props) {
  const { auth, firebase, firestore } = props;
  const [roomName, setRoomName] = useState('');

  const createNewChatRoom = async (e) => {
    const { uid, displayName } = auth.currentUser;
    const chatRoomsRef = firestore.collection('chatRooms');
    props.handleClose();
    e.preventDefault();

    await chatRoomsRef.add({
      name: roomName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      creator: {
        uid,
        displayName,
      },
      users: [uid],
      messages: [],
    });

    setRoomName('');
  };

  return (
    <form onSubmit={createNewChatRoom}>
      Room Name: {' '}
      <input value={roomName} onChange={(e) => setRoomName(e.target.value)} required />
      <br />
      <br />
      <Button type="submit" variant='dark'>Create Room</Button>
    </form>
  );
}
