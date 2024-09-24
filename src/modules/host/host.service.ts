import { MasterDbClient } from '../../database/master.db'
import { AuthenticationError } from '../../errors/authentication.error'
import { verifyEncrypted } from '../../utilities/crypting.util'
import { compareDateToNow } from '../../utilities/datetime.util'
import { HostType } from './host.schema'

export const authenticateHostUser = async (
  username: string,
  password: string,
  masterDb: MasterDbClient,
): Promise<HostType> => {
  const host = await masterDb.host.findFirst({
    select: {
      hostId: true,
      hostCode: true,
      username: true,
      password: true,
      hostName: true,
      contractStartDate: true,
      contractEndDate: true,
    },
    where: {
      username,
    },
  })
  // check if host is existed
  if (!host) {
    throw new AuthenticationError('Invalid username')
  }
  // verify password
  const isPasswordMatch = verifyEncrypted(password, host.password)
  if (!isPasswordMatch) {
    throw new AuthenticationError('Invalid password')
  }

  verifyHostContract(host)

  return host
}

export const getHostAndVerify = async (
  hostCode: string,
  masterDb: MasterDbClient,
): Promise<HostType> => {
  if (!hostCode) {
    throw new AuthenticationError("Host's code not provided")
  }

  const host = await masterDb.host.findUnique({
    select: {
      hostId: true,
      hostCode: true,
      username: true,
      password: true,
      hostName: true,
      contractStartDate: true,
      contractEndDate: true,
    },
    where: {
      hostCode,
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
    compareDateToNow(host.contractStartDate) === 1 ||
    compareDateToNow(host.contractEndDate) === -1
  ) {
    throw new AuthenticationError('Invalid host contract')
  }
}
