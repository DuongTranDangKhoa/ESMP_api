import { getHostDbClient, HostDbClient } from '../../database/host.db'
import { MasterDbClient } from '../../database/master.db'
import { MongoDbClient, MongoDbUserType } from '../../database/mongo.db'
import { LoginResponseType } from './user.schema'
import * as mongoService from '../mongoDb/mongoDb.service'
import * as hostService from '../host/host.service'
import * as configService from '../config/config.service'
import vendorService from '../vendor/vendor.service'

/**
 * Create user session
 * @param {MongoDbUserType} userInfo
 * @param {(MasterDbClient | HostDbClient)} db
 * @param {MongoDbClient} mongoDb
 * @returns {UUID} accessToken
 */
async function createUserSession(
  userInfo: MongoDbUserType,
  db: MasterDbClient | HostDbClient,
  mongoDb: MongoDbClient,
) {
  // declare session expired time
  const sessionExpireTime = await configService.getSessionExpireTime(db)

  // create session for user
  const accessToken = await mongoService.createUserSession(
    userInfo as MongoDbUserType,
    sessionExpireTime,
    mongoDb,
  )

  return accessToken
}

/**
 * Authenticate host user
 *
 * @export
 * @param {string} username
 * @param {string} password
 * @param {MasterDbClient} masterDb
 * @param {MongoDbClient} mongoDb
 * @returns {LoginResponseType}
 */
export async function authenticateHostUser(
  username: string,
  password: string,
  masterDb: MasterDbClient,
  mongoDb: MongoDbClient,
): Promise<LoginResponseType> {
  const host = await hostService.authenticateHostUser(
    username,
    password,
    masterDb,
  )

  const userInfo = {
    username,
    hostInfo: {
      hostName: host.hostName as string,
      hostCode: host.hostCode as string,
    },
  }

  // create session for user
  const accessToken = await createUserSession(
    userInfo as MongoDbUserType,
    masterDb,
    mongoDb,
  )

  return {
    accessToken,
    userInfo,
  }
}

export async function authenticateVendorUser(
  hostCode: string,
  username: string,
  password: string,
  masterDb: MasterDbClient,
  mongoDb: MongoDbClient,
): Promise<LoginResponseType> {
  const host = await hostService.getHostAndVerify(hostCode, masterDb)
  const hostDb = getHostDbClient(hostCode)

  const vendor = await vendorService.authenticateVendorUser(
    username,
    password,
    hostDb,
  )

  // create session for user
  const userInfo = {
    username,
    hostInfo: {
      hostName: host.hostName as string,
      hostCode: host.hostCode as string,
    },
    vendorInfo: {
      vendorName: vendor.vendorName as string,
    },
  }

  // create session for user
  const accessToken = await createUserSession(
    userInfo as MongoDbUserType,
    hostDb,
    mongoDb,
  )

  return {
    accessToken,
    userInfo,
  }
}

export async function logOutUser(accessToken: string, mongoDb: MongoDbClient) {
  await mongoService.clearUserTokens(accessToken, mongoDb)
}
