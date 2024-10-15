import {
  MongoDbClient,
  MongoDbUserType,
  MongoSessionData,
} from '../../database/mongo.db'
import { DatabaseError } from '../../errors/database.error'
import { getTimeNow } from '../../utilities/datetime.util'

/**
 * Create User session
 * @param userInfo
 * @param sessionExpireTime
 * @param mongoDb
 * @returns {accessToken}
 */
export const createUserSession = async (
  userInfo: MongoDbUserType,
  sessionExpireTime: number,
  mongoDb: MongoDbClient,
) => {
  const accessToken = crypto.randomUUID()

  // preparing session data
  const sessionInfo = {
    sessionId: crypto.randomUUID(),
    accessToken,
    userInfo,
    createdAt: getTimeNow(),
    updatedAt: getTimeNow(),
    expiredAt: sessionExpireTime,
  }
  console.log('sessionInfo', sessionInfo)
  console.log('userInfo', userInfo)
  // create user session
  await mongoDb.sessionData
    .create({
      data: sessionInfo,
    })
    .catch((err: Error) => {
      throw new DatabaseError(err.message)
    })

  return accessToken
}

/**
 * Get User session
 * @param accessToken
 * @param mongoDb
 * @returns {sessionInfo}
 */
export const getUserSession = async (
  accessToken: string,
  mongoDb: MongoDbClient,
): Promise<MongoSessionData | null> => {
  const sessionInfo = await mongoDb.sessionData
    .findFirst({
      where: { accessToken },
    })
    .catch((err) => {
      throw new DatabaseError(err.message)
    })
  return sessionInfo
}

/**
 * Refresh User session
 * @param accessToken
 * @param mongoDb
 * @returns
 */
export const refreshUserSession = async (
  accessToken: string,
  expiredAt: number,
  mongoDb: MongoDbClient,
) => {
  try {
    await mongoDb.sessionData.update({
      where: {
        accessToken,
      },
      data: {
        expiredAt,
      },
    })
  } catch (err: any) {
    throw new DatabaseError(err.message)
  }
}

/**
 * Clear User session
 * @param accessToken
 * @param mongoDb
 * @returns
 */
export const clearUserTokens = async (
  accessToken: string,
  mongoDb: MongoDbClient,
) => {
  await mongoDb.sessionData
    .deleteMany({
      where: {
        accessToken,
      },
    })
    .catch((err) => {
      throw new DatabaseError(err.message)
    })
}
