import React from 'react'

import { UserListHeaderContainer, UserListTimestamp } from './styles'

import { getFormattedRetrieveDate } from '../../util/getFormattedRetrieveDate'

export function UserListHeader ({ retrieveDate, subtitle }) {
  const displayDate = retrieveDate
    ? getFormattedRetrieveDate(retrieveDate)
    : 'not loaded'

  return (
    <UserListHeaderContainer>
      <div>
        <h2>User list</h2>&nbsp;
        {subtitle && <h3>➜ {subtitle}</h3>}&nbsp;
      </div>
      <UserListTimestamp>{displayDate}</UserListTimestamp>
    </UserListHeaderContainer>
  )
}
