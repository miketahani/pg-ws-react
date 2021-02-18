import styled, { keyframes } from 'styled-components'
import { Button } from '../../Button'

const bouncein = keyframes`
  from { transform: scale(0.25); }
  to   { transform: scale(1);    }
`

export const DeleteUserModalContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  width: 20% !important;
  animation: ${bouncein} .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

export const ModalMessage = styled.div`
  font-size: 3em;
  font-weight: bold;
  text-align: center;
`

const CancelButton = styled(Button)`
  font-size: 1.5em;
  width: 100%;
  color: #000;
  background-color: #ccc;
`

const DeleteButton = styled(Button)`
  font-size: 1.5em;
  width: 100%;
  text-transform: uppercase;
  color: #fff;
  background-color: #F46152;
`

export const buttonComponents = {
  delete: DeleteButton,
  cancel: CancelButton
}
