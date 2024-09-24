import pino, { destination } from 'pino'

import { env } from './env.config'
import { getTimeNowInFormat } from '../utilities/datetime.util'
import { timeFormat } from '../common/timeFormat.common'

const logger = pino({
  level: env.LOG_LEVEL || 'info',
  transport: {
    targets: [
      // print log to console
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'yyyy-mm-dd HH:MM:ss',
        },
      },
      // record error log to logs/error.log
      {
        target: 'pino/file',
        options: {
          destination: `${__dirname}/../../logs/${getTimeNowInFormat(timeFormat.dateFolder)}.log`,
          mkdir: true,
          translateTime: timeFormat.dateTime,
        },
        level: 'error',
      },
    ],
  },
})

export default logger
