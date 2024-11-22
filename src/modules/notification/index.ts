import { HostDbClient } from '../../database/dbClient.db';
import { NotificationSchema, CreateNotificationInput } from './notification.schema';
import { notificationService } from './notification.service';

export const notificationGroup = (app: any) =>
  app
    .get('/:userid', async ({ params, hostDb }: { params: any; hostDb: HostDbClient }) => {
      const { userid } = params;
      return await notificationService.getNotificationsByUserId(userid, hostDb);
    })
    .post(
      '/',
      async ({ body, hostDb }: { body: any; hostDb: HostDbClient }) => {
        const userNoti = await notificationService.createNotification(body, hostDb);
        return {
            message: 'Notification created successfully',
            userid: userNoti.userid
        } 
      },
      {
        body: CreateNotificationInput,
      }
    )


    .group('/:notificationId', (app: any) =>
      app
        .resolve(
          async ({
            params,
            hostDb,
          }: {
            params: any;
            hostDb: HostDbClient;
          }) => {
            const { notificationId } = params;
            return { notificationId };
          }
        )
        .put(
          '/',
          async ({
            notificationId,
            body,
            hostDb,
          }: {
            notificationId: string;
            body: any;
            hostDb: HostDbClient;
          }) => {
            return await notificationService.updateNotification(notificationId, body, hostDb);
          },
          {
            body: NotificationSchema,
          }
        )


        .delete(
          '/',
          async ({ notificationId, hostDb }: { notificationId: string; hostDb: HostDbClient }) => {
            return await notificationService.deleteNotification(notificationId, hostDb);
          }
        )
    );
