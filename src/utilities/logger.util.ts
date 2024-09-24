import logger from '../config/logger.config'

export function logError(error: Error, code: string) {
  logger.error(error, code)
}

export function logInfo(...message: any[]) {
  logger.info(message.join(' '))
}
