import React from 'react'
import './App.css'

import { Console } from './Console'
import { Notifications } from './Notifications'
import { UserListREST } from './UserList/UserListREST'
import { UserListWebsocket } from './UserList/UserListWebsocket'

function App() {
  return (
    <div className='App'>
      <div className='Main'>
        <div className='left-container'>
          <h2>Management console</h2>
          <Console />

          <br /><br />

          <UserListWebsocket />

          <br /><br />

          <UserListREST />
        </div>

        <div className='notifications-container'>
          <h2>Live DB notifications via <code>pg_notify</code> 🔌 websockets</h2>
          <Notifications />
        </div>
      </div>
    </div>
  )
}

export default App
