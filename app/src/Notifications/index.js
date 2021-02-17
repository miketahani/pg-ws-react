import React, { Component } from 'react'
import moment from 'moment'

import { getFormattedRetrieveDate } from '../util/getFormattedRetrieveDate'

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

export class Notifications extends Component {
  state = {
    messages: [],
    isConnected: false
  }
  websocket = null

  componentDidMount () {
    this.websocket = new WebSocket('ws://localhost:4000')
    this.websocket.addEventListener('open', this.handleConnect)
    this.websocket.addEventListener('message', this.handleMessage)
  }

  componentWillUnmount () {
    this.setState({ isConnected: false }, () => {
      this.websocket.close()
    })
  }

  handleConnect = () => {
    this.setState({ isConnected: true })
  }

  handleMessage = event => {
    if (!event.data) {
      return
    }

    const data = JSON.parse(event.data)
    const payload = JSON.parse(data.payload)

    console.log(data)

    // chronilogical order
    this.setState({ messages: [payload, ...this.state.messages] })
  }

  getFormattedMessageRow = row => {
    const stringified = JSON.stringify(row, null, 2)
    const display = stringified.length > 50
      ? `${stringified.slice(0, 50 - 3)}...`
      : stringified
    return display
  }

  render () {
    const { isConnected, messages } = this.state

    if (!isConnected) {
      return <DonutSpinner />
    }

    if (!messages.length) {
      return 'No messages'
    }

    return (
      <NotificationsContainer>
        {messages.map((message, i) => console.log(message.meta) ||
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

            {/*
            <MessageRawData>
              {Object.entries(message.row).map(([key, value]) =>
                <div key={key}>
                  <Key>{key}</Key>
                  <Value>{value}</Value>
                </div>
              )}
            </MessageRawData>
            */}

            <MessageRawData>
              {this.getFormattedMessageRow(message.row)}
            </MessageRawData>

            <RetrieveDate>
              {getFormattedRetrieveDate(message.meta.retrieveDate)}
            </RetrieveDate>
          </Message>
        )}
      </NotificationsContainer>
    )
  }
}
