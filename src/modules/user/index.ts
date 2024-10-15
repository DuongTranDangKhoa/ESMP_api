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

export const userGroup = (app: any) =>
  app
    /**
     * POST /api/user/login/:loginType
     * Login user
     * @params loginType login type (host | vendor)
     * @body username
     * @body password
     * @body hostCode? host code for vendor user authentication
     */
    .post(
      '/login/:loginType',
      async ({
        body,
        params,
        mongoDb,
        masterDb,
      }: {
        body: any
        params: any
        mongoDb: MongoDbClient
        masterDb: MasterDbClient
      }) => {
        const { username, password } = body
        const { loginType } = params
        switch (loginType) {
          case LoginType.HOST:
            // authenticate process for host user
            return await userService.authenticateHostUser(
              username,
              password,
              masterDb,
              mongoDb,
            )
          // authenticate process for vendor user
          case LoginType.VENDOR:
  
            const { hostCode } = body
            return await userService.authenticateVendorUser(
              hostCode,
              username,
              password,
              masterDb,
              mongoDb,
            )
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
    
