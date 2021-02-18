import React, { useRef, useState, useEffect } from 'react'

export function useWebSocket (url, onMessage) {
  const ws = useRef()
  const [error, setError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (ws.current) return;

    const handleSocketOpen = () => {
      setIsOpen(true)
      setError(false)
    }
    const handleSocketError = error => {
      setIsOpen(false)
      setError(error)
    }

    const socket = ws.current = new WebSocket(url)
    socket.addEventListener('open', handleSocketOpen)
    socket.addEventListener('error', handleSocketError)
    return () => {
      socket.removeEventListener('open', handleSocketOpen)
      socket.removeEventListener('error', handleSocketError)
      socket.close()
    }
  }, [url])

  // Separate message handling from other websocket events because the message
  // handler may change frequently (as the consumer may redefine the handler
  // based on external deps) and sometimes we don't want to constantly
  // reconnect to a streaming socket.
  useEffect(() => {
    if (!ws.current) return;
    ws.current.addEventListener('message', onMessage)
    return () => ws.current.removeEventListener('message', onMessage)
  }, [onMessage])

  const send = message =>
    (ws.current?.readyState === WebSocket.OPEN) && ws.current.send(message)

  return {
    status: ws.current?.readyState ?? WebSocket.CONNECTING,
    error,
    send
  }
}
