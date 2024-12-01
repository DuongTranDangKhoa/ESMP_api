import { HostDbClient } from '../../database/dbClient.db';
import { encrypt } from '../../utilities/crypting.util';


export const hostRepo = {
     async getAllHosts(hostDb: HostDbClient) {
    return await hostDb.host.findMany({
      include: {
        account: true, 
      },
    });
  },
  async findAccountByUsername(username: string, hostDb: HostDbClient) {
    return await hostDb.account.findFirst({
      where: { username },
    });
  },
   async findAccountByUserId(id: string, hostDb: HostDbClient) {
    return await hostDb.account.findFirst({
      where: { id },
    });
  },
  async findHostByUserId(userId: string, hostDb: HostDbClient) {
    return await hostDb.host.findFirst({
      where: { userid: userId },
    });
  },
async findHostByHostId(hostId: string, hostDb: HostDbClient) {
  return await hostDb.host.findUnique({
    where: { hostid: hostId },
    include: {
      account: true,
    },
  });
},
  async createHost(data: any, hostDb: HostDbClient) {
    const inputpassword = encrypt(data.password)
    return await hostDb.account.create({
      data: {
        username: data.username,
        password: inputpassword,
        role: 'host',
        name: data.name,
         phone: data.phone,
         email: data.email,
        host: {
          create: {
            expiretime: data.expiretime,
          },
        },
      },
    });
  },

  async updateHost(hostId: string, data: any, hostDb: HostDbClient) {
    let inputpassword
    if(data.apibanking){
     inputpassword = encrypt(data.apibanking)
    }
  
    return await hostDb.host.update({
      where: { hostid: hostId },
      data:{
        expiretime: data.expiretime,
        bankingaccount: data.bankingaccount,
        eventstoragetime: data.eventstoragetime,
        apibanking: inputpassword,
      },
    });
  },

  async updateAccount(accountId: string, data: any, hostDb: HostDbClient) {
    const checkemail = await hostDb.account.count({where: { email: data.email }});
    if(checkemail > 1){
      throw new Error('Email already exists')
    }
    return await hostDb.account.update({
      where: { id: accountId },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
      },
    });
  },
  async updatePassword(accountId: string, data: any, hostDb: HostDbClient) {
    const inputpassword = encrypt(data.password)
    return await hostDb.account.update({
      where: { id: accountId },
      data: {
        password: inputpassword,
      },
    });
  },
};
