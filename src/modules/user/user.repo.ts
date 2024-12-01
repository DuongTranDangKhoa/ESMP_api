import { HostDbClient } from '../../database/dbClient.db';
import { RoleType } from '../../common/constant/common.constant';
import { JsonValue } from '../../../prisma/clients/postgres/hostdb/runtime/library';
import { decrypt, verifyEncrypted } from '../../utilities/crypting.util';


export const userRepository = {
 getAccountbyId: async (id: string, hostDb: HostDbClient) => {
    try {
      const user = await hostDb.account.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  },
  getAccoutbyEmail: async (email: string, hostDb: HostDbClient) => {
    try {
      const user = await hostDb.account.findUnique({
        where: { email },
      });
      return{ email: user?.email,
              accountid: user?.id
        };
    }
     catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  },
  getRole: async (username: string, hostDb: HostDbClient) => {
    try {
      const user = await hostDb.account.findUnique({
        where: { username: username },
      });
      return user?.role;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  },
}

