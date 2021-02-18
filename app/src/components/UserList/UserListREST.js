import React, { useState, useEffect } from 'react'

import { User } from './User'
import { UserListHeader } from './UserListHeader'

import { getUserList, removeUser } from '../../util/userActions'

export function UserListREST () {
  const [users, setUsers] = useState(null)

  const requestUserList = async () => {
    try {
      setUsers(await getUserList())
    } catch (e) {
      setUsers(null)
    }
  }

  useEffect(() => {
    window.addEventListener('focus', requestUserList)
    return () => window.removeEventListener('focus', requestUserList)
  }, [])

  useEffect(() => {
    requestUserList()
    let id = setInterval(requestUserList, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div>
      <UserListHeader
        subtitle='poll via REST'
        retrieveDate={users && users.meta.retrieveDate}
      />

      {!users || !users.rows.length && 'No users'}

      {users && users.rows.map(user =>
        <User user={user} key={user.id} />
      )}
    </div>
  )
}
