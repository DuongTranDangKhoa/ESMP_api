import moment from 'moment'
import { timeFormat } from '../common/timeFormat.common'

export function getTimeInFormat(
  time: string | Date,
  toFormat: string,
  fromFormat?: string,
) {
  return moment(time, fromFormat).format(toFormat)
}

export function getTimeNowInFormat(format?: string) {
  return moment().format(format || 'YYYY-MM-DD')
}

export function getTimeNow() {
  return moment().unix()
}

export function convertTimeFormat(
  time: string | Date,
  fromFormat: string,
  toFormat?: string,
) {
  return moment(time, fromFormat || 'YYYY-MM-DD').format(
    toFormat || 'YYYY-MM-DD',
  )
}

export function compareDateToNow(date: Date | null): 0 | 1 | -1 {
  if (!date) {
    return 0
  }

  const now = moment()
  const dateToCompare = moment(date)

  if (dateToCompare.isBefore(now)) {
    return -1
  } else if (dateToCompare.isAfter(now)) {
    return 1
  }
  return 0
}
