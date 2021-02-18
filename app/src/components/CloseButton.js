import React from 'react'
import styled from 'styled-components'

const CLOSE_SYMBOL = '✕'

export const CloseButtonContainer = styled.div`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  color: #fff;
  background-color: #F46152;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: normal;
  user-select: none;

  transition: 100ms transform, 100ms border, 100ms color;
  color: #fff;
  border: 1px solid #fff;
  transform: scale(1);

  &:hover {
    color: #000;
    transform: scale(1.1);
    border: 1px solid #000;
  }
`


export function CloseButton (props) {
  return (
    <CloseButtonContainer {...props}>
      {CLOSE_SYMBOL}
    </CloseButtonContainer>
  )
}
