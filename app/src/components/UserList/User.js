import React from 'react'

import {
  UserContainer,
  UserInfo,
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
      <UserInfo>
        <UserName>{name}</UserName>
        <UserID>id: {id}</UserID>
      </UserInfo>

      {onRemoveUser &&
        <div><CloseButton onClick={() => onRemoveUser(id)} /></div>
      }
    </UserContainer>
  )
}
