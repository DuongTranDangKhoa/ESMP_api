import {
  LoginParams,
  LoginBody,
  LoginResponseSchema,
  AuthenticatedUserHeader,
  LoginResponseType,
} from './user.schema'
import { LoginType } from '../../common/constant/common.constant'
import * as userService from './user.service'
import { MongoDbClient } from '../../database/mongo.db'
import { MasterDbClient } from '../../database/master.db'
import { hostDb, HostDbClient,  } from '../../database/host.db'

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
  '/login/:loginType',
  async ({
    body,
    params,
    mongoDb,
  }: {
    body: any;
    params: any;
    mongoDb: MongoDbClient;
  }) => {
   

    const { username, password } = body;
    const { loginType } = params;

    switch (loginType) {
      case LoginType.HOST:
        return await userService.authenticateHostUser(username, password, hostDb, mongoDb);
      case LoginType.VENDOR:
        return await userService.authenticateVendorUser(username, password, hostDb, mongoDb);
      case LoginType.STAFF:
        return await userService.authenticateStaffUser(username, password, hostDb, mongoDb);
      case LoginType.ADMIN:
        return await userService.authenticateAdminUser(username, password, hostDb, mongoDb);
      default:
        throw new Error('Invalid login type');
    }
  },
  {
    params: LoginParams,
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
        mongoDb,
      }: {
        headers: any
        mongoDb: MongoDbClient
      }) => {
        const accessToken = headers.authorization
        await userService.logOutUser(accessToken, mongoDb)
        return {
          message: 'User logged out!',
        }
      },
      {
        headers: AuthenticatedUserHeader, // header must contain accessToken
      },
    )
    
