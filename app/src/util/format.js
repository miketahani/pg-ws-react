import moment from 'moment'

export const getFormattedRetrieveDate = timestamp => {
  return moment(new Date(timestamp)).format('HH:mm:ss.SSS')
}

export const getFormattedMessageRow = row => {
  const stringified = JSON.stringify(row, null, 2)
  const display = stringified.length > 50
    ? `${stringified.slice(0, 50 - 3)}...`
    : stringified
  return display
}
