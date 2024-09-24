import { Host } from '../../../prisma/clients/postgres/masterdb'

export type HostType = Pick<
  Host,
  | 'hostId'
  | 'hostCode'
  | 'username'
  | 'password'
  | 'hostName'
  | 'contractStartDate'
  | 'contractEndDate'
  | 'contractStartDate'
>
