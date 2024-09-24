import { AuthenticationError } from './authentication.error'
import { DatabaseError } from './database.error'
import { AuthorizationError } from './authorization.error'

export const APIErrors = {
  AUTHENTICATE_ERROR: AuthenticationError,
  AUTHORIZE_ERROR: AuthorizationError,
  DB_ERROR: DatabaseError,
  
}
