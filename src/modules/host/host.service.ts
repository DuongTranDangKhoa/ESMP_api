// import { HostDbClient } from '../../database/dbClient.db'
// import { AuthenticationError } from '../../errors/authentication.error'
// import { verifyEncrypted } from '../../utilities/crypting.util'
// import { compareDateToNow } from '../../utilities/datetime.util'
// import { HostType } from './host.schema'

// export const authenticateHostUser = async (
//   username: string,
//   password: string,
//   hostDb: HostDbClient,
// ): Promise<HostType> => {
//   const account = await hostDb.account.findFirst({
//     where: { username },
//   });
//   if (!account) {
//     throw new AuthenticationError("Host's account not found")
//   }
//   const host = await hostDb.host.findFirst({
//     where: {
//     userid: account.id,
//     },
//   })
//   // check if host is existed
//   if (!host) {
//     throw new AuthenticationError('Invalid username')
//   }
//   // verify password
//   const isPasswordMatch = verifyEncrypted(password, account.password)
//   if (!isPasswordMatch) {
//     throw new AuthenticationError('Invalid password')
//   }

//   verifyHostContract(host)

//   return host
// }

// export const getHostAndVerify = async (
//   hostCode: string,
//   hostDb: HostDbClient,
// ): Promise<HostType> => {
//   if (!hostCode) {
//     throw new AuthenticationError("Host's code not provided")
//   }

//   const host = await hostDb.host.findUnique({
//     where: {
//       hostid: hostCode,
//     },
//   })

//   // check if host is existed
//   if (!host) {
//     throw new AuthenticationError('Invalid host')
//   }

//   verifyHostContract(host)

//   return host
// }

// function verifyHostContract(host: HostType) {
//   // verify if host's contract is valid
//   if (
//     compareDateToNow(host.expiretime) === -1
//   ) {
//     throw new AuthenticationError('Invalid host contract')
//   }
// }
import { hostRepo } from './host.repo';
import { HostDbClient } from '../../database/dbClient.db';
import { AuthenticationError } from '../../errors/authentication.error';
import { decrypt, verifyEncrypted } from '../../utilities/crypting.util';
import { compareDateToNow } from '../../utilities/datetime.util';
import { HostType } from './host.schema';
import { message } from 'statuses';

export const authenticateHostUser = async (
  username: string,
  password: string,
  hostDb: HostDbClient
): Promise<HostType> => {
  const account = await hostRepo.findAccountByUsername(username, hostDb);
  if (!account) {
    throw new AuthenticationError("Host's account not found");
  }

  const host = await hostRepo.findHostByUserId(account.id, hostDb);
  if (!host) {
    throw new AuthenticationError('Invalid username');
  }

  const isPasswordMatch = verifyEncrypted(password, account.password);
  if (!isPasswordMatch) {
    throw new AuthenticationError('Invalid password');
  }

  verifyHostContract(host);
  return host;
};

export const getHostAndVerify = async (
  hostCode: string,
  hostDb: HostDbClient
): Promise<HostType> => {
  if (!hostCode) {
    throw new AuthenticationError("Host's code not provided");
  }

  const host = await hostRepo.findHostByHostId(hostCode, hostDb);
  if (!host) {
    throw new AuthenticationError('Invalid host');
  }
    const decryptedPassword = decrypt(host.account.password); 
    host.account.password = decryptedPassword;
  verifyHostContract(host);
  return host;
};
export const getAllHosts = async (hostDb: HostDbClient) => {
  return await hostRepo.getAllHosts(hostDb);
};
export const createHost = async (data: any, hostDb: HostDbClient) => {
  return await hostRepo.createHost(data, hostDb);
};

export const updateHost = async (hostId: string, data: any, hostDb: HostDbClient) => {
   const host = await hostRepo.updateHost(hostId, data, hostDb);
  //  await hostRepo.updateAccount(host.userid, data.name , hostDb);
   return 'Update Successfull Host'
};
export const dencryptionApiBanking = async (data: any, hostDb: HostDbClient) => {
   const inputpassword = decrypt(data.apibanking)
   return {
    message: 'Dencryption Sucessfully',
    id: inputpassword
   }
}
export const updatePassword = async (
  accountId: string,
  newPassword: string,
  hostDb: HostDbClient
) => {
  return await hostRepo.updateAccount(accountId, { password: newPassword }, hostDb);
};

function verifyHostContract(host: HostType) {
  if (compareDateToNow(host.expiretime) === -1) {
    throw new AuthenticationError('Invalid host contract');
  }
}
