import React, { useState } from 'react';

export default function SendMesage(props) {
  const { auth, firebase, firestore } = props;
  const { name, id, users } = props.roomInfo;
  const [message, setMessage] = useState('');
  const { uid, displayName } = auth.currentUser;

  const createMessage = async (e) => {
    const messagesRef = firestore.collection('messages');
    e.preventDefault();

    await messagesRef
      .add({
        text: message,
        author: {
          uid,
          displayName,
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        roomId: id,
      })
      .then(async (result) => {
        const chatRoomsRef = firestore.collection('chatRooms').doc(id);
        await chatRoomsRef.update({
          messages: firebase.firestore.FieldValue.arrayUnion(result.id),
        });
      });

    setMessage('');
  };

  if (!users.includes(uid)) return null;
  else
    return (
      <form onSubmit={createMessage}>
        <h4>Send Message to: {name}</h4>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    );
}
