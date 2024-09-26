import { OrderDetail } from "../../../prisma/clients/postgres/hostdb"

export type OrderDetailSchema = OrderDetail 
export class OrderDetailObject {
     orderDetail: string
      eventId: string
      vendorId: string
      orderId: string
      quantity: number | null
      unitPrice: number
      totalPrice: number

  constructor(
    data: any
  ) {
    this.orderDetail = data.orderDetail
    this.eventId = data.eventId
    this.vendorId = data.vendorId
    this.orderId = data.orderId
    this.quantity = data.rowNo
    this.unitPrice = data.unitPrice
    this.totalPrice = data.totalPrice
  }
}