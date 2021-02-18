import styled from 'styled-components'

export const UserContainer = styled.div`
  display: flex;
  flex-direction: flex-row;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.5em;
  border-radius: 5px;
  margin: 0.5em 0;

  /* animation */
  transition: 200ms border, 200ms box-shadow, 200ms transform;
  /*border: 1px solid #ccc;*/
  border: 1px solid #ddd;
  box-shadow: 0 0 0px 0px #ccc;
  transform: scale(1);

  &:hover {
    /* animation */
    border: 1px solid #000;
    box-shadow: 0 0 10px 2px #ccc;
    transform: scale(1.01);
  }
`

export const UserInfo = styled.div`
  width: 66%;
`

export const UserName = styled.span`
  font-weight: bold;
  font-size: 1.25em;
  margin-right: 0.5em;
`

export const UserID = styled.span`
  font-size: 0.8em;
  font-style: italic;
`

export const UserListHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  & h2,
  & h3 {
    margin: 0;
    display: inline-block;
  }
`

export const UserListTimestamp = styled.span`
  font-size: 0.8em;
  font-style: italic;
  color: #1a1a1a;
  font-weight: bold;
`
