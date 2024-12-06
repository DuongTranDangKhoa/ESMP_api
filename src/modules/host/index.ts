import {
  CreateHostSchema,
  UpdateHostSchema,
  UpdatePasswordSchema,
} from './host.schema';
import { createHost, getAllHosts, getHostAndVerify, updateHost, updatePassword, dencryptionApiBanking, getHostByUserId } from './host.service';

export const hostGroup = (app: any) =>
  app
    .get('/', async ({ hostDb }: { hostDb: any }) => {
      return await getAllHosts(hostDb);
    } 
    )   
    .get('/:hostid', async ({ params, hostDb }: { params: any, hostDb: any })=> {
      const {hostid} = params;
      return await getHostByUserId(hostid, hostDb);
    }
  )
    .post(
      '/apibanking',
      async ({ body, hostDb }: { body: any; hostDb: any }) => {
        return await dencryptionApiBanking(body, hostDb);
      }
    )

    .put(
      '/:hostId',
      async ({ params, body, hostDb }: { params: any; body: any; hostDb: any }) => {
        const { hostId } = params;
        return await updateHost(hostId, body, hostDb);
      },
      //  {
      //   body: UpdateHostSchema, 
      // }
    )
      ;