import React from 'react'

import { User } from './User'
import { UserListHeader } from './UserListHeader'

export const UserList = ({ users, subtitle, onRemoveUser = null }) => (
  <div>
    <UserListHeader
      subtitle={subtitle}
      retrieveDate={users && users.meta.retrieveDate}
    />

    {(!users || !users.rows.length) && 'No users'}

    {users && users.rows.map(user =>
      <User
        user={user}
        onRemoveUser={onRemoveUser}
        key={user.id}
      />
    )}
  </div>
)
