import './ChatRoom.css'
import React from 'react';
import { BiMessageAltDetail, BiMessageAltEdit } from 'react-icons/bi'
import { ImEnter } from 'react-icons/im'
import { ImExit } from 'react-icons/im'
import { Button, Card } from 'react-bootstrap';


export default function ChatRoom(props) {
  const { auth, firebase, firestore } = props;
  const { name, id, users } = props.roomInfo;
  const { uid } = auth.currentUser;

  const joinRoom = async (id) => {
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

  const leaveRoom = async (id) => {
    if (id === localStorage.getItem('currentRoom')) {
      localStorage.setItem('currentRoom', 'NO_ROOM');
      props.setCurrentRoom('NO_ROOM');
    }
    const chatRoomRef = firestore.collection('chatRooms').doc(id);
    await chatRoomRef.update(
      {
        users: firebase.firestore.FieldValue.arrayRemove(uid),
      },
      { merge: true }
    );
  }

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
              <div className='room-buttons'>
                <BiMessageAltEdit size={26} color='43B581' />
                < Button variant="dark" onClick={() => leaveRoom(id)}>
                  <ImExit size={26} />
                </Button>
              </div>

            ) : (
              <div className='room-buttons'>
                < Button variant="dark" onClick={() => switchRoom(id)}>
                  <BiMessageAltDetail size={26} />
                </Button>
                < Button variant="dark" onClick={() => leaveRoom(id)}>
                  <ImExit size={26} />
                </Button>
              </div>)
          ) : (
            <div className='room-buttons'>
              <Button variant="dark" onClick={() => joinRoom(id)}>
                <ImEnter size={22} />
              </Button>
            </div>
          )}

        </Card.Body>
      </Card>
    </>
  );
}
