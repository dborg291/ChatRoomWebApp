import React from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import constants from './constants';

import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import NewChatRoomForm from './components/chatRoom/NewChatRoomForm';
import LoadChatRooms from './components/chatRoom/LoadChatRooms';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: constants.apiKey,
    authDomain: constants.authDomain,
    projectId: constants.projectId,
    storageBucket: constants.storageBucket,
    messagingSenderId: constants.messagingSenderId,
    appId: constants.appId,
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <SignOut auth={auth} />
      </header>
      <section>
        {user ? (
          <>
            <h4>Current Chat Rooms</h4>
            <LoadChatRooms
              auth={auth}
              firebase={firebase}
              firestore={firestore}
            />
            <NewChatRoomForm
              auth={auth}
              firebase={firebase}
              firestore={firestore}
            />
          </>
        ) : (
          <SignIn auth={auth} firebase={firebase} />
        )}
      </section>
    </div>
  );
}

// function LoadChatRooms() {
//   const chatRoomsRef = firestore.collection('chatRooms');
//   const query = chatRoomsRef.orderBy('createdAt').limit(25);
//   const [chatRooms] = useCollectionData(query, { idField: 'id' });

//   return (
//     <>
//       {chatRooms &&
//         chatRooms.map((room) => <ChatRoom key={room.id} roomInfo={room} />)}
//     </>
//   );
// }

// function ChatRoom(props) {
//   const { name, creator, id, users } = props.roomInfo;
//   const { uid } = auth.currentUser;
//   const joinRoom = async (id) => {
//     console.log('Joinging room: ' + id);
//     const chatRoomRef = firestore.collection('chatRooms').doc(id);
//     await chatRoomRef.update(
//       {
//         users: firebase.firestore.FieldValue.arrayUnion(uid),
//       },
//       { merge: true }
//     );
//   };

//   return (
//     <>
//       <Card style={{ width: '18rem' }}>
//         <Card.Body>
//           <Card.Title>{name}</Card.Title>
//           <Card.Subtitle className="mb-2 text-muted">
//             Created By: {creator.displayName}
//           </Card.Subtitle>
//           <Card.Text>Some for of description</Card.Text>
//           {users.includes(uid) ? (
//             'Already a member of the room.'
//           ) : (
//             <Button variant="primary" onClick={() => joinRoom(id)}>
//               Join
//             </Button>
//           )}
//         </Card.Body>
//       </Card>
//       <LoadMessages roomInfo={props.roomInfo} />
//       <SendMessage roomInfo={props.roomInfo} />
//     </>
//   );
// }

// function SendMessage(props) {
//   const { name, id } = props.roomInfo;
//   const [message, setMessage] = useState('');

//   const createMessage = async (e) => {
//     const { uid, displayName } = auth.currentUser;
//     const messagesRef = firestore.collection('messages');
//     e.preventDefault();

//     await messagesRef
//       .add({
//         text: message,
//         author: {
//           uid,
//           displayName,
//         },
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//         roomId: id,
//       })
//       .then(async (result) => {
//         const chatRoomsRef = firestore.collection('chatRooms').doc(id);
//         await chatRoomsRef.update({
//           messages: firebase.firestore.FieldValue.arrayUnion(result.id),
//         });
//       });

//     setMessage('');
//   };

//   return (
//     <form onSubmit={createMessage}>
//       <h4>Send Message to: {name}</h4>
//       <input value={message} onChange={(e) => setMessage(e.target.value)} />
//       <button type="submit">Send</button>
//     </form>
//   );
// }

// function LoadMessages(props) {
//   const { id, users } = props.roomInfo;
//   const { uid } = auth.currentUser;
//   const messagesRef = firestore.collection('messages');
//   const query = messagesRef.orderBy('createdAt');
//   const [messages] = useCollectionData(query, { idField: 'id' });

//   return (
//     <>
//       {users.includes(uid) &&
//         messages &&
//         messages.map((message) =>
//           message.roomId === id ? (
//             <>
//               {message.text}
//               <br />
//             </>
//           ) : null
//         )}
//     </>
//   );
// }

export default App;
