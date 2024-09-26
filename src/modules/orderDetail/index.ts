import status from 'statuses'
import { HostDbClient } from '../../database/host.db'
import orderDetailService from './orderDetail.service'
import { OrderDetailObject, OrderDetailSchema } from './orderDetail.schema'
import * as orderSchema from '../order/order.schema'

export const orderDetailGroup = (app: any) =>
  app
    /**
     * GET /order/detail/:vendorId/:eventId
     * Get details of orders for a specific vendor and event
     * @response order details
     */
    .get(
      '/order/detail/:vendorId/:eventId',
      async ({
        params,
        set,
        hostDb,
      }: {
        params: any
        set: any
        hostDb: HostDbClient
      }) => {
        const { vendorId, eventId } = params
        const orderDetails = await orderDetailService.getOrderDetaiListByOrder(
           params , // Adjust according to your logic
          hostDb
        )
        set.status = status('OK')
        return orderDetails
      },
      {
        params: orderSchema.OrderOuterPathParams, // Validation schema for the params
      },
    )
    /**
     * Guard middleware for validating order details existence
     * Verifies if the event and vendor exist before processing the request
     */
    .guard(
      {
        params: orderSchema.OrderOuterPathParams, // Validation schema
      },
      (app: any) =>
        app
          .resolve(
            async ({
              params,
              hostDb,
            }: {
              params: any
              hostDb: HostDbClient
            }) => {
              const { eventId, vendorId } = params
              // Perform validations (if the event and vendor exist)
              await orderDetailService.getOrderDetaiListByOrder(
                 params,
                hostDb,
              )
              return { eventId, vendorId }
            },
          )
          /**
           * POST /order/detail/:vendorId/:eventId
           * Create a new order detail
           * @response created order detail
           */
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
              const orderDetailData = body
              const orderDetail = new OrderDetailObject({
                ...orderDetailData,
                eventId,
                vendorId,
              })
              await orderDetailService.createOrderDetail(orderDetail, hostDb)
              set.status = status('Created')
              return {
                message: 'Order detail created successfully',
              }
            },
            {
              body: OrderDetailObject, // Validation schema for the request body
            },
          )
          /**
           * PUT /order/detail/:vendorId/:eventId/:orderId
           * Update an existing order detail
           * @response updated order detail
           */
          .put(
            '/:orderId',
            async ({
              eventId,
              vendorId,
              params,
              body,
              set,
              hostDb,
            }: {
              eventId: string
              vendorId: string
              params: any
              body: any
              set: any
              hostDb: HostDbClient
            }) => {
              const { orderId } = params
              const orderDetail = new OrderDetailObject({
                ...body,
                eventId,
                vendorId,
                orderId,
              })
              await orderDetailService.updateOrderDetail(orderDetail, hostDb)
              set.status = status('OK')
              return {
                message: 'Order detail updated successfully',
              }
            },
            {
              body: OrderDetailObject, // Validation schema for the request body
            },
          )
          /**
           * DELETE /order/detail/:vendorId/:eventId/:orderId
           * Delete an order detail
           * @response deletion success message
           */
          .delete(
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
              const { orderId } = params
              const orderDetail = new OrderDetailObject({
                eventId,
                vendorId,
                orderId,
              })
              await orderDetailService.deleteOrderDetail(orderDetail, hostDb)
              set.status = status('No Content')
              return {
                message: 'Order detail deleted successfully',
              }
            },
          ),
    )
