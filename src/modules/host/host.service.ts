import { HostDbClient } from '../../database/host.db'
import { MasterDbClient } from '../../database/master.db'
import { AuthenticationError } from '../../errors/authentication.error'
import { verifyEncrypted } from '../../utilities/crypting.util'
import { compareDateToNow } from '../../utilities/datetime.util'
import { HostType } from './host.schema'

export const authenticateHostUser = async (
  username: string,
  password: string,
  hostDb: HostDbClient,
): Promise<HostType> => {
  const account = await hostDb.account.findFirst({
    where: { username },
  });
  if (!account) {
    throw new AuthenticationError("Host's account not found")
  }
  const host = await hostDb.host.findFirst({
    where: {
    userid: account.id,
    },
  })
  // check if host is existed
  if (!host) {
    throw new AuthenticationError('Invalid username')
  }
  // verify password
  const isPasswordMatch = verifyEncrypted(password, account.password)
  if (!isPasswordMatch) {
    throw new AuthenticationError('Invalid password')
  }

  verifyHostContract(host)

  return host
}

export const getHostAndVerify = async (
  hostCode: string,
  hostDb: HostDbClient,
): Promise<HostType> => {
  if (!hostCode) {
    throw new AuthenticationError("Host's code not provided")
  }

  const host = await hostDb.host.findUnique({
    where: {
      hostid: hostCode,
    },
  })

  // check if host is existed
  if (!host) {
    throw new AuthenticationError('Invalid host')
  }

  verifyHostContract(host)

  return host
}

function verifyHostContract(host: HostType) {
  // verify if host's contract is valid
  if (
    compareDateToNow(host.expiretime) === -1
  ) {
    throw new AuthenticationError('Invalid host contract')
  }
}
