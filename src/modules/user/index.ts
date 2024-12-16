
import {
  // LoginParams,
  LoginBody,
  LoginResponseSchema,
  AuthenticatedUserHeader,
  LoginResponseType,
} from './user.schema'
import { LoginType } from '../../common/constant/common.constant'
import * as userService from './user.service'
// import { dbClient } from '../../database/mongo.db'
import { hostDb, HostDbClient,  } from '../../database/dbClient.db'
import { createHost, deleteHost, updatePassword } from '../host/host.service'
import { CreateHostSchema, UpdatePasswordSchema } from '../host/host.schema'

export const userGroup = (app: any) =>
  app
    /**
     * POST /api/user/login/:loginType
     * Login user
     * @params loginType login type (host | vendor| staff)
     * @body username
     * @body password
     */
    .post(
  '/login',
  async ({
    body,

    db,
  }: {
    body: any;
    params: any;
    db: HostDbClient;
  }) => {
    const { username, password } = body;
    const  loginType  = await userService.getRole(username, hostDb)  ;

    switch (loginType) {
      case LoginType.HOST:
        return await userService.authenticateHostUser(username, password, hostDb, db);
      case LoginType.VENDOR:
        return await userService.authenticateVendorUser(username, password, hostDb, db);
      case LoginType.STAFF:
        return await userService.authenticateStaffUser(username, password, hostDb, db);
      case LoginType.ADMIN:
        return await userService.authenticateAdminUser(username, password, hostDb, db);
      
        default:
        throw new Error('Invalid login type');
    }
  
  },
  {
    // params: LoginParams,
    body: LoginBody,
    response: LoginResponseSchema,
  },
)
    /**
     * POST /api/user/logout
     * Logout user
     * @headers authorization accessToken access token given by authenticate
     */
    .post(
      '/logout',
      async ({
        headers,
        db,
      }: {
        headers: any
        db: HostDbClient
      }) => {
        const accessToken = headers.authorization
        await userService.logOutUser(accessToken, db)
        return {
          message: 'User logged out!',
        }
      },
      {
        headers: AuthenticatedUserHeader, // header must contain accessToken
      },
    )

     .post(
      '/register',
      async ({ body}: { body: any; }) => {
        return await createHost(body);
      },
      {
        body: CreateHostSchema, 
      }
    )
    .post('/forget-password', async ({ body }: { body: any }) => {
    const { email } = body;
    return await userService.forgotPassword(email, hostDb);
    })
    .put(
      'newpassword/:accountId/',
      async ({ params, body, }: { params: any; body: any; }) => {
        const { accountId } = params;
        const { newPassword } = body;
        return await updatePassword(accountId, newPassword, hostDb );
      },
      {
        body: UpdatePasswordSchema, // Áp dụng schema
      }
    )
    .post('/notification', async ({ body }: { body: any }) => {
      return await userService.CreateNotificationRegister(body, hostDb);
    })
    .delete('/deletehost/:id',
      async ({ params}: { params: any}) => {
        const { id } = params;
        return await deleteHost(id, hostDb);
      }
    )