import React, { useState } from 'react'

import { User } from './User'
import { UserListHeader } from './UserListHeader'
import { DeleteUserModal } from './DeleteUserModal'

import { removeUser } from '../../util/userActions'

export const UserList = ({ users, subtitle, onRemoveUser = null }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleRemoveUser = async userId => {
    try {
      await removeUser(userId)
      setModalOpen(false)
    } catch (e) {
      console.error(e)
    }
  }

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
      <div>
        <UserListHeader
          subtitle={subtitle}
          retrieveDate={users && users.meta.retrieveDate}
        />

        {(!users || !users.rows.length) && 'No users'}

        {users && users.rows.map(user =>
          <User
            user={user}
            onRemoveUser={() => showDeleteWarningModal(user.id)}
            key={user.id}
          />
        )}
      </div>

      {!!modalOpen && <DeleteUserModal {...modalOpen} />}
    </>
  )
}
