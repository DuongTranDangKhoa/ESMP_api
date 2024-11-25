// import { host } from "../../../prisma/clients";


// export type HostType = Pick<
//   host,
//   | 'hostid'
//   | 'expiretime'
//   | 'phone'
//   | 'email'
//   | 'eventstoragetime'
// >
import { t } from 'elysia';
import { host } from '../../../prisma/clients';

export type HostType = Pick<host, 'hostid' | 'expiretime' | 'phone' | 'email' | 'eventstoragetime' | 'bankingaccount'>;

export const CreateHostSchema = t.Object({
  username: t.String(), // Bắt buộc
  password: t.String(), // Bắt buộc
  name: t.String(),     // Bắt buộc
  phone: t.Optional(t.String()), // Tùy chọn
  email: t.String(),    // Bắt buộc
  expiretime: t.Optional(t.String({ format: 'date-time' })), // Tùy chọn, kiểu ISO 8601
});

export const UpdateHostSchema = {
  phone:  t.String(),
  email:  t.String(),
  expiretime: t.Optional(t.String({ format: 'date-time' })),
  eventstoragetime: t.Optional(t.String({ format: 'date-time' })),
};

export const UpdatePasswordSchema = {
  newPassword: 'string',
};
