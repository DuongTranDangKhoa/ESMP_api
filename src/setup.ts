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
 import { initiateDatabase } from './database/mongo.db'
import { APIErrors } from './errors'
import cors from '@elysiajs/cors'
import { AuthenticatedUserHeader } from './modules/user/user.schema'
import { productItemGroup } from './modules/productitem'
import { categoryGroup } from './modules/category'
import { menuGroup } from './modules/menu'
import { mailGroup } from './modules/sendmail'
import { mapGroup } from './modules/map'
import { vendorineventGroup } from './modules/vendorinevent'
import { themeGroup } from './modules/theme'
import { serviceGroup } from './modules/service'
import { packageGroup } from './modules/package'
import { transactionpackageGroup } from './modules/transactionPackage'
import { staffGroup } from './modules/staff'
import { eventPaymentGroup } from './modules/eventpayment'
import { notificationGroup } from './modules/notification'
import { initSocket, httpServer } from './utilities/socket.util'
import { hostGroup } from './modules/host'
const io = initSocket(httpServer);
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
        .group('/staff', (app) => app.use(staffGroup)) // staff route
        .group('/product', (app) => app.use(productGroup)) // product route
        .group('/eventpayment', (app) => app.use(eventPaymentGroup)) // event route
        .group('/host', (app) => app.use(hostGroup))
        .group('/notification', (app) => app.use(notificationGroup))
        .group('/order', (app) => app.use(orderGroup)) // order route
        .group('/productitem',(app) => app.use(productItemGroup)) // product)
        .group('/transaction', (app) => app.use(transactionGroup)) // transaction route
        .group('/category', (app) => app.use(categoryGroup)) // category route
        .group('/theme', (app) => app.use(themeGroup)) // category route
        .group('/package', (app) => app.use(packageGroup)) // package route
        .group('/transactionpackage', (app) => app.use(transactionpackageGroup)) // service route
        .group('/service', (app) => app.use(serviceGroup)) // service route
        .group('/menu', (app) => app.use(menuGroup)) // menu route
        .group('/vendorinevent', (app) => app.use(vendorineventGroup)) // vendor route
        .group('/mail',(app) => app.use(mailGroup)) // mail route)
        .group('/map', (app) => app.use(mapGroup)) // map route
        // .group('/transaction', (app) => app.use(transactionGroup)) // transaction route
        .group('/debug/host', debuggingGroup), // authenticated debug route
  )
  // unauthenticated user route
  .group('/debug/master', debuggingGroup) // unauthenticated debug route

export default app
