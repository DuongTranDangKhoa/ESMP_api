import status from 'statuses'
import { HostDbClient } from '../../database/host.db'
import vendorService from './vendor.service'
import * as commonSchema from '../../common/schema.common'
import * as vendorSchema from './vendor.schema'
import * as eventSchema from '../event/event.schema'

export const vendorGroup = (app: any) =>
  app
    /**
     * GET api/vendor
     * Get vendor list
     * @response vendor list
     */
    .get('/', async ({ hostDb }: any) => {
      const response = vendorService.getVendorList(hostDb)
      return response
    })
    .post('/', async ({ body, hostDb }: any) => {
     
    })
    // group that require vendorId
    .group('/:vendorId', (app: any) =>
      app.guard(
        {
          params: vendorSchema.GetVendorParams,
        },
        (app: any) =>
          app
            //guard for checking event exist or not
            .resolve(
              async ({
                params,
                hostDb,
              }: {
                params: any
                hostDb: HostDbClient
              }) => {
                const vendorId = params.vendorId
                const vendor = await vendorService.getVendorById(
                  vendorId,
                  hostDb,
                )
                return { vendor, vendorId }
              },
            )
            /**
             * GET api/vendor/:vendorId
             * Get vendor details
             * @response vendor details
             */
            .get('/', async ({ vendor }: any) => {
              return vendor
            })
            /**
             * PUT api/vendor/:vendorId
             * Update vendor
             * @response update event status
             */
            .put(
              '/',
              async ({
                vendorId,
                body,
                set,
                hostDb,
              }: {
                vendorId: string
                body: any
                set: any
                hostDb: HostDbClient
              }) => {
                const updateData = new vendorSchema.VendorObject(body)
                await vendorService.updateVendor(vendorId, updateData, hostDb)
                set.status = status('OK')
                return {
                  message: 'Update vendor success',
                }
              },
              {
                body: vendorSchema.VendorObject,
                response: {
                  200: commonSchema.CommonSuccessResponse,
                },
              },
            )
            /**
             * DELETE api/vendor/:vendorId
             * Delete vendor
             * @response Delete vendor status
             */
            .delete(
              '/',
              async ({
                vendorId,
                set,
                hostDb,
              }: {
                vendorId: string
                set: any
                hostDb: HostDbClient
              }) => {
                await vendorService.deleteVendor(vendorId, hostDb)
                set.status = status('OK')
                return {
                  message: 'Delete vendor success',
                }
              },
            )
            /**
             * GET api/vendor/:vendorId/event
             * get Vendor's registered event list
             * @response vendor's registered event list
             */
            .get(
              '/event',
              async ({
                vendorId,
                hostDb,
              }: {
                vendorId: string
                hostDb: HostDbClient
              }) => {
                const eventVendorList = vendorService.getVendorRegisteredEvents(
                  vendorId,
                  hostDb,
                )
                return eventVendorList
              },
            )
            /**
             * PUT api/vendor/vendorId/:eventId
             * Save Event's vendor list
             * @response save event vendor list status
             */
            .put(
              '/:eventId',
              async ({
                vendorId,
                body,
                set,
                hostDb,
              }: {
                vendorId: string
                body: any
                set: any
                hostDb: HostDbClient
              }) => {
                const eventId = body.eventId
                // await vendorService.registerEvent(vendorId, eventId, hostDb)
                set.status = status('OK')
                return {
                  message: 'Register to an event success',
                }
              },
            )
            ,
      ),
    )
