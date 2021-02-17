// from https://reactjs.org/docs/portals.html
import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const ModalStyle = styled(Modal)`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);

  display: flex;
  padding-top: 10%;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  overflow: hidden;
  pointer-events: all;
`

const modalRoot = document.getElementById('modal-root')

function createModalElement () {
  const el = document.createElement('div')
  el.classList.add('Modal')
  return el
}

export function Modal () {
  const el = useRef(createModalElement())

  useEffect(() => {
    modalRoot.appendChild(el)
    return () => modalRoot.removeChild(el)
  }, [])

  return ReactDOM.createPortal(
    this.props.children,
    this.el
  )
}
