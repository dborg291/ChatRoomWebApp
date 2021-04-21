import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { CgMathPlus } from 'react-icons/cg'
import './Home.css'

import LoadChatRooms from '../../components/chatRoom/LoadChatRooms';
import LoadMessages from '../../components/messages/LoadMessages';
import NewChatRoomFrom from '../../components/chatRoom/NewChatRoomForm'

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
    <>
      <Row>
        <Col md="auto" className="side-bar"  >
          <Container sticky='top'>
            <LoadChatRooms
              auth={auth}
              firebase={firebase}
              firestore={firestore}
              setCurrentRoom={setCurrentRoom}
            />
            <div className="button-container">
              <Button onClick={handleShow} className="new-chat-room-button">
                <CgMathPlus size='35' />
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
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
              </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </Col>

        <Col className="home-body">
          {currentRoom === "NO_ROOM" ? (
            <h1>Please join or make a room</h1>
          ) : chatRoom === undefined ? (<h1>Loading...</h1>) :
            <LoadMessages
              roomInfo={chatRoom[0]}
              auth={auth}
              firestore={firestore}
              firebase={firebase}
            />}

        </Col>
      </Row>
    </>
  )
}
