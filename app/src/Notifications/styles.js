import styled from 'styled-components'

export const NotificationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-left: 2px solid #000;
  position: relative;
`

export const messageColors = {
  INSERT: '#2EF240',
  UPDATE: '#2EF240',
  DELETE: '#F46152',
}

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 5px;
  width: 30%;
  padding: 1em 1em 0.5em 1em;
  /* 3 at 30% width = 90% with 10% left for margin,
   * 3 with 2 margins each = 10% / 6 margins
   */
  margin: calc(10% / 6);
  margin-top: 0;

  background-color: ${props => messageColors[props.type] || '#000'};
  // background: linear-gradient(${props => messageColors[props.type] || '#000'}, #fff);

  transition: 200ms transform;
  transform: scale(1);

  &:hover {
    transform: scale(1.05);
  }
`

export const MessageHeader = styled.div`
  display: flex;
  flex-direction: flex-row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.5em;
`

export const MessageRow = styled.div`
  margin-bottom: 0.5em;
`

export const MessageRawData = styled.div`
  display: flex;
  font-family: monospace;
  width: 100%;
`

export const Key = styled.span`
  font-style: italic;
  font-size: 0.8em;
  color: #1a1a1a;
`

export const Value = styled.span`
  color: #fff;
  background-color: #000;
  font-weight: bold;
  padding: 0.2em;
  margin-left: 0.2em;
  border-radius: 2px;
`

export const RetrieveDate = styled.div`
  margin-top: 1em;
  font-size: 0.8em;
  font-weight: bold;
  text-align: right;
`
