import './ChatRoom.css'
import React from 'react';
import { Button, Card } from 'react-bootstrap';


export default function ChatRoom(props) {
  const { auth, firebase, firestore } = props;
  const { name, id, users } = props.roomInfo;
  const { uid } = auth.currentUser;

  const joinRoom = async (id) => {
    console.log('Joinging room: ' + id);
    localStorage.setItem('currentRoom', id);
    props.setCurrentRoom(id);
    const chatRoomRef = firestore.collection('chatRooms').doc(id);
    await chatRoomRef.update(
      {
        users: firebase.firestore.FieldValue.arrayUnion(uid),
      },
      { merge: true }
    );
  };

  const switchRoom = (id) => {
    localStorage.setItem('currentRoom', id);
    props.setCurrentRoom(id);
  }

  return (
    <>
      <br />
      <Card className="chat-room-card" >
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Current Member Count: {users.length}
          </Card.Subtitle>
          {users.includes(uid) ? (
            localStorage.getItem('currentRoom') === id ? (
              <>Current Room</>
            ) : (
              < Button variant="primary" onClick={() => switchRoom(id)}>
                Switch Room
              </Button>)
          ) : (
            <Button variant="primary" onClick={() => joinRoom(id)}>
              Join
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
