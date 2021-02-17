import React from 'react'

import {
  UserContainer,
  UserName,
  UserID
} from './styles'

import { CloseButton } from '../CloseButton'

export function User ({
  user: {
    id,
    name
  },
  onRemoveUser
}) {
  return (
    <UserContainer>
      <UserName>{name}</UserName>
      <UserID>id: {id}</UserID>
      <div><CloseButton onClick={() => onRemoveUser(id)} /></div>
    </UserContainer>
  )
}
