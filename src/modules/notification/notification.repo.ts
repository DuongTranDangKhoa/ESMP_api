import { HostDbClient } from '../../database/dbClient.db';

export const notificationRepo = {
  async createNotification(data: any, hostdb: HostDbClient) {
    return await hostdb.notification.create({
      data,
    });
  },

  async getNotificationsByUserId(userid: string, hostdb: HostDbClient) {
    return await hostdb.notification.findMany({
      where: { userid },
    });
  },

  async updateNotification(id: string, data: any, hostdb: HostDbClient) {
     await hostdb.notification.update({
      where: { id },
      data,
    });
    await hostdb.$disconnect();
    return { message: 'Notification updated' };
  },

  async deleteNotification(id: string, hostdb: HostDbClient) {
    return await hostdb.notification.delete({
      where: { id },
    });
  },
};
