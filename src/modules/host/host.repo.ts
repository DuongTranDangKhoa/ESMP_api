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
    const account = await hostDb.account.create({
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
    return account;
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
    const account = await hostDb.account.findUnique({where: { id: accountId }});
    if(account?.status === data.status){
    return await hostDb.account.update({
      where: { id: accountId },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        status: data.status,
      },
    });
  } else {
    return await hostDb.account.update({
      where: { id: accountId },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        status: data.status,
        updatedat: new Date(),
      },
  });
  }
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
async deleteHost(accountId: string, hostDb: HostDbClient) {
   try{
    console.log("accountId", accountId)
    await hostDb.host.delete({ where: { userid: accountId}});
    await hostDb.account.delete({ where: { id: accountId}});
    return 'Delete Successfull Host'
   } catch (error) {
     console.error('Error deleting host:', error);
     throw new Error('Failed to delete host');
   }
},
async deleteEventWithRelations(hostId: string, hostDb: HostDbClient) {
  // Fetch all event IDs associated with the host
  const eventIds = await hostDb.event.findMany({
    where: { hostId },
    select: { eventId: true },
  }).then(events => events.map(event => event.eventId));

  if (eventIds.length === 0) {
    throw new Error("No events found for this host.");
  }

  // Fetch related type IDs for events
  const typeIds = await hostDb.locationType.findMany({
    where: { eventId: { in: eventIds } },
    select: { typeId: true },
  }).then(locationTypes => locationTypes.map(locationType => locationType.typeId));

  // Fetch related location IDs for type IDs
  const locationIds = await hostDb.location.findMany({
    where: { typeId: { in: typeIds } },
    select: { locationId: true },
  }).then(locations => locations.map(location => location.locationId));
  
  // Fetch vendor-in-event IDs related to the events
  const vendorInEventIds = await hostDb.vendorInEvent.findMany({
    where: { eventId: { in: eventIds } },
    select: { vendorinEventId: true },
  }).then(vendors => vendors.map(vendor => vendor.vendorinEventId));
  console.log("vendorInEventIds", vendorInEventIds);
  await hostDb.productItemInMenu.deleteMany({
    where: { menuId: { in: vendorInEventIds } },
  });
  await hostDb.menu.deleteMany({
    where: { menuId: { in: vendorInEventIds } },
  })
  // Delete related entities in order
  

  await hostDb.eventPayment.deleteMany({
    where: { locationId: { in: locationIds } },
  });

  await hostDb.location.deleteMany({
    where: { typeId: { in: typeIds } },
  });

  await hostDb.locationType.deleteMany({
    where: { eventId: { in: eventIds } },
  });

  await hostDb.vendorInEvent.deleteMany({
    where: { eventId: { in: eventIds } },
  });

  await hostDb.service.deleteMany({
    where: { eventid: { in: eventIds } },
  });

  // Finally, delete the events
  await hostDb.event.deleteMany({
    where: { hostId },
  });

  console.log("Deleted all related entities for events.");
}
};
