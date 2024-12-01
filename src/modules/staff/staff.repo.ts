import { HostDbClient } from "../../database/dbClient.db";
import { NotFoundError } from "elysia";
import { decrypt, encrypt, verifyEncrypted } from "../../utilities/crypting.util";
import { AuthenticationError } from "../../errors/authentication.error";

// Repository function for authenticating a staff user
export const staffRepository = {
  // Function to authenticate a staff user
  authenticateStaffUser: async (username: string, password: string, hostDb: HostDbClient) => {
    const user = await hostDb.account.findUnique({
      where: { username },
    });

    if (!user) {
      throw new AuthenticationError('Invalid username or you are not a staff');
    }
      if (user.status === false) {
    throw new AuthenticationError('Account is blocked');
  }
    const staff = await hostDb.staff.findFirst({
      where: { userid: user.id },
    });

    if (!staff) {
      throw new AuthenticationError('Invalid username');
    }

    const isPasswordMatch = verifyEncrypted(password, user.password);
    if (!isPasswordMatch) {
      throw new AuthenticationError('Invalid password');
    }

    return { user, staff };
  },

  // Function to create a new staff member
  createStaff: async (vendorId: string, body: any, hostDb: HostDbClient) => {
    const checkStaff = await hostDb.account.findUnique({
      where: { username: body.username },
    });

    if (checkStaff) {
      throw new Error('Username already exists');
    }

    const inputPassword = encrypt(body.password);
    const account = await hostDb.account.create({
      data: {
        username: body.username,
        password: inputPassword,
        name: body.name,
        email: body.email,
        phone: body.phone,
        role: 'staff',
        status: true,
      },
    });

    const staffAccount = await hostDb.staff.create({
      data: {
        userid: account.id,
        vendorId,
      },
    });

    return { message: 'Staff created successfully', staffId: staffAccount.staffid };
  },

  // Function to get all staff for a specific vendor
  getStaffByVendorId: async (vendorId: string, hostDb: HostDbClient) => {
    const staff = await hostDb.staff.findMany({
      where: { vendorId },
    });

    let accountStaff = [];
    for (const staffMember of staff) {
      const account = await hostDb.account.findUnique({
        where: { id: staffMember.userid },
      });

      if (!account) {
        throw new Error('Account not found');
      }

      const decryptedPassword = decrypt(account.password);
      accountStaff.push({
        staffId: staffMember.staffid,
        username: account.username,
        password: decryptedPassword,
        name: account.name,
        role: account.role,
        status: account.status,
      });
    }

    return accountStaff;
  },

  // Function to update staff details
  updateStaff: async (staffId: string, body: any, hostDb: HostDbClient) => {
    const staff = await hostDb.staff.findUnique({
      where: { staffid: staffId },
    });

    if (!staff) {
      throw new Error('Staff not found');
    }

    const account = await hostDb.account.findUnique({
      where: { id: staff.userid },
    });

    if (!account) {
      throw new Error('Account not found');
    }

    const encryptedPassword = encrypt(body.password);

    const updatedAccount = await hostDb.account.update({
      where: { id: staff.userid },
      data: {
        password: encryptedPassword,
        name: body.name,
        email: body.email,
        phone: body.phone,
        status: body.status,
      },
    });

    return { message: 'Staff updated successfully', staffId };
  },
};
