import { HostDbClient } from "../../database/host.db";
import { AuthenticationError } from "../../errors/authentication.error";
import { verifyEncrypted } from "../../utilities/crypting.util";
import { VendorAccountType } from "./staff.schema";

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
const staffService = {
  authenticateStaffUser
}
export default staffService