import { t } from 'elysia';
import { Account } from '../../../prisma/clients/postgres/hostdb';
import { notification } from '../../../prisma/clients';

export type NotificationType = notification

export class NotificationObject {
  id?: string;
  userid: string;
  source?: string;

  constructor(data: any) {
    this.id = data.id;
    this.userid = data.userid;
    this.source = data.source;
  }
}

export type AccountType = Account;

export const NotificationSchema = t.Object({
   id: t.String({
    format: 'uuid',
    error: 'User ID is invalid',
  }),
  source: t.Optional(t.String()),
  status: t.Optional(t.Boolean()),
});

export const CreateNotificationInput = t.Object({
  userid: t.String({
    format: 'uuid',
    error: 'User ID is invalid',
  }),
  source: t.Optional(t.String()),
});

export const GetNotificationsByUserParams = t.Object({
  userid: t.String({
    format: 'uuid',
    error: 'User ID is invalid',
  }),
});
