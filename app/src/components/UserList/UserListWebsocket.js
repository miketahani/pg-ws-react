import React, { useState, useEffect } from 'react'

import { UserList } from './UserList'
import { DeleteUserModal } from './DeleteUserModal'

import { useWebSocket } from '../../util/useWebSocket'

import { getUserList, removeUser } from '../../util/userActions'

import { WS_NOTIFICATIONS_URL } from '../../config'

export function UserListWebsocket () {
  const [users, setUsers] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const requestUserList = async () => {
    try {
      setUsers(await getUserList())
    } catch (e) {
      setUsers(null)
    }
  }

  const handleRemoveUser = async userId => {
    try {
      await removeUser(userId)
      setModalOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

  // Subscribe to updates and reload the user list when a change is detected
  const ws = useWebSocket(WS_NOTIFICATIONS_URL, requestUserList)

  // Load initial user list
  useEffect(() => { requestUserList() }, [])

  const showDeleteWarningModal = userId => {
    setModalOpen({
      userId,
      buttons: [
        ['DELETE', () => handleRemoveUser(userId)],
        ['Cancel', () => setModalOpen(false)]
      ]
    })
  }

  return (
    <>
      <UserList
        users={users}
        subtitle="push via websocket"
        onRemoveUser={showDeleteWarningModal}
      />

      {!!modalOpen && <DeleteUserModal {...modalOpen} />}
    </>
  )
}
