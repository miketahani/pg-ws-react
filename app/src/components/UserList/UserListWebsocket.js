import React, { useState, useEffect } from 'react'

import { User } from './User'
import { UserListHeader } from './UserListHeader'
import { DeleteUserModal } from './DeleteUserModal'

import { fetchPost } from '../../util/fetchPost'
import { useWebSocket } from '../../util/useWebSocket'

import { getUserList, removeUser } from '../../util/userActions'

import { BASE_REST_API_URL, WS_NOTIFICATIONS_URL } from '../../config'

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
      await requestUserList()
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
    <div>
      <UserListHeader
        subtitle='push via websocket'
        retrieveDate={users && users.meta.retrieveDate}
      />

      {!users || !users.rows.length && 'No users'}

      {users && users.rows.map(user =>
        <User key={user.id} user={user} onRemoveUser={showDeleteWarningModal} />
      )}

      {!!modalOpen && <DeleteUserModal {...modalOpen} />}
    </div>
  )
}
