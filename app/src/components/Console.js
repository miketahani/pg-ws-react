import React, { useRef } from 'react'
import styled from 'styled-components'

import { Button } from './Button'

import { addUser } from '../util/userActions'

const SubmitButton = styled(Button)`
  background-color: #2EF240;
  color: #000;
  margin-top: 0.5em;
`

export function Console () {
  const input = useRef(null)

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

  const handleSubmitName = async () => {
    const username = input.current.value

    if (!username) return;

    try {
      await addUser(username)
    } catch (e) {
      console.error(e)
    } finally {
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
