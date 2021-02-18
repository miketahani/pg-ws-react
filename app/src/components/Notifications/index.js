import React, { useState } from 'react'

import { DonutSpinner } from '../DonutSpinner'

import {
  NotificationsContainer,
  Message,
  MessageHeader,
  MessageRawData,
  MessageRow,
  Key,
  Value,
  RetrieveDate
} from './styles.js'

import { getFormattedRetrieveDate, getFormattedMessageRow } from '../../util/format'
import { useWebSocket } from '../../util/useWebSocket'

import { WS_NOTIFICATIONS_URL } from '../../config'

export function Notifications () {
  const [messages, setMessages] = useState([])

  const handleMessage = e => {
    if (!e.data) return;

    const payload = JSON.parse(JSON.parse(e.data).payload)
    // chronological order
    setMessages(prevMessages => [payload, ...prevMessages])
  }

  const ws = useWebSocket(WS_NOTIFICATIONS_URL, handleMessage)

  if (ws.status !== WebSocket.OPEN) {
    return <DonutSpinner />
  } else if (!messages.length) {
    return 'No messages yet'
  }

  return (
    <NotificationsContainer>
      {messages.map((message, i) =>
        <Message type={message.meta.type} key={i}>
          <MessageHeader>
            <MessageRow>
              <Key>type</Key>
              <Value>{message.meta.type}</Value>
            </MessageRow>

            <MessageRow>
              <Key>table</Key>
              <Value>{message.meta.table}</Value>
            </MessageRow>
          </MessageHeader>

          <MessageRawData>
            {getFormattedMessageRow(message.row)}
          </MessageRawData>

          <RetrieveDate>
            {getFormattedRetrieveDate(message.meta.retrieveDate)}
          </RetrieveDate>
        </Message>
      )}
    </NotificationsContainer>
  )
}
