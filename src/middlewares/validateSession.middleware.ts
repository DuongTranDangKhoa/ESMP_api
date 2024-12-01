import { getTimeNow } from '../utilities/datetime.util'
import {
  getUserSession,
  refreshUserSession,
} from '../modules/clientDb/Db.service'
import { getSessionExpireTime } from '../modules/config/config.service'
// import { initiateHostDatabase } from '../database'
import { hostDb, HostDbClient } from '../database/dbClient.db'
import { AuthorizationError } from '../errors/authorization.error'
import { SessionData } from '../../prisma/clients'
import { JsonValue } from '../../prisma/clients/postgres/hostdb/runtime/library'
// import { MongoDbUserType, MongoSessionData } from '../database/mongo.db'

export const validateSession = async ({
  headers,
  // masterDb,
  mongoDb,
}: any): Promise<{ userInfo:JsonValue ,hostDb: HostDbClient }> => {
  const accessToken = headers.authorization

  const sessionInfo: SessionData | null = await getUserSession(
    accessToken,
    mongoDb,
  )
  if (!sessionInfo) {
    throw new AuthorizationError('No session info found!')
  }
  if (sessionInfo.expiredAt < getTimeNow()) {
    throw new AuthorizationError('Access permission expired')
  }
  const userInfo: JsonValue = sessionInfo.sessionInfo
   
  // const hostDb = initiateHostDatabase(userInfo)
  const sessionExpireTime = await getSessionExpireTime(hostDb)

  await refreshUserSession(accessToken, sessionExpireTime, mongoDb)

  return {
    userInfo,
    hostDb,
  }
}
