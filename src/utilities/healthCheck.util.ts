import { AuthenticationError } from '../errors/authentication.error'
import { logInfo } from './logger.util'

export const healthCheck = () => {
  const fineMsg = "Hi Boss! I'm totally fine"
  logInfo(fineMsg)
  return fineMsg
}
