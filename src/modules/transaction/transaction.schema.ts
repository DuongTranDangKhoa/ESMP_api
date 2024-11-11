import { t } from "elysia"
import { Payment } from "../../../prisma/clients/postgres/hostdb"

export type TransactionType = Payment
export class TransactionObject {
    paymentId?: string
    orderId: string
    transactionType?: string
    paymentTime?: Date
    price?:  number
    status?: string 
    constructor(data: any) {
    this.paymentId = data.paymentId
    this.transactionType = data.transactionType
    this.paymentTime = new Date(data.paymentTime)
    this.price = data.price
    this.status = data.status
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