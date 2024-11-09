import { RoleType } from './../../common/constant/common.constant';
import { NotFoundError } from 'elysia'
import { HostDbClient } from '../../database/host.db'
import { AuthenticationError } from '../../errors/authentication.error'
import { verifyEncrypted } from '../../utilities/crypting.util'
import { VendorType, VendorObject, VendorAccountType } from './vendor.schema'
// import { EventRegisterObject } from '../event/event.schema'
import { EventRegisterStatus } from '../../common/constant/common.constant'

const authenticateVendorUser = async (
  username: string,
  password: string,
  hostDb: HostDbClient,
): Promise<VendorAccountType> => {
  console.log('username', username)
  const user = await hostDb.account.findFirst(
    { where: { username   } })
    if(!user){
      throw new AuthenticationError('Invalid username or you are not vendor')
    }
  const vendor = await hostDb.vendor.findFirst({
    where: {
      userid: user.id
    },
  })
   console.log('vendor', vendor)
  // check if vendor is existed
  if (!vendor) {
    throw new AuthenticationError('Invalid username')
  }
  // verify password
  const isPasswordMatch = verifyEncrypted(password, user.password)
  if (!isPasswordMatch) {
    throw new AuthenticationError('Invalid password')
  }
   await hostDb.$disconnect();
  
  return new VendorAccountType(user, vendor)
}

const getVendorList = async (hostDb: HostDbClient): Promise<VendorObject[]> => {
  const vendors = await hostDb.vendor.findMany()
  const vendorArr = vendors.map((vendor) => new VendorObject(vendor))
   await hostDb.$disconnect();
  return vendorArr
}

const getVendorById = async (
  vendorId: string,
  hostDb: HostDbClient,
) => {
  const vendor = await hostDb.vendor.findUnique({
    where: {
      vendorId,
    },
  })
  if (!vendor) {
    throw new NotFoundError('Vendor not found')
  }
   await hostDb.$disconnect();
  return new VendorObject(vendor)
}

const createVendor = async (
  vendor: VendorType,
  hostCode: string,
  hostDb: HostDbClient,
): Promise<void> => {
  const inputData = new VendorObject(vendor)
  await hostDb.vendor.create({
    data: {
      username: inputData.username,
      password: hostCode,
      vendorName: inputData.vendorName,
      // createBy: 'host',
      // updatedBy: 'host',
    },
  })
   await hostDb.$disconnect();
}

const updateVendor = async (
  vendorId: string,
  vendor: VendorObject,
  hostDb: HostDbClient,
): Promise<void> => {
  if(!vendor.name){
    const vendorAccount = await hostDb.vendor.findFirst({ where: { vendorId } });
    if(!vendorAccount){
      throw new NotFoundError('Vendor not found')
    }
    await hostDb.account.update({
    where: {
      id: vendorAccount.userid,
    },
    data: {
      name: vendor.name
    },
  })
  }
  await hostDb.vendor.update({
    where: {
      vendorId,
    },
    data: {
      phone: vendor.phone,
      address: vendor.address,
      email: vendor.email,
      urlQr: vendor.urlQr,
      status: vendor.status,
    },
  })
   await hostDb.$disconnect();
}

const deleteVendor = async (
  vendorId: string,
  hostDb: HostDbClient,
): Promise<void> => {
  await hostDb.vendor.delete({
    where: {
      vendorId,
    },
  })
   await hostDb.$disconnect();
}

// const getVendorRegisteredEvents = async (
//   vendorId: string,
//   hostDb: HostDbClient,
// )=> {
//   const vendorRegisteredEvents = await hostDb.eventPayment.findMany({
//     where: {
//       vendorId,
//     },
//   })
//    await hostDb.$disconnect();
//   return vendorRegisteredEvents
// }

// const registerEvent = async (
//   vendorId: string,
//   eventId: string,
//   hostDb: HostDbClient,
// ): Promise<void> => {
//   await hostDb.eventPayment.create({
//     data: {
//       vendorId: vendorId,
//       eventId: eventId,
     
//     },
//   })
// }

const vendorService = {
  authenticateVendorUser,
  getVendorList,
  getVendorById,
  updateVendor,
  deleteVendor,
  createVendor,
  // getVendorRegisteredEvents,
  // registerEvent,
}

export default vendorService
