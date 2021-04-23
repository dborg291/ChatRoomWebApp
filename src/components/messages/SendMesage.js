import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { IoMdSend } from 'react-icons/io'

export default function SendMesage(props) {
  const { auth, firebase, firestore, refDiv } = props;
  const { name, id, users } = props.roomInfo;
  const [message, setMessage] = useState('');
  const { uid, displayName, photoURL } = auth.currentUser;

  const createMessage = async (e) => {
    const messagesRef = firestore.collection('messages');
    e.preventDefault();

    await messagesRef
      .add({
        text: message,
        author: {
          uid,
          displayName,
          photoURL,
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
    refDiv.current.scrollIntoView({ behavior: 'smooth' })
  };

  if (!users.includes(uid)) return null;
  else
    return (
      <form onSubmit={createMessage} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." style={{ width: '100%', backgroundColor: '#2F3136', borderColor: '#2F3136', borderRadius: '8px', color: '#FFFFFF' }} required />
        <Button type="submit" variant='dark'><IoMdSend /></Button>
      </form>
    );
}
