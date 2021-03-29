import React from 'react';
import { Button, Card } from 'react-bootstrap';
import LoadMessages from '../messages/LoadMessages';
import SendMessage from '../messages/SendMesage';

export default function ChatRoom(props) {
  const { auth, firebase, firestore } = props;
  const { name, creator, id, users } = props.roomInfo;
  const { uid } = auth.currentUser;
  const joinRoom = async (id) => {
    console.log('Joinging room: ' + id);
    const chatRoomRef = firestore.collection('chatRooms').doc(id);
    await chatRoomRef.update(
      {
        users: firebase.firestore.FieldValue.arrayUnion(uid),
      },
      { merge: true }
    );
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Created By: {creator.displayName}
          </Card.Subtitle>
          <Card.Text>Some for of description</Card.Text>
          {users.includes(uid) ? (
            'Already a member of the room.'
          ) : (
            <Button variant="primary" onClick={() => joinRoom(id)}>
              Join
            </Button>
          )}
        </Card.Body>
      </Card>
      <LoadMessages
        roomInfo={props.roomInfo}
        auth={auth}
        firestore={firestore}
      />
      <SendMessage
        roomInfo={props.roomInfo}
        auth={auth}
        firebase={firebase}
        firestore={firestore}
      />
    </>
  );
}
