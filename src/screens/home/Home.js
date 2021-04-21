import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './Home.css'

import LoadChatRooms from '../../components/chatRoom/LoadChatRooms';
import LoadMessages from '../../components/messages/LoadMessages';

export default function Home(props) {
  const { auth, firebase, firestore } = props;
  const [currentRoom, setCurrentRoom] = useState(localStorage.getItem('currentRoom'));

  const chatRoomsRef = firestore.collection('chatRooms');
  const query = chatRoomsRef.where(firebase.firestore.FieldPath.documentId(), '==', localStorage.getItem('currentRoom'));
  const [chatRoom] = useCollectionData(query, { idField: 'id' });
  return (
    <>
      <Row>
        <Col md="auto" className="side-bar">
          <LoadChatRooms
            auth={auth}
            firebase={firebase}
            firestore={firestore}
            setCurrentRoom={setCurrentRoom}
          />

        </Col>
        <Col className="home-body">
          {currentRoom == null ? (
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
