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
async deleteEventWithRelations(hostId: string, hostDb: HostDbClient) {
  // Bước 1: Lấy tất cả eventId của hostId
  const eventIds = await hostDb.event.findMany({
    where: { hostId },
    select: { eventId: true },
  }).then(events => events.map(event => event.eventId));

  if (eventIds.length === 0) {
    throw new Error("No events found for this host.");
  }

  // Thực hiện giao dịch để xóa Event và tất cả các bản ghi liên quan
  await hostDb.$transaction(async (prisma) => {
    // Bước 2: Xóa các bản ghi trong EventPayment
    await prisma.eventPayment.deleteMany({
      where: {
        locationId: {
          in: await prisma.location.findMany({
            where: {
              typeId: {
                in: await prisma.locationType.findMany({
                  where: {
                    eventId: { in: eventIds },
                  },
                  select: { typeId: true },
                }).then(locationTypes => locationTypes.map(locationType => locationType.typeId)),
              },
            },
            select: { locationId: true },
          }).then(locations => locations.map(location => location.locationId)),
        },
      },
    });

    // Bước 3: Xóa các bản ghi trong Location
    await prisma.location.deleteMany({
      where: {
        typeId: {
          in: await prisma.locationType.findMany({
            where: {
              eventId: { in: eventIds },
            },
            select: { typeId: true },
          }).then(locationTypes => locationTypes.map(locationType => locationType.typeId)),
        },
      },
    });

    // Bước 4: Xóa các bản ghi trong LocationType
    await prisma.locationType.deleteMany({
      where: {
        eventId: { in: eventIds },
      },
    });

    // Bước 5: Xóa các bản ghi trong VendorInEvent
    await prisma.vendorInEvent.deleteMany({
      where: {
        eventId: { in: eventIds },
      },
    });

    // Bước 6: Xóa các bản ghi trong Event
    await prisma.event.deleteMany({
      where: {
        hostId,
      },
    });
  });
}
};
