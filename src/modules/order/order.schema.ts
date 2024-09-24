import { t } from 'elysia'
import { GetEventDetailsParams } from '../event/event.schema'
import { GetVendorParams } from '../vendor/vendor.schema'
import { Order, OrderDetail } from '../../../prisma/clients/postgres/hostdb'

export const OrderOuterPathParams = t.Composite([
  GetEventDetailsParams,
  GetVendorParams,
])

export const GetOrderParams = t.Composite([
  OrderOuterPathParams,
  t.Object(
    {
      orderId: t.String({
        format: 'uuid',
        error: 'Order ID is invalid',
      }),
    },
    {
      error: 'Order ID not provided',
    },
  ),
])

export type OrderType = Order
export type OrderDetailsType = OrderDetail

export class OrderObject {}
export class OrderDetailObject {
  eventId: string
  vendorId: string
  orderId: string
  rowNo: number
  amount: number
  itemName: string
  itemPrice: number
  totalPrice: number
  createBy: string
  updatedBy: string

  constructor(
    eventId: string,
    vendorId: string,
    orderId: string,
    rowNo: number,
    orderItem: any,
  ) {
    this.eventId = eventId
    this.vendorId = vendorId
    this.orderId = orderId
    this.rowNo = rowNo
    this.amount = orderItem.amount
    this.itemName = orderItem.itemName
    this.itemPrice = orderItem.itemPrice
    this.totalPrice = orderItem.itemPrice * orderItem.amount
    this.createBy = vendorId
    this.updatedBy = vendorId
  }
}
