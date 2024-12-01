

import { JsonValue } from '../../../prisma/clients/postgres/hostdb/runtime/library';
import {hostDb, HostDbClient } from '../../database/dbClient.db'
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
  userInfo: JsonValue, // JSON value for user info
  sessionExpireTime: number,
  mongoDb: HostDbClient,
) => {
  const accessToken = crypto.randomUUID();

  // preparing session data
  const sessionInfo = {
    sessionId: crypto.randomUUID(),
    accessToken,
    userInfo,
    createdAt: getTimeNow(),
    updatedAt: getTimeNow(),
    expiredAt: sessionExpireTime,
  };

  console.log('sessionInfo:', sessionInfo);
  console.log('userInfo:', userInfo);

  // Log the data before creating the session
  const dataToCreate = {
    accessToken: sessionInfo.accessToken,
    createdAt: sessionInfo.createdAt,
    expiredAt: sessionInfo.expiredAt,
    updatedAt: sessionInfo.updatedAt,
    sessionInfo: sessionInfo, // Add sessionInfo as a JSON object
  };
  console.log('Data to create:', dataToCreate);

  // create user session
  await hostDb.sessionData
    .create({
      data: dataToCreate, // Use the logged data
    })
    .catch((err: Error) => {
      throw new DatabaseError(err.message);
    });

  return accessToken;
};



/**
 * Get User session
 * @param accessToken
 * @param mongoDb
 * @returns {sessionInfo}
 */
export const getUserSession = async (
  accessToken: string,
  hostdb: HostDbClient,
) => {
  const sessionInfo = await hostDb.sessionData
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
  hostdb: HostDbClient,
) => {
  try {
    await hostDb.sessionData.update({
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
  mongoDb: HostDbClient,
) => {
  await hostDb.sessionData
    .deleteMany({
      where: {
        accessToken,
      },
    })
    .catch((err) => {
      throw new DatabaseError(err.message)
    })
}
