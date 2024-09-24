import { t } from "elysia"
import { Transaction } from "../../../prisma/clients/postgres/hostdb"

export type TransactionType = Transaction
export class TransactionObject {
   transactionId?: string
    orderId: string
    eventId: string
    transactionType?: string
    paymentTime?: Date
    price?:  number
    status?: string 
    constructor(data: any) {
    this.transactionId = data.transactionId
    this.transactionType = data.transactionType
    this.paymentTime = data.paymentTime
    this.price = data.price
    this.status = data.status
    this.eventId = data.eventId
    this.orderId = data.orderId
    }
}
export const GetTransactionParam =t.Required(
    t.Object(
    {
      // vendorId: t.String({ format: 'uuid', error: 'Invalid Vendor ID' }),
      transactionId: t.String({ format: 'uuid', error: 'Invalid Product ID' }),
      orderId: t.String({ format: 'uuid', error: 'Invalid Order ID' }),
      eventId: t.String({ format: 'uuid', error: 'Invalid Event ID' }),
    },
    {
      error: 'ID not provived',
    },
  ),
)