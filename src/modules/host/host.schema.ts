import { host } from "../../../prisma/clients";


export type HostType = Pick<
  host,
  | 'hostid'
  | 'expiretime'
  | 'phone'
  | 'email'
  | 'eventstoragetime'
>
