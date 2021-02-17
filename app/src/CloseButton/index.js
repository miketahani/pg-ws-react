import React from 'react'

import { CloseButtonContainer } from './styles'

const CLOSE_SYMBOL = '✕'

export function CloseButton (props) {
  return (
    <CloseButtonContainer {...props}>
      {CLOSE_SYMBOL}
    </CloseButtonContainer>
  )
}
