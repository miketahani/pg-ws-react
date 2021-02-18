import React, { useState, useEffect } from 'react'

import { User } from './User'
import { UserListHeader } from './UserListHeader'

import { fetchPost } from '../util/fetchPost'

import { BASE_REST_API_URL } from '../config'

const NOOP = () => {};

export function UserListREST () {
  const [users, setUsers] = useState(null)

  const requestUserList = async () => {
    try {
      const res = await fetch(`${BASE_REST_API_URL}/user/list`)
      const users = await res.json()
      users.rows = users.rows.sort((a, b) => b.id - a.id)
      setUsers(users)
    } catch (e) {
      setUsers(null)
    }
  }

  const handleRemoveUser = async userId => {
    try {
      await fetchPost(`${BASE_REST_API_URL}/user/remove`, {id: userId})
      await requestUserList()
    } catch (e) {
      console.error(e)
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
        <User key={user.id} user={user} onRemoveUser={NOOP} />
      )}
    </div>
  )
}
