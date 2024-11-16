import { RoleType } from './../../common/constant/common.constant';
import { NotFoundError } from 'elysia'
import { HostDbClient } from '../../database/host.db'
import { AuthenticationError } from '../../errors/authentication.error'
import { decrypt, encrypt, verifyEncrypted } from '../../utilities/crypting.util'
import { VendorType, VendorObject, VendorAccountType, RegisterVendorObject } from './vendor.schema'
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

const getVendorByIdHost = async (
  hostId: string,
  hostDb: HostDbClient,
) => {
  const vendor = await hostDb.vendor.findMany({
    where: {
      hostid :hostId,
    },
  })
  if (!vendor) {
    throw new NotFoundError('Vendor not found')
  }
  let Vendoraccount = []
  for (const vendorArr of vendor) {
  const account = await hostDb.account.findUnique({
    where: {
      id: vendorArr.userid,
    },
  })

  if (account) {
  const password = decrypt(account.password)    
  const accoutList = {
    vendorid: vendorArr.vendorId,
    userid: vendorArr.userid,
    username: account.username,
    password: password,
    name: account.name,
    phone: vendorArr.phone,
    email: vendorArr.email,
    address: vendorArr.address,
    urlQr: vendorArr.urlQr,
    status: vendorArr.status,
    role: account.role,
  }
  Vendoraccount.push(accoutList)
  }
}

   await hostDb.$disconnect();
  return Vendoraccount
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
    hostId: string,
  vendor: RegisterVendorObject,
  hostDb: HostDbClient,
) => {
  const inputData = new RegisterVendorObject(vendor)
  console.log('inputData', inputData.username)
  const checkAccount = await hostDb.account.findUnique({ 
    where: { username: inputData.username }
})
  console.log('checkAccount', checkAccount)
  if(checkAccount){
    throw new Error('Username already exists')
  }
  const inputpassword = encrypt(inputData.password)
  console.log('inputData', inputData)
  const account = await hostDb.account.create({
    data: {
      username: inputData.username,
      password: inputpassword,
      name: inputData.name,
      role: 'manager',
    },
  })
  const vendorAccount = await hostDb.vendor.create({
    data: {
      userid: account.id,
      hostid: hostId,
      phone: inputData.phone,
      email: inputData.email,
      address: inputData.address,
      urlQr: inputData.urlQr,
      status: true,
      // status: EventRegisterStatus.pending, // pending for approval by host admin
      // createBy: 'host',
      // updatedBy: 'host',
    },
  })
   await hostDb.$disconnect();
   return {
    message: 'Vendor created successfully',
    vendorId: vendorAccount.vendorId,
   }
}

const updateVendor = async (
  vendorId: string,
  vendor: VendorObject,
  hostDb: HostDbClient,
): Promise<void> => {
  if(vendor.name){
    const vendorAccount = await hostDb.vendor.findUnique({ where: { vendorId } });
    
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
) => {
 const vendor= await hostDb.vendor.delete({
    where: {
      vendorId,
    },
  })
  await hostDb.account.delete({
    where: {
      id: vendor.userid, 
    },
  })
  return { message: 'Vendor deleted' }
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
  getVendorByIdHost,
  deleteVendor,
  createVendor,
  // getVendorRegisteredEvents,
  // registerEvent,
}

export default vendorService
