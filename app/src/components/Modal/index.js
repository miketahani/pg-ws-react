// from https://reactjs.org/docs/portals.html
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

const modalRoot = document.getElementById('modal-root')

function createModalElement () {
  const el = document.createElement('div')
  el.classList.add('Modal')
  return el
}

export function Modal ({ children }) {
  const el = useRef(createModalElement())

  useEffect(() => {
    const node = el.current
    modalRoot.appendChild(node)
    return () => modalRoot.removeChild(node)
  }, [])

  if (!el.current) return null

  return ReactDOM.createPortal(
    children,
    el.current
  )
}
