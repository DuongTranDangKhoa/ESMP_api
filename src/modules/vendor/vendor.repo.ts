import { HostDbClient } from "../../database/dbClient.db";
import { VendorObject, RegisterVendorObject } from "./vendor.schema";
import { NotFoundError } from "elysia";
import { AuthenticationError } from "../../errors/authentication.error";
import { decrypt, encrypt, verifyEncrypted } from "../../utilities/crypting.util";

// Vendor Repository to handle DB operations
export const vendorRepository = {
  // Authentication logic for vendor login
  authenticateVendorUser: async (username: string, password: string, hostDb: HostDbClient) => {
    const user = await hostDb.account.findFirst({ where: { username } });
    if (!user) throw new AuthenticationError('Invalid username or you are not vendor');
      if (user.status === false) {
    throw new AuthenticationError('Account is blocked');
  }
    const vendor = await hostDb.vendor.findFirst({ where: { userid: user.id } });
    if (!vendor) throw new AuthenticationError('Invalid username');

    const isPasswordMatch = verifyEncrypted(password, user.password);
    if (!isPasswordMatch) throw new AuthenticationError('Invalid password');

    return { user, vendor };
  },

  // Fetch all vendors
  getVendorList: async (hostDb: HostDbClient) => {
    return await hostDb.vendor.findMany();
  },

  // Get vendor by ID
  getVendorById: async (vendorId: string, hostDb: HostDbClient) => {
    const vendor = await hostDb.vendor.findUnique({ where: { vendorId } });
    if (!vendor) throw new NotFoundError('Vendor not found');

    const account = await hostDb.account.findUnique({ where: { id: vendor.userid } });
    if (!account) throw new NotFoundError('Account not found for this vendor');

    return {
      vendorid: vendor.vendorId,
      userid: vendor.userid,
      hostid: vendor.hostid,
      username: account.username,
      password: decrypt(account.password),
      name: account.name,
      phone: account.phone,
      email: account.email,
      address: vendor.address,
      urlQr: vendor.urlQr,
      status: account.status,
      role: account.role,
    };
  },
  getVendorByHostId: async (hostId: string, hostDb: HostDbClient) => {
    const vendors = await hostDb.vendor.findMany({
      where: {
        hostid: hostId,
      },
    });
    if (!vendors || vendors.length === 0) {
      throw new NotFoundError('No vendors found for this host');
    }

    let vendorAccounts = [];
    for (const vendor of vendors) {
      const account = await hostDb.account.findUnique({
        where: {
          id: vendor.userid,
        },
      });
      if (account) {
        const password = decrypt(account.password);
        vendorAccounts.push({
          vendorId: vendor.vendorId,
          userid: vendor.userid,
          username: account.username,
          password: password, // Decrypting password
          name: account.name,
          phone: account.phone,
          email: account.email,
          address: vendor.address,
          urlQr: vendor.urlQr,
          status: account.status,
          role: account.role,
        });
      }
    }
    return vendorAccounts;
  },
  // Create a new vendor
  createVendor: async (hostId: string, vendor: RegisterVendorObject, hostDb: HostDbClient) => {
    const existingAccount = await hostDb.account.findUnique({ where: { username: vendor.username } });
    if (existingAccount) throw new Error('Username already exists');

    const encryptedPassword = encrypt(vendor.password);

    const account = await hostDb.account.create({
      data: {
        username: vendor.username,
        password: encryptedPassword,
        name: vendor.name,
        phone: vendor.phone,
        email: vendor.email,
        role: 'manager',
        status: true,
      },
    });

    const newVendor = await hostDb.vendor.create({
      data: {
        userid: account.id,
        hostid: hostId,
        address: vendor.address,
        urlQr: vendor.urlQr,
      },
    });

    return newVendor;
  },

  // Update an existing vendor's details
  updateVendor: async (vendorId: string, vendor: VendorObject, hostDb: HostDbClient) => {
     const checkemail = await hostDb.account.count({where: { email: vendor.email }});
    if(checkemail > 1){
      throw new Error('Email already exists')
    }
    const existingVendor = await hostDb.vendor.findUnique({ where: { vendorId } });
    if (!existingVendor) throw new NotFoundError('Vendor not found');

    const updatedAccount = await hostDb.account.update({
      where: { id: existingVendor.userid },
      data: {
        name: vendor.name,
        phone: vendor.phone,
        email: vendor.email,
          status: vendor.status,
      },
    });

    await hostDb.vendor.update({
      where: { vendorId },
      data: {
        address: vendor.address,
        urlQr: vendor.urlQr,
      },
    });

    return updatedAccount;
  },

  // Delete a vendor
  deleteVendor: async (vendorId: string, hostDb: HostDbClient) => {
    const vendor = await hostDb.vendor.findUnique({ where: { vendorId } });
    if (!vendor) throw new NotFoundError('Vendor not found');

    await hostDb.vendor.delete({ where: { vendorId } });
    await hostDb.account.delete({ where: { id: vendor.userid } });

    return { message: 'Vendor deleted successfully' };
  },
};
