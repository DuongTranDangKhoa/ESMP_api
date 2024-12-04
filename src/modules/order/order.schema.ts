import { TransactionType } from './../transaction/transaction.schema';

import { t } from 'elysia'
import { GetEventDetailsParams } from '../event/event.schema'
import { GetVendorParams } from '../vendor/vendor.schema'
import { Order, OrderDetail, Payment} from '../../../prisma/clients/postgres/hostdb'

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
export class OrderObject {
    orderId?: string
    eventId: string
    vendorId: string
    name: string
    totalAmount?: number
    totalPrice: number
    constructor(
      data: any,
    ) {
      this.orderId = data.orderId
      this.eventId = data.eventId
      this.vendorId = data.vendorId  
      this.name = data.name
      this.totalAmount = data.totalAmount
      this.totalPrice = data.totalPrice
    }
}
export type OrderDetailsType = OrderDetail


export class OrderDetailObject {
    orderDetailId?: string;
    productitemId: string;
    orderId: string;
    quantity: number ;
    unitPrice: number;
    totalPrice: number;
  constructor(
   data: any
  ) {
   this.orderDetailId = data.orderDetailId
   this.productitemId = data.productitemId
   this.orderId = data.orderId
   this.quantity = data.quantity
   this.unitPrice = data.unitPrice
   this.totalPrice = data.totalPrice
  }
}
export class InputDetailObject{
  productitemId : string;
  quantity : number;
  unitPrice: number;
  constructor(data: any)
  {
    this.productitemId = data.productitemId 
    this.quantity = data.quantity
    this.unitPrice = data.unitPrice
  }
}
export type PaymentObj = Payment

export class CreateOrder {
    orderId?: string
    eventId: string
    vendorId: string
    name: string
    totalAmount?: number
    totalPrice: number
    details : InputDetailObject[]
    transactionType: string
    constructor(data: any)
    {
      this.orderId = data.orderId
      this.eventId = data.eventId
      this.vendorId = data.vendorId  
      this.name = data.name
      this.totalAmount = data.totalAmount
      this.totalPrice = data.totalPrice
      this.details = data.detail
      this.transactionType = data.transactionType
    }
}
export const OrderSchema = t.Object({
  eventId: t.String({
    format: 'uuid', 
    error: 'Event ID is invalid',
  }),
  vendorId: t.String({
    format: 'uuid', 
    error: 'Vendor ID is invalid',
  }),
  name: t.String(),
  totalAmount: t.Number(),
  totalPrice: t.Number(),
  details: t.Array(
    t.Object({
      productitemId: t.String(),
      quantity: t.Number(),
      unitPrice: t.Number(),
    })
  ),
  transactionType: t.String(),
});
export const CreateOrderSchema = t.Object({
  eventId: t.String({
    format: 'uuid',
    error: 'Event ID must be a valid UUID',
  }),
  vendorId: t.String({
    format: 'uuid',
    error: 'Vendor ID must be a valid UUID',
  }),
  name: t.String(),
  totalAmount: t.Number(),
  totalPrice: t.Number(),
  details: t.Array(
    t.Object({
      productitemId: t.String({
        format: 'uuid',
        error: 'Product Item ID must be a valid UUID',
      }),
      quantity: t.Number(),
      unitPrice: t.Number(),
    })
  ),
  transactionType: t.String(),
});