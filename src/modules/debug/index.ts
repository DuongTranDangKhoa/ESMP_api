import logger from '../../config/logger.config'
import { logInfo } from '../../utilities/logger.util'

export const debuggingGroup = (app: any) =>
  app.get('/', ({ masterDb, mongoDb, hostDb, userInfo }: any) => {
    logInfo('masterDb:', masterDb)
    logInfo('mongoDb:', mongoDb)
    logInfo('hostDb:', hostDb)
    logInfo('userInfo:', userInfo)
    return { masterDb, mongoDb, hostDb, userInfo }
  })
