import { Elysia } from 'elysia'
import { debuggingGroup } from './modules/debug'
import { userGroup } from './modules/user'
import { eventGroup } from './modules/event'
import { vendorGroup } from './modules/vendor'
import { productGroup } from './modules/product'
import { orderGroup } from './modules/order'
import { transactionGroup } from './modules/transaction'
import { errorHandler } from './middlewares/errorHandler.middleware'
import { healthCheck } from './utilities/healthCheck.util'
import { validateSession } from './middlewares/validateSession.middleware'
import { initiateDatabase } from './database'
import { APIErrors } from './errors'
import cors from '@elysiajs/cors'
import { AuthenticatedUserHeader } from './modules/user/user.schema'
import { productItemGroup } from './modules/productitem'

const app = new Elysia({ prefix: '/api' }) // declare app with '/api' prefix
  .use(cors()) // implicit CORS
  .error(APIErrors) // assign custom error
  .onError(errorHandler) // implement error handler
  .get('/healthcheck', healthCheck) // health check route
  .decorate(initiateDatabase) // initiate master and mongo database
  .group('/user', (app) => app.use(userGroup)) // user routing route
  // authenticated user route
  .guard(
    (app) =>
      
      app
        .resolve(validateSession) // implement session validating
        .group('/event', (app) => app.use(eventGroup)) // event route
        .group('/vendor', (app) => app.use(vendorGroup)) // vendor route
        .group('/product', (app) => app.use(productGroup)) // product route
        .group('/order', (app) => app.use(orderGroup)) // order route
        .group('/productitem',(app) => app.use(productItemGroup)) // product)
        // .group('/transaction', (app) => app.use(transactionGroup)) // transaction route
        .group('/debug/host', debuggingGroup), // authenticated debug route
  )
  // unauthenticated user route
  .group('/debug/master', debuggingGroup) // unauthenticated debug route

export default app
