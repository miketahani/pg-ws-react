import React from 'react'
import styled, { keyframes } from 'styled-components'

import { Modal } from '../../Modal'
import {
  ModalMessage,
  DeleteUserModalContainer,
  buttonComponents,
} from './styles.js'

export function DeleteUserModal ({ userId, buttons }) {
  return (
    <Modal>
      <DeleteUserModalContainer>
        <ModalMessage>{`Delete ${userId}?`}</ModalMessage>

        <div>
          {buttons.map(([label, callback], i) => {
            const StyledButton = buttonComponents[label.toLowerCase()]
            return <StyledButton onClick={callback} key={i}>{label}</StyledButton>
          })}
        </div>
      </DeleteUserModalContainer>
    </Modal>
  )
}
