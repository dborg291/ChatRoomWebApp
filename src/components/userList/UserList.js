import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import User from './User';
import './UserList.css'

export default function UserList(props) {

  const { firestore, roomInfo } = props;
  const userRef = firestore.collection('users');
  const [users] = useCollectionData(userRef, { idField: 'id' });

  if (users) {
    return (
      <div className='user-list'>
        {users.map(user => (
          roomInfo.users.includes(user.id) ? (<User user={user} />) : null))}
      </div>
    )
  } else
    return null
}
