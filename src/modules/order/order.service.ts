// src/modules/order/order.service.ts

import { NotFoundError } from 'elysia';
import { HostDbClient } from '../../database/dbClient.db';
import { CreateOrder, OrderDetailObject, OrderObject } from './order.schema';
import { orderRepo } from './order.repo';
import { productItemRepo } from '../productitem/productitem.repo';

const getOrderListOfVendor = async (vendorId: string, hostDb: HostDbClient) => {
  console.log('Getting order list for vendor:', vendorId);
  const orderListOfVendor = await orderRepo.getOrderListOfVendor(vendorId, hostDb);
  return orderListOfVendor;
};

const getOrderListOfEvent = async (eventId: string, vendorId: string, hostDb: HostDbClient) => {
  console.log('Getting order list for event:', eventId, 'and vendor:', vendorId);
  const orderListOfEvent = await orderRepo.getOrderListOfEvent(eventId, vendorId, hostDb);
  return orderListOfEvent;
};

const createOrder = async (inputOrderDetail: CreateOrder, hostDB: HostDbClient) => {
  const orderData = {
    eventId: inputOrderDetail.eventId,
    vendorId: inputOrderDetail.vendorId,
    name: inputOrderDetail.name,
    totalAmount: inputOrderDetail.totalAmount,
    totalPrice: inputOrderDetail.totalPrice,
    status: "Prepared",
  };

  const order = await orderRepo.createOrder(orderData, hostDB);

  if (!order) {
    throw new NotFoundError('Order not created');
  }

  const orderDetailsData = inputOrderDetail.details.map(detail => ({
    productitemId: detail.productitemId,
    orderId: order.orderId,
    quantity: detail.quantity,
    unitPrice: detail.unitPrice,
    totalPrice: detail.quantity * detail.unitPrice,
  }));

  const orderDetail = await orderRepo.createOrderDetails(orderDetailsData, hostDB);

  if (!orderDetail) {
    throw new Error('Failed to create order details');
  } else {

    for (const detail of orderDetailsData) {
      const productInProductItem = await productItemRepo.getProductInProductItem(detail.productitemId, hostDB);

      for (const item of productInProductItem) {
          if (!item.quantity) {
      throw new Error('quantity not exists');
    }
        const product = await productItemRepo.getProductById(item.productId, hostDB);

        if (!product || product.quantity === null || product.quantity === undefined) {
          throw new Error('Product or quantity not found');
        }

        const count = detail.quantity * item.quantity;

        if (product.quantity === 0 || product.quantity - count < 0) {
          return 'Not enough product in stock';
        }

        // Update product stock and count
        await productItemRepo.updateProductQuantityAndCount(item.productId, count, hostDB);
      }
    }
  }

  return {
    order,
    orderDetails: orderDetail,
  };
};

const getOrderDetails = async (orderId: string, hostDb: HostDbClient) => {
  console.log('Getting order details for orderId:', orderId);
  const orderDetails = await orderRepo.getOrderDetailsByOrderId(orderId, hostDb);
  return orderDetails;
};
const updateOrder = async (orderId: string, orderData: any, hostDb: HostDbClient) => {
const order = await orderRepo.updateOrder(orderId, orderData, hostDb);
if(order){
  return {
    message: 'Order updated successfully',
  };
}
else{
  throw new Error('Failed to update order');
}
}
const orderService = {
  getOrderListOfVendor,
  getOrderListOfEvent,
  createOrder,
  updateOrder,
  getOrderDetails,
};

export default orderService;
