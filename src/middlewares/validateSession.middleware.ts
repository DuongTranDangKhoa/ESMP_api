import { getTimeNow } from '../utilities/datetime.util'
import {
  getUserSession,
  refreshUserSession,
} from '../modules/mongoDb/mongoDb.service'
import { getSessionExpireTime } from '../modules/config/config.service'
import { initiateHostDatabase } from '../database'
import { HostDbClient } from '../database/host.db'
import { AuthorizationError } from '../errors/authorization.error'
import { MongoDbUserType, MongoSessionData } from '../database/mongo.db'

export const validateSession = async ({
  headers,
  masterDb,
  mongoDb,
}: any): Promise<{ userInfo: MongoDbUserType; hostDb: HostDbClient }> => {
  // const accessToken = headers.authorization

  // const sessionInfo: MongoSessionData | null = await getUserSession(
  //   accessToken,
  //   mongoDb,
  // )
  // if (!sessionInfo) {
  //   throw new AuthorizationError('No session info found!')
  // }
  // if (sessionInfo.expiredAt < getTimeNow()) {
  //   throw new AuthorizationError('Access permission expired')
  // }
  // const userInfo: MongoDbUserType = sessionInfo.userInfo
    const userInfo: MongoDbUserType = {
      username: '123',
      hostInfo: {hostCode: "default", hostName: ''},
      vendorInfo: {vendorName: 'asdfasf'},
    }
  const hostDb = initiateHostDatabase(userInfo)
  const sessionExpireTime = await getSessionExpireTime(hostDb ?? masterDb)

  // await refreshUserSession(accessToken, sessionExpireTime, mongoDb)

  return {
    userInfo,
    hostDb,
  }
}
