import status from 'statuses'
import { HostDbClient } from '../../database/host.db'
import eventService from '../event/event.service'
import { GetVendorParams } from '../vendor/vendor.schema'
import vendorService from '../vendor/vendor.service'
import * as orderSchema from './order.schema'
import orderService from './order.service'
import { GetOrderParams } from './order.schema'

export const orderGroup = (app: any) =>
  app
    .get(
      '/vendor/:vendorId',
      async ({
        params,
        hostDb,
      }: {
        params: any;
        hostDb: HostDbClient;
      }) => {
        const vendorId = params.vendorId;
        await vendorService.getVendorById(vendorId, hostDb);
        const orderListOfVendor = await orderService.getOrderListOfVendor(
          vendorId,
          hostDb,
        );
        return orderListOfVendor;
      },
    )
    .get(
      '/event/:eventId/:vendorId',
      async ({
        params,
        set,
        hostDb,
      }: {
        params: any;
        set: any;
        hostDb: HostDbClient;
      }) => {
        const eventId = params.eventId;
        const vendorId = params.vendorId;
        await eventService.getEventById(eventId, hostDb);
        const orderListOfEvent = await orderService.getOrderListOfEvent(
          eventId,
          vendorId,
          hostDb,
        );
        set.status = status('OK');
        return orderListOfEvent;
      },
    )
    .post(
      '/',
      async ({
        body,
        set,
        hostDb,
      }: {
        body: any;
        set: any;
        hostDb: HostDbClient;
      }) => {
        await orderService.createOrder(body, hostDb);
        set.status = status('Created');
        return {
          message: 'Create order success',
        };
      },
    )
    .get(
      '/orderDetail/:orderId',
      async ({
        params,
        hostDb,
      }: {
        params: any;
        hostDb: HostDbClient;
      }) => {
        const { orderId } = params;
        const orderDetails = await orderService.getOrderDetails(
          orderId,
          hostDb
        );
        return orderDetails;
      },
    );
