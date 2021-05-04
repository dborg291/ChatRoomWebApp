import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { CgMathPlus } from 'react-icons/cg'
import './Home.css'

import LoadChatRooms from '../../components/chatRoom/LoadChatRooms';
import LoadMessages from '../../components/messages/LoadMessages';
import NewChatRoomFrom from '../../components/chatRoom/NewChatRoomForm';
import SignOut from '../../components/auth/SignOut';
import UserList from '../../components/userList/UserList'

export default function Home(props) {
  const { auth, firebase, firestore } = props;
  const [currentRoom, setCurrentRoom] = useState(localStorage.getItem('currentRoom') === null ? ("NO_ROOM") : localStorage.getItem('currentRoom'));

  const chatRoomsRef = firestore.collection('chatRooms');
  const query = chatRoomsRef.where(firebase.firestore.FieldPath.documentId(), '==', currentRoom);
  const [chatRoom] = useCollectionData(query, { idField: 'id' });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Row style={{ width: '100vW', }}>
      <Col xs={2} className="side-bar">
        <Container sticky='top' style={{marginTop: 100}}>
          <LoadChatRooms
            auth={auth}
            firebase={firebase}
            firestore={firestore}
            setCurrentRoom={setCurrentRoom}
          />
          <div className="button-container">
            <Button onClick={handleShow} className="new-chat-room-button" variant='dark'>
              <CgMathPlus size='35' color='43B581' />
            </Button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Create a New Chat Room
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NewChatRoomFrom
                auth={auth}
                firebase={firebase}
                firestore={firestore}
                handleClose={handleClose}
              />
            </Modal.Body>
          </Modal>
          <div style={{position: 'absolute', minWidth: '25vh', top: 20}}>
            <SignOut auth={auth} />
          </div>
        </Container>
      </Col>

      <Col className="home-body">
        {currentRoom === "NO_ROOM" ? (
          <div className="button-container">
            <h1>Join an existing chat room or make a new one</h1>
          </div>
        ) : chatRoom === undefined || chatRoom.length === 0 ? (null) : //loading went here
          <div style={{ height: '100vH', position: 'relative', overflowY: 'auto' }}>
            <LoadMessages
              roomInfo={chatRoom[0]}
              auth={auth}
              firestore={firestore}
              firebase={firebase}
            />
          </div>}

      </Col>
      {currentRoom === "NO_ROOM" ? (null) : chatRoom === undefined || chatRoom.length === 0 ? (null) : //loading went here
        <Col xs={2} className="side-bar">
          <UserList
            roomInfo={chatRoom[0]}
            firestore={firestore}
          />
        </Col>}

    </Row>
  )
}
