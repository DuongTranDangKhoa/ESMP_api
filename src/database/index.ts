import { getHostDbClient, HostDbClient } from './host.db'
import { masterDb, MasterDbClient } from './master.db'
import { mongoDb, MongoDbClient } from './mongo.db'

export const initiateDatabase = (): {
  mongoDb: MongoDbClient
  masterDb: MasterDbClient
} => {
  return { mongoDb, masterDb }
}

export const initiateHostDatabase = (userInfo: any): HostDbClient => {
  return getHostDbClient(userInfo.hostInfo.hostCode)
}
