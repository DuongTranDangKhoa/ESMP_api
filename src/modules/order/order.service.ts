import { Order } from './../../../prisma/clients/postgres/hostdb/index.d';

import { NotFoundError } from 'elysia'
import { HostDbClient } from '../../database/host.db'
import { CreateOrder, OrderDetailObject, OrderObject } from './order.schema'

const getOrderListOfVendor = async (vendorId: string, hostDb: HostDbClient) => {
  console.log('orderListOfVendor', vendorId)
  const orderListOfVendor = await hostDb.order.findMany({
    where: {
      vendorId,
    },
  })
  await hostDb.$disconnect();
  return orderListOfVendor
}

const getOrderListOfEvent = async (eventId: string,vendorId: string, hostDb: HostDbClient) => {
  const orderListOfVendor = await hostDb.order.findMany({
    where: {
      eventId,
      vendorId
    },
  })
   await hostDb.$disconnect();
  return orderListOfVendor
}

// const createOrder = async (
//   eventId: string,
//   vendorId: string,
//   orderData: any,
//   hostDB: HostDbClient,
// ) => {
//   const total = orderData.reduce(
//     (total: number, orderItem: any) => (total += orderItem.price),
//   )

//   await hostDB.$transaction(async (hostDB) => {
//     const order = await hostDB.order.create({
//       data: {
//         eventId,
//         vendorId,
//         total,
//         createBy: vendorId,
//         updatedBy: vendorId,
//       },
//     })

//     const orderItems = orderData.map(
//       (orderItem: any, index: any) =>
//         new OrderDetailObject(
//           eventId,
//           vendorId,
//           order.orderId,
//           Number(index + 1),
//           orderItem,
//         ),
//     )

//     await Promise.all(
//       orderItems.map(async (orderItem: OrderDetailObject) => {
//         await hostDB.orderDetail.create({ data: orderItem })
//       }),
//     )
//   })
// }
const createOrder = async (
  inputOrderDetail: CreateOrder,
  hostDB: HostDbClient,
) => {

  const order = await hostDB.order.create({
    data: {
      eventId: inputOrderDetail.eventId,
      vendorId: inputOrderDetail.vendorId,
      name: inputOrderDetail.name,
      totalAmount: inputOrderDetail.totalAmount,
      totalPrice: inputOrderDetail.totalPrice,
      status: "Prepared"
    }
  });


  if (!order) {
    throw new NotFoundError('Order not exists');
  }


  const orderDetailsData = inputOrderDetail.details.map(detail => ({
    productitemId: detail.productitemId,
    orderId: order.orderId,  
    quantity: detail.quantity,
    unitPrice: detail.unitPrice,
    totalPrice: detail.quantity * detail.unitPrice
  }));
  
  const orderDetail = await hostDB.orderDetail.createMany({
    data: orderDetailsData
  });


  if (!orderDetail) {
    throw new Error('Failed to create order details');
  }else{
    for (const detail of orderDetailsData) {
  const productInProductItem = await hostDB.productInProductItem.findMany({
    where: { productItemId: detail.productitemId },
  });

  for (const item of productInProductItem) {
    if (!item.quantity) {
      throw new Error('quantity not exists');
    }

    const count = detail.quantity * item.quantity;
    
    const product = await hostDB.product.findUnique({
      where: { productId: item.productId },
    });

    if (!product || product.quantity === null || product.quantity === undefined) {
      throw new Error('Product or quantity not found');
    }

    if (product.quantity === 0 || product.quantity - count < 0) {
      return 'Not enough product in stock';
    }

    // console.log('product', count, product.quantity, product.count);

      await hostDB.product.update({
      where: { productId: item.productId },
      data: {
        quantity: (product.quantity - count),
        count: ((product.count || 0) + count), 
      },
    });
    
  }
}
  }
    await hostDB.$disconnect();

  return {
    order,
    orderDetails: orderDetail
  };
}

const getOrderDetails = async (
  orderId: string,
  hostDb: HostDbClient,
) => {
  console.log('orderDetails', orderId)
  const orderDetails = hostDb.orderDetail.findMany({
    where: {
      orderId
    },
  })
   await hostDb.$disconnect();
  return orderDetails
  
}

const orderService = {
  getOrderListOfVendor,
  getOrderListOfEvent,
  createOrder,
  getOrderDetails,
}

export default orderService
