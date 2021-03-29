import React, { useState } from 'react';

export default function NewChatRoomForm(props) {
  const { auth, firebase, firestore } = props;
  const [roomName, setRoomName] = useState('');

  const createNewChatRoom = async (e) => {
    const { uid, displayName } = auth.currentUser;
    const chatRoomsRef = firestore.collection('chatRooms');
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
      <h4>Create New Chat Room</h4>
      <input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      <button type="submit">Create Room</button>
    </form>
  );
}
