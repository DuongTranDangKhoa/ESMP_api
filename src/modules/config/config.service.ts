
import { HostDbClient } from '../../database/dbClient.db'
import { DEFAULT_SESSION_DURATION } from '../../common/constant/common.constant'
import { getTimeNow } from '../../utilities/datetime.util'

/**
 * Get session expire time
 * @param {(MasterDbClient | HostDbClient)} db
 * @returns {number} sessionExpireTime
 */
export async function getSessionExpireTime(db:  HostDbClient) {
  const config = await db.config.findFirst()
  const sessionExpireTime =
    getTimeNow() + (config?.sessionDuration || DEFAULT_SESSION_DURATION) * 60 //minutes to second
    db.$disconnect();
  return sessionExpireTime
}
