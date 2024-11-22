import { notificationRepo } from './notification.repo.js';
import { NotificationObject } from './notification.schema.js';

export const notificationService = {
  async createNotification(data: NotificationObject, hostdb: any) {
    return await notificationRepo.createNotification(data, hostdb);
  },

  async getNotificationsByUserId(userid: string, hostdb: any) {
    return await notificationRepo.getNotificationsByUserId(userid, hostdb);
  },

  async updateNotification(id: string, data: NotificationObject, hostdb: any) {
    return await notificationRepo.updateNotification(id, data, hostdb);
  },

  async deleteNotification(id: string, hostdb: any) {
    return await notificationRepo.deleteNotification(id, hostdb);
  },
};
