import status from 'statuses'
import { HostDbClient } from '../../database/host.db'
import eventService from '../event/event.service'
import { GetVendorParams } from '../vendor/vendor.schema'
import vendorService from '../vendor/vendor.service'
import * as orderSchema from './order.schema'
import orderService from './order.service'

export const orderGroup = (app: any) =>
  app
    /**
     * GET api/order/:vendorId
     * Create Vendor's orders
     * @response vendor's orders
     */
    .get(
      '/order/vendor/:vendorId',
      async ({
        params,
        set,
        hostDb,
      }: {
        params: any
        set: any
        hostDb: HostDbClient
      }) => {
        const vendorId = params.vendorId
        await vendorService.getVendorById(vendorId, hostDb)
        const orderListOfVendor = await orderService.getOrderListOfVendor(
          vendorId,
          hostDb,
        )
        set.status = status('OK')
        return orderListOfVendor
      },
      {
        params: GetVendorParams,
      },
    )
    /**
     * GET api/order/:eventId
     * Create Event's orders
     * @response event's orders
     */
    .get(
      '/order/event/:eventId',
      async ({
        params,
        set,
        hostDb,
      }: {
        params: any
        set: any
        hostDb: HostDbClient
      }) => {
        const eventId = params.eventId
        await eventService.getEventById(eventId, hostDb)
        const orderListOfVendor = await orderService.getOrderListOfEvent(
          eventId,
          hostDb,
        )
        set.status = status('OK')
        return orderListOfVendor
      },
      {
        params: GetVendorParams,
      },
    )
    .guard(
      {
        params: orderSchema.OrderOuterPathParams,
      },
      (app: any) =>
        //guard for checking product exist or not
        app
          /**
           * POST api/order/:eventId/:vendorId
           * Create Order
           * @response product's details
           */
          .resolve(
            async ({
              params,
              hostDb,
            }: {
              params: any
              hostDb: HostDbClient
            }) => {
              const { eventId, vendorId } = params
              await eventService.getEventById(eventId, hostDb)
              await vendorService.getVendorById(vendorId, hostDb)
              return { eventId, vendorId }
            },
          )
          .post(
            '/',
            async ({
              eventId,
              vendorId,
              body,
              set,
              hostDb,
            }: {
              eventId: string
              vendorId: string
              body: any
              set: any
              hostDb: HostDbClient
            }) => {
              const orderData = body
              await orderService.createOrder(
                eventId,
                vendorId,
                orderData,
                hostDb,
              )
              set.status = status('Created')
              return {
                message: 'Create order success',
              }
            },
          )
          /**
           * GET api/order/:eventId/:vendorId/:orderId
           * Get Order's details
           * @response order's details
           */
          .get(
            '/:orderId',
            async ({
              eventId,
              vendorId,
              params,
              set,
              hostDb,
            }: {
              eventId: string
              vendorId: string
              params: any
              set: any
              hostDb: HostDbClient
            }) => {
              const orderId = params.orderId
              const orderDetails = await orderService.getOrderDetails(
                eventId,
                vendorId,
                orderId,
                hostDb,
              )
              set.status = status('OK')
              return orderDetails
            },
            {
              params: orderSchema.GetOrderParams,
            },
          ),
    )
