import { now } from 'moment';
import { transaction } from './../../../prisma/clients/index.d';
export type transactionType = transaction
export class transactionObject {
  transactionId?: string
  hostId: string
  packageid: string
  createdAt?: Date
  status?: string
  constructor(data: any) {
    this.transactionId = data.transactionId
    this.hostId = data.hostId
    this.packageid = data.packageid
    this.createdAt = new Date(now())
    this.status = data.status
  }
}