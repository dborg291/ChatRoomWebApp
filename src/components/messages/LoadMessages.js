import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function LoadMessages(props) {
  const { auth, firestore } = props;
  const { id, users } = props.roomInfo;
  const { uid } = auth.currentUser;
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt');
  const [messages] = useCollectionData(query, { idField: 'id' });

  return (
    <>
      {users.includes(uid) &&
        messages &&
        messages.map((message) =>
          message.roomId === id ? (
            <>
              {message.author.displayName}: {message.text}
              <br />
            </>
          ) : null
        )}
    </>
  );
}
