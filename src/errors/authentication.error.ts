export class AuthenticationError extends Error {
  name: string = 'AuthenticationError'

  constructor(public message: string) {
    super(message)

    Object.setPrototypeOf(this, AuthenticationError.prototype)
    Error.captureStackTrace(this)
  }
}
