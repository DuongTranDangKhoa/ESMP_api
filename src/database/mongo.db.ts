import {
  PrismaClient,
  UserInfo,
  HostInfo,
  VendorInfo,
  SessionData,
} from '../../prisma/clients/mongodb'

export type MongoDbClient = PrismaClient
export type MongoSessionData = SessionData
export type MongoDbUserType = UserInfo
export type MongoDbHostType = HostInfo
export type MongoDbVendorType = VendorInfo

export const mongoDb = new PrismaClient()
