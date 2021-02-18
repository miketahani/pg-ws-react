import React, { useState, useEffect } from 'react'

import { User } from './User'
import { UserListHeader } from './UserListHeader'
import { DeleteUserModal } from './DeleteUserModal'

import { fetchPost } from '../../util/fetchPost'
import { useWebSocket } from '../../util/useWebSocket'

import { BASE_REST_API_URL, WS_HYDRATION_URL } from '../../config'

export function UserListWebsocket () {
  const [needsUpdate, setNeedsUpdate] = useState(true)
  const [users, setUsers] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleMessage = _msg => {
    const msg = JSON.parse(_msg.data)
    const payload = JSON.parse(msg.payload)
    payload.rows = payload.rows.sort((a, b) => b.id - a.id)
    setUsers(payload)
  }

  const ws = useWebSocket(WS_HYDRATION_URL, handleMessage)

  const handleRemoveUser = async userId => {
    try {
      await fetchPost(`${BASE_REST_API_URL}/user/remove`, {id: userId})
      setModalOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

  const showDeleteWarningModal = userId => {
    setModalOpen({
      userId,
      buttons: [
        ['Cancel', () => setModalOpen(false)],
        ['DELETE', () => handleRemoveUser(userId)]
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
