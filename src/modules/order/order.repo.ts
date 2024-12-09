// src/modules/order/order.repo.ts

import { HostDbClient } from '../../database/dbClient.db';
import { Order, OrderDetail, ProductInProductItem, Product } from '../../../prisma/clients/postgres/hostdb';

export const orderRepo = {
  // Get order list of a specific vendor
  getOrderListOfVendor: async (vendorId: string, hostDb: HostDbClient) => {
    return await hostDb.order.findMany({
      where: { vendorId },
    });
  },

  // Get order list of a specific event and vendor
  getOrderListOfEvent: async (eventId: string, vendorId: string, hostDb: HostDbClient) => {
    return await hostDb.order.findMany({
      where: { eventId, vendorId },
    });
  },

  // Create a new order
  createOrder: async (orderData: any, hostDb: HostDbClient) => {
    return await hostDb.order.create({
      data: orderData,
    });
  },

  // Create many order details at once
  createOrderDetails: async (orderDetailsData: any, hostDb: HostDbClient) => {
    return await hostDb.orderDetail.createMany({
      data: orderDetailsData,
    });
  },

  // Get order details by order ID
  getOrderDetailsByOrderId: async (orderId: string, hostDb: HostDbClient) => {
    return await hostDb.orderDetail.findMany({
      where: { orderId },
    });
  },
  updateOrder: async (orderId: string , orderData: any,  hostDb: HostDbClient) => {
    return await hostDb.order.update({
      where: { orderId: orderId },
      data: {
        status: orderData.status,
      },
    });
  }

};
