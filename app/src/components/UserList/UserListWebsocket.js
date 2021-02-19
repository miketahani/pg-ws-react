import React, { useState, useEffect } from 'react'

import { UserList } from './UserList'

import { useWebSocket } from '../../util/useWebSocket'

import { getUserList } from '../../util/userActions'

import { WS_NOTIFICATIONS_URL } from '../../config'

export function UserListWebsocket () {
  const [users, setUsers] = useState(null)

  const requestUserList = async () => {
    try {
      setUsers(await getUserList())
    } catch (e) {
      setUsers(null)
    }
  }

  // Subscribe to updates and reload the user list when a change is detected.
  useWebSocket(WS_NOTIFICATIONS_URL, requestUserList)

  // Hydrate initial user list
  useEffect(() => { requestUserList() }, [])

  return (
    <UserList users={users} subtitle="push via websocket" />
  )
}
