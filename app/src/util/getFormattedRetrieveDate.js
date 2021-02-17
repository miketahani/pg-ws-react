import moment from 'moment'

export const getFormattedRetrieveDate = timestamp => {
  return moment(new Date(timestamp)).format('HH:mm:ss.SSS')
}
