import React from 'react'
import Avatar from 'react-avatar'
import { Card } from 'react-bootstrap'
import './User.css'

export default function User(props) {
  const { displayName, photoURL } = props.user;

  return (
    <div className="user-card">
      <Avatar src={photoURL} round="50px" size="40px" />
      <Card.Text>
        &nbsp; {displayName}
      </Card.Text>
    </div>
  )
}
