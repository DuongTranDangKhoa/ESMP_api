export class AuthorizationError extends Error {
  name: string = 'AuthorizationError'

  constructor(public message: string) {
    super(message)

    Object.setPrototypeOf(this, AuthorizationError.prototype)
    Error.captureStackTrace(this)
  }
}
