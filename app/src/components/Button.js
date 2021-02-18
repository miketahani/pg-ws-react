import styled from 'styled-components'

export const Button = styled.button`
  background-color: #fff;
  user-select: none;
  border-radius: 5px;
  text-align: center;
  padding: 0.5em;
  margin-top: 0.25em;
  cursor: pointer;
  font-weight: bold;

  transition: 100ms transform;
  transform: scale(1);

  &:hover {
    transform: scale(1.02);
  }
`
