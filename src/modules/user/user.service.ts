import {  HostDbClient } from '../../database/dbClient.db'
import { MongoDbClient, MongoDbUserType } from '../../database/mongo.db'
import { LoginResponseType } from './user.schema'
import * as mongoService from '../mongoDb/mongoDb.service'
import * as hostService from '../host/host.service'
import * as configService from '../config/config.service'
import vendorService from '../vendor/vendor.service'
import { RoleType } from '../../common/constant/common.constant'
import staffService from '../staff/staff.service'
import { verifyEncrypted } from '../../utilities/crypting.util'
/**
 * Create user session
 * @param {MongoDbUserType} userInfo
 * @param {(MasterDbClient | HostDbClient)} db
 * @param {MongoDbClient} mongoDb
 * @returns {UUID} accessToken
 */
async function createUserSession(
  userInfo: MongoDbUserType,
  db: HostDbClient,
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
  hostDb: HostDbClient,
  mongoDb: MongoDbClient,
): Promise<LoginResponseType> {
  const host = await hostService.authenticateHostUser(
    username,
    password,
    hostDb,
  )

  const userInfo = {
    username,
    hostInfo: {
      hostName: host.email as string,
      hostId: host.hostid as string,
     expiretime : host.expiretime,
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

export async function authenticateVendorUser(
  username: string,
  password: string,
  hostDb: HostDbClient,
  mongoDb: MongoDbClient,
): Promise<LoginResponseType> {
  const vendor = await vendorService.authenticateVendorUser(
    username,
    password,
    hostDb,
  )
  const host = await hostService.getHostAndVerify(vendor?.vendor.hostid, hostDb)
  // create session for user
  const userInfo = {
    username,
    role: RoleType.MANAGER,
    hostInfo: {
       hostName: host.email as string,
      hostId: host.hostid as string,
     expiretime : host.expiretime,
     // hostName: "123", 
      // hostCode,
    },
    vendorInfo: {
      vendorName: vendor.account.name as string,
      vendorId: vendor.vendor.vendorId as string,
      urlQr: vendor.vendor.urlQr as string
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
export async function authenticateStaffUser(
  username: string,
  password: string,
  hostDb: HostDbClient,
  mongoDb: MongoDbClient,
): Promise<LoginResponseType> {
  const staff = await staffService.authenticateStaffUser(
    username,
    password,
    hostDb,
  )
  const vendor = await hostDb.vendor.findFirst({where: {vendorId: staff.staff.vendorId}});
  const vendorName = await hostDb.account.findFirst({where: {id: vendor?.userid}});
  if (!vendor){
    throw new Error('Vendor not found');
  }
  const host = await hostDb.host.findFirst({where: {hostid: vendor?.hostid}});
  const userInfo = {
  username,
  role: RoleType.STAFF,
  hostInfo: {
      hostName: host?.email as string,
      hostId: host?.hostid as string,
     expiretime : host?.expiretime,
  },
  vendorInfo: {
    vendorName: vendorName?.name as string,
    vendorId: vendor?.vendorId as string,
    urlQr: vendor?.urlQr as string
  },
  staffInfo: {
    staffId: staff.staff.staffid as string,
    vendorId: staff.staff.vendorId as string,
    staffName: staff.account.name as string
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
export async function authenticateAdminUser(username: any, password: any, hostDb: HostDbClient, mongoDb: MongoDbClient) {
  const user = await hostDb.account.findUnique({
    where: { username }
  });
  if (!user) {
    throw new Error('Invalid username');
  }
  console.log('user', user.role);
  if (user.role!== RoleType.ADMIN) {
    throw new Error('User is not an admin');
  }
  const isPasswordMatch = verifyEncrypted(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid password');
  }

  const userInfo = {
    username: user.name,
    role: RoleType.ADMIN,

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

