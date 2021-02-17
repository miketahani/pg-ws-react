import React, { useState, useEffect } from 'react'

import { User } from './User'
import { UserListHeader } from './UserListHeader'

import { fetchPost } from '../util/fetchPost'

// import './styles.css'

const NOOP = () => {};
const baseApiUrl = 'http://localhost:5000'

export function UserListREST () {
  const [needsUpdate, setNeedsUpdate] = useState(true)
  const [users, setUsers] = useState(null)

  const requestUserList = () => {
    setNeedsUpdate(true)
  }

  const handleRemoveUser = userId => {
    fetchPost(`${baseApiUrl}/user/remove`, {id: userId})
      .then(requestUserList)
      .catch(e => console.error(e))
  }

  useEffect(() => {
    if (!needsUpdate) {
      return
    }

    console.log('requesting user list')

    const fetchData = async () => {
      try {
        const res = await fetch(`${baseApiUrl}/user/list`)
        const users = await res.json()
        users.rows = users.rows.sort((a, b) => b.id - a.id)
        setNeedsUpdate(false)
        setUsers(users)
      } catch (e) {
        setUsers(null)
      }
    }

    fetchData()
  }, [needsUpdate])

  useEffect(() => {
    window.addEventListener('focus', requestUserList)
    return () => window.removeEventListener('focus', requestUserList)
  }, [])

  useEffect(() => {
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
