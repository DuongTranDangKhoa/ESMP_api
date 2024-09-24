import { NotFoundError } from 'elysia'
import { HostDbClient } from '../../database/host.db'
import { OrderDetailObject, OrderObject } from './order.schema'

const getOrderListOfVendor = async (vendorId: string, hostDb: HostDbClient) => {
  const orderListOfVendor = await hostDb.order.findMany({
    where: {
      vendorId,
    },
  })
  return orderListOfVendor
}

const getOrderListOfEvent = async (eventId: string, hostDb: HostDbClient) => {
  const orderListOfVendor = await hostDb.order.findMany({
    where: {
      eventId,
    },
  })
  return orderListOfVendor
}

const createOrder = async (
  eventId: string,
  vendorId: string,
  orderData: any,
  hostDB: HostDbClient,
) => {
  const total = orderData.reduce(
    (total: number, orderItem: any) => (total += orderItem.price),
  )

  await hostDB.$transaction(async (hostDB) => {
    const order = await hostDB.order.create({
      data: {
        eventId,
        vendorId,
        total,
        createBy: vendorId,
        updatedBy: vendorId,
      },
    })

    const orderItems = orderData.map(
      (orderItem: any, index: any) =>
        new OrderDetailObject(
          eventId,
          vendorId,
          order.orderId,
          Number(index + 1),
          orderItem,
        ),
    )

    await Promise.all(
      orderItems.map(async (orderItem: OrderDetailObject) => {
        await hostDB.orderDetail.create({ data: orderItem })
      }),
    )
  })
}

const getOrderDetails = async (
  eventId: string,
  vendorId: string,
  orderId: string,
  hostDb: HostDbClient,
) => {
  const order = hostDb.order.findUnique({
    where: {
      orderId_eventId_vendorId: {
        eventId,
        vendorId,
        orderId,
      },
    },
  })
  if (!order) {
    throw new NotFoundError('Order not exists')
  }

  const orderDetails = hostDb.orderDetail.findMany({
    where: {
      eventId,
      vendorId,
      orderId,
    },
  })

  return {
    order,
    orderDetails,
  }
}

const orderService = {
  getOrderListOfVendor,
  getOrderListOfEvent,
  createOrder,
  getOrderDetails,
}

export default orderService
