import { HostDbClient } from "../../database/host.db"
import { OrderType } from "../order/order.schema"
import { OrderDetailObject } from "./orderDetail.schema"

const getOrderDetaiListByOrder= async (
  Order: OrderType,
  hostDb: HostDbClient,
) => {
  return await hostDb.orderDetail.findMany({
    where: {
      vendorId: Order.vendorId,
      eventId: Order.eventId,
      orderId: Order.orderId
    },
  })
}

const createOrderDetail = async (
  orderDetail: OrderDetailObject,
  hostDb: HostDbClient
) => {
  await hostDb.orderDetail.create({
    data: orderDetail,
  })
}
const updateOrderDetail = async (
  orderDetail: OrderDetailObject,
  hostDb: HostDbClient
) => {
  await hostDb.orderDetail.update({
    where: {
     eventId_vendorId_orderId : {
      eventId: orderDetail.eventId,
      vendorId: orderDetail.vendorId,
      orderId: orderDetail.orderId
     }
    },
    data: orderDetail,
  })
}
const deleteOrderDetail = async (
  orderDetail: OrderDetailObject,
  hostDb: HostDbClient
) => {
  await hostDb.orderDetail.delete({
    where: {
       eventId_vendorId_orderId : {
      eventId: orderDetail.eventId,
      vendorId: orderDetail.vendorId,
      orderId: orderDetail.orderId
     }
    },
  })
}
const orderDetailService  = { getOrderDetaiListByOrder, createOrderDetail, updateOrderDetail, deleteOrderDetail }
export default  orderDetailService  
