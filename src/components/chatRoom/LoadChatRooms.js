import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatRoom from './ChatRoom';

export default function LoadChatRooms(props) {
  const { auth, firebase, firestore } = props;
  const chatRoomsRef = firestore.collection('chatRooms');
  const query = chatRoomsRef.orderBy('createdAt').limit(25);
  const [chatRooms] = useCollectionData(query, { idField: 'id' });

  return (
    <>
      {chatRooms &&
        chatRooms.map((room) => (
          <ChatRoom
            key={room.id}
            roomInfo={room}
            auth={auth}
            firebase={firebase}
            firestore={firestore}
            setCurrentRoom={props.setCurrentRoom}
          />
        ))}
    </>
  );
}
