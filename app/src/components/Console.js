import React, { useRef } from 'react'
import styled from 'styled-components'

import { Button } from './Button'

import { fetchPost } from '../util/fetchPost'

// don't do name creation etc via websocket. create a REST API and only use
// the websocket for completely necessary realtime stuff.
const baseApiUrl = 'http://localhost:5000'

const SubmitButton = styled(Button)`
  background-color: #2EF240;
  color: #000;
  margin-top: 0.5em;
`

export function Console () {
  const input = useRef(null)

  const handleSubmitName = () => {
    const username = input.current.value

    if (!username) {
      return
    }

    fetchPost(`${baseApiUrl}/user/add`, {username})
      .then(res => console.log('success!'))
      .catch(e => console.error(e))
      .finally(clearInput)
  }

  const clearInput = () => {
    input.current.value = ''
  }

  // submit if ENTER, clear input if ESC
  const checkForSpecialKeys = e => {
    if (e.key === 'Enter') {
      handleSubmitName()
    } else if (e.key === 'Escape') {
      clearInput()
    }
  }

  return (
    <div>
      <input
        ref={input}
        type='text'
        placeholder='New name...'
        onKeyUp={checkForSpecialKeys}
      />

      <SubmitButton onClick={handleSubmitName}>
        Add Name
      </SubmitButton>
    </div>
  )
}
