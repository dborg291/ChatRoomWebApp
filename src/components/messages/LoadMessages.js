import React, { useRef } from 'react';
import SendMessage from './SendMesage'
import Avatar from 'react-avatar';
import { Col, Row } from 'react-bootstrap'
import Timpestamp from 'react-timestamp'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './LoadMessages.css'


export default function LoadMessages(props) {
  const { auth, firestore, firebase } = props;
  const { id, users, } = props.roomInfo;
  const { uid } = auth.currentUser;
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt');
  const [messages] = useCollectionData(query, { idField: 'id' });

  const dummy = useRef();

  return (
    <>
    <div style={{height: '95%', overflowY: 'scroll'}}>
      {users.includes(uid) &&
        messages &&
        messages.map((message) =>
          message.roomId === id ? (
            <div key={message.id}>
              <Row style={{ overflow: 'hidden' }}>
                <Col md="auto">
                  <Avatar src={message.author.photoURL} round="50px" size="40px" />
                </Col>
                <Col>
                  <div className="message-header">

                    <div className="message-name">
                      {message.author.displayName}
                    </div>
                    <div className="message-date">
                      {message.createdAt == null ? (null) :
                        <Timpestamp date={message.createdAt.toDate()} />}
                    </div>
                  </div>
                  {message.text}
                </Col>
              </Row>

              <br />
            </div>
          ) : null
        )}
      </div>
      <div ref={dummy}></div>
      <div style={{height: '5%', minWidth: '50vh', bottom: 10}}>
        <SendMessage
          roomInfo={props.roomInfo}
          auth={auth}
          firebase={firebase}
          firestore={firestore}
          refDiv={dummy}
        />
      </div>
    </>
  );
}
