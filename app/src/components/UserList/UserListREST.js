import React, { useState, useEffect } from 'react'

import { UserList } from './UserList'

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
    <UserList users={users} subtitle="poll via REST" />
  )
}
