import { HostDbClient } from '../../database/dbClient.db';

export const hostRepo = {
     async getAllHosts(hostDb: HostDbClient) {
    return await hostDb.host.findMany({
      include: {
        account: true, // Bao gồm thông tin tài khoản liên kết
      },
    });
  },
  async findAccountByUsername(username: string, hostDb: HostDbClient) {
    return await hostDb.account.findFirst({
      where: { username },
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
    });
  },

  async createHost(data: any, hostDb: HostDbClient) {
    return await hostDb.account.create({
      data: {
        username: data.username,
        password: data.password,
        role: 'host',
        name: data.name,
        host: {
          create: {
            phone: data.phone,
            email: data.email,
            expiretime: data.expiretime,
          },
        },
      },
    });
  },

  async updateHost(hostId: string, data: any, hostDb: HostDbClient) {
    return await hostDb.host.update({
      where: { hostid: hostId },
      data:{
        expiretime: data.expiretime,
        bankingaccount: data.bankingaccount,
        phone: data.phone,
        email: data.email,
        eventstoragetime: data.eventstoragetime,
      },
    });
  },

  async updateAccount(accountId: string, data: any, hostDb: HostDbClient) {
    return await hostDb.account.update({
      where: { id: accountId },
      data: {
        name: data.name,
      },
    });
  },
};
