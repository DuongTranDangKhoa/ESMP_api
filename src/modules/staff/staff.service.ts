import { HostDbClient } from "../../database/dbClient.db";
import { AuthenticationError } from "../../errors/authentication.error";
import { decrypt, encrypt, verifyEncrypted } from "../../utilities/crypting.util";
import { RegisterVendorObject, VendorAccountType } from "./staff.schema";

const authenticateStaffUser = async (
  username: string,
  password: string,
  hostDb: HostDbClient,
) => {

  if (!hostDb || !hostDb.account) {
    throw new Error('Database client not initialized or account model missing');
  }

  const user = await hostDb.account.findFirst({
    where: { username }
  });
  
  if (!user) {
    throw new AuthenticationError('Invalid username or you are not a vendor');
  }

  const staff = await hostDb.staff.findFirst({
    where: { userid: user.id },
  });
  
  console.log('vendor', staff);

  if (!staff) {
    throw new AuthenticationError('Invalid username');
  }

  const isPasswordMatch = verifyEncrypted(password, user.password);
  if (!isPasswordMatch) {
    throw new AuthenticationError('Invalid password');
  }

  await hostDb.$disconnect();

  return new VendorAccountType(user, staff);
};
const createStaff = async (id: string,body: RegisterVendorObject, hostDb: HostDbClient) => {
      const checkStaff = await hostDb.account.findUnique({ where: { username: body.username } });
      if (checkStaff) {
        throw new Error('Username already exists');
      }
      const inputpassword = encrypt(body.password)
      const account = await hostDb.account.create({
    data: {
      username: body.username,
      password: inputpassword,
      name: body.name,
      role: 'staff',
      status: true,
    },
  })
  const staffAccount = await hostDb.staff.create({
    data: {
      userid: account.id,
      vendorId: id,
    },
  });
  await hostDb.$disconnect();
   return {
    message: 'Staff created successfully',
    vendorId: staffAccount.staffid,
   }
}
const getStaffByVendorId = async (vendorId: string, hostDb: HostDbClient) => {
      const staff = await hostDb.staff.findMany({ where: { vendorId: vendorId } });
      let accountStaff= [];
      for (const accoutStaff of staff) {
      const listAccount = await hostDb.account.findUnique({ where: { id: accoutStaff.userid } });
      if(!listAccount){
        throw new Error('Account not found');
      }
      const isPassword = decrypt(listAccount?.password)
      accountStaff.push({
        staffId: accoutStaff.staffid,
        username: listAccount.username,
        password: isPassword,
        name: listAccount.name,
        role: listAccount.role,
        status: listAccount.status,
      })
    }
           await hostDb.$disconnect(); 
      return accountStaff;
 
    }
  const updateStaff = async (staffId: string, body: any, hostDb: HostDbClient) => {
      const staff = await hostDb.staff.findUnique({ where: { staffid: staffId } });
      if (!staff) {
        throw new Error('Staff not found');
      }
      const account = await hostDb.account.findUnique({ where: { id: staff.userid } });
      if (!account) {
        throw new Error('Account not found');
      }
      const inputpassword = encrypt(body.password)
      const updateAccount = await hostDb.account.update({
        where: { id: staff.userid },
        data: {
          password: inputpassword,
          name: body.name,
          status: body.status,
        },
      });
      await hostDb.$disconnect();
      return {
        message: 'Staff updated successfully',
        staffId: staffId,
      }
    }
  
const staffService = {
  authenticateStaffUser,
  createStaff,
  updateStaff,
  getStaffByVendorId
}
export default staffService