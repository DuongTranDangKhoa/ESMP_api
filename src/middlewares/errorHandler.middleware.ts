import { logError } from '../utilities/logger.util'
import status from 'statuses'

export const errorHandler = ({ error, code, set }: any) => {
  // log error
  logError(error, code)
  // error handling processing
  let errorName
  let errorMsg
  switch (code) {
    case 'NOT_FOUND':
      errorName = 'Not found error'
      errorMsg = error.message
      set.status = status('Not Found')
      break
    case 'VALIDATION':
      errorName = 'Validation error'
      errorMsg = error.message
      set.status = status('Bad Request')
      break
    case 'AUTHENTICATE_ERROR':
      errorName = 'Authentication error'
      errorMsg = error.message
      set.status = status('Unauthorized')
      break
    case 'AUTHORIZE_ERROR':
      errorName = 'Authorization error'
      errorMsg = error.message
      set.status = status('Forbidden')
      break
    default:
      errorName = 'Unexpected error'
      errorMsg = error.message
      set.status = status('Internal Server Error')
      break
  }

  return {
    code: code,
    error: errorName,
    message: errorMsg,
  }
}
