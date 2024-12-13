import { Vendor } from './../../../prisma/prismabox/postgres/hostdb/Vendor';
import { CreateNotificationInput } from './../notification/notification.schema';
import {  HostDbClient } from '../../database/dbClient.db'
// import { MongoDbClient, MongoDbUserType } from '../../database/mongo.db'
import { LoginResponseType } from './user.schema'
import * as dbService from '../clientDb/Db.service'
import * as hostService from '../host/host.service'
import * as configService from '../config/config.service'
import vendorService from '../vendor/vendor.service'
import { RoleType } from '../../common/constant/common.constant'
import staffService from '../staff/staff.service'
import { verifyEncrypted } from '../../utilities/crypting.util'
import { JsonValue } from '../../../prisma/clients/postgres/hostdb/runtime/library'
import { userRepository } from './user.repo'
import { notificationRepo } from '../notification/notification.repo';
/**
 * Create user session
 * @param {MongoDbUserType} userInfo
 * @param {(MasterDbClient | HostDbClient)} db
 * @param {MongoDbClient} mongoDb
 * @returns {UUID} accessToken
 */
async function createUserSession(
  userInfo: JsonValue,
  db: HostDbClient,
  mongoDb: HostDbClient ,
) {
  // declare session expired time
  const sessionExpireTime = await configService.getSessionExpireTime(db)
 
  // create session for user
  const accessToken = await dbService.createUserSession(
    userInfo as JsonValue,
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
  mongoDb: HostDbClient,
): Promise<LoginResponseType> {
  const host = await hostService.authenticateHostUser(
    username,
    password,
    hostDb,
  )

  const userInfo = {
    username,
    hostInfo: {
      hostName: host.name as string,
      email: host.email as string,
      hostId: host.hostid as string,
     expiretime : host.expiretime,
    },
  }

  // create session for user
  const accessToken = await createUserSession(
    userInfo as JsonValue,
    hostDb,
    mongoDb,
  )

  return {
    accessToken,
    role: RoleType.HOST,
    userInfo,
    
  }
}

export async function authenticateVendorUser(
  username: string,
  password: string,
  hostDb: HostDbClient,
  mongoDb: HostDbClient,
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
       hostName: host.name as string,
       email: host.email as string,
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
    userInfo as JsonValue,
    hostDb,
    mongoDb,
  )

  return {
    accessToken,
    role: RoleType.MANAGER,
    userInfo,
    
  }
}
export async function authenticateStaffUser(
  username: string,
  password: string,
  hostDb: HostDbClient,
  mongoDb: HostDbClient,
): Promise<LoginResponseType> {
  const staff = await staffService.authenticateStaffUser(
    username,
    password,
    hostDb,
  )
  const vendor = await vendorService.getVendorById( staff.staff.vendorId, hostDb);
  const vendorName = await userRepository.getAccountbyId(vendor?.userid, hostDb);
  // const vendorName = await hostDb.account.findUnique({where: {id: vendor?.userid}});
  if (!vendor){
    throw new Error('Vendor not found');
  }
   const host = await hostService.getHostAndVerify(vendor?.hostid, hostDb)
  const userInfo = {
  username,
  role: RoleType.STAFF,
  hostInfo: {
      hostName: host?.name as string,
      email: host?.email as string,
      hostId: host?.hostid as string,
      expiretime : host?.expiretime,
  },
  vendorInfo: {
    vendorName: vendorName?.name as string,
    email: vendorName?.email as string,
    vendorId: vendor?.vendorid as string,
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
    userInfo as JsonValue,
    hostDb,
    mongoDb,
  )

  return {
    accessToken,
    role: RoleType.STAFF,
    userInfo,
    
  }
}
export async function logOutUser(accessToken: string, mongoDb: HostDbClient) {
  await dbService.clearUserTokens(accessToken, mongoDb)
}
export async function authenticateAdminUser(username: any, password: any, hostDb: HostDbClient, mongoDb: HostDbClient) {
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
    userId: user.id,
  }
  // create session for user
  const accessToken = await createUserSession(
    userInfo as JsonValue,
    hostDb,
    mongoDb,
  )
  return {
    accessToken,
     role: RoleType.ADMIN,
    userInfo,
  }
}
export async function forgotPassword(email: string, hostDb: HostDbClient) {
 const emailUser = await userRepository.getAccoutbyEmail(email, hostDb);
  return emailUser;
}
export async function getRole(username: string, hostDb: HostDbClient): Promise<string> {
  const role = await userRepository.getRole(username, hostDb);
  if (!role) {
    throw new Error('User not found');
  }
  return role;
}
export async function CreateNotificationRegister(body: any, hostDb: HostDbClient) {
  try {
    const users = await userRepository.getRoleAdmin(RoleType.ADMIN, hostDb);

    if (!users || users.length === 0) {
      throw new Error('No admins found to notify.');
    }

   
    const notifications = users.map(user => ({
      userid: user.id, 
      source: body.source,
      status: false, 
    }));

    await Promise.all(
      notifications.map(notification =>
        notificationRepo.createNotification(notification, hostDb)
      )
    );
    return 'Notifications created successfully.';
  } catch (error) {
    throw new Error('Failed to create notifications');
  }
}

