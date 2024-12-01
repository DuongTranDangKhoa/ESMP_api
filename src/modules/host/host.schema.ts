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

export type HostType = Pick<host, 'hostid' | 'expiretime' | 'eventstoragetime' | 'bankingaccount'> & {
  phone: string | null;
  email: string | null;
  name: string | null;
};


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
  bankingaccount:  t.String(),
  apibanking:  t.String(),
};

export const UpdatePasswordSchema =t.Object( {
  newPassword: t.String(),
});
