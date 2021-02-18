import { fetchPost } from './fetchPost'

import { BASE_REST_API_URL } from '../config'

export const getUserList = async () => {
  const res = await fetch(`${BASE_REST_API_URL}/user/list`)
  const users = await res.json()
  users.rows = users.rows.sort((a, b) => b.id - a.id)
  return users
}

export const addUser = async userName => {
  await fetchPost(`${BASE_REST_API_URL}/user/add`, {username: userName})
}

export const removeUser = async userId => {
  await fetchPost(`${BASE_REST_API_URL}/user/remove`, {id: userId})
}
