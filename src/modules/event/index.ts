import * as eventSchema from './event.schema'
import * as commonSchema from '../../common/schema.common'
import eventService from './event.service'
import status from 'statuses'
import { HostDbClient } from '../../database/dbClient.db'
import { UpdateEventResponseSchema } from './event.schema'

export const eventGroup = (app: any) =>
  app
    /**
     * GET api/event
     * Get event list
     * @response event list
     */
    .get(
      '/host/:hostId',
      async ({params,  hostDb }: { params: any ,hostDb: HostDbClient }) => {
        const { hostId }= params
        const response = await eventService.getAllEvent(hostId, hostDb)
        return response
      },
      {
        // T.B.D
        // response: {
        //    200: T.B.D
        //}
      },
    )
    /**
     * POST api/event
     * Create event
     * @response creation status
     */
    .post(
      '/',
      async ({
        body,
        set,
        hostDb,
      }: {
        body: any,
        set: any,
        hostDb: HostDbClient
      }) => {
        // const event = new eventSchema.EventObject(body)
       const event = await eventService.createEvent(body, hostDb)
        set.status = status('Created')
        return {
          message: 'Create event success',
          id: event.eventId
        }
      },
      {
        body: eventSchema.InputEventSchema,
        response: {
          201: commonSchema.CommonSuccessResponse,
        },
      },
    )
    // group that require eventId
    .group('/:eventId', (app: any) =>
      app.guard(
        {
          params: eventSchema.GetEventDetailsParams,
        },
        (app: any) =>
          app
            //guard for checking event exist or not
            .resolve(
              async ({
                params,
                hostDb,
              }: {
                eventId: string
                params: any
                hostDb: HostDbClient
              }) => {
                const eventId = params.eventId
                const event = await eventService.getEventById(eventId, hostDb)
                return { event, eventId }
              },
            )
            /**
             * GET api/event/:eventId
             * Get event details
             * @response event details
             */
            .get('/', async ({ event }: any) => {
              return event
            })
            /**
             * PUT api/event/:eventId
             * Update event
             * @response update event status
             */
            .put(
  '/',
  async ({
    eventId,
    body,
    set,
    hostDb,
  }: {
    eventId: string
    body: any
    set: any
    hostDb: HostDbClient
  }) => {
    const updateData = new eventSchema.EventObject(body);
    const response = await eventService.updateEvent(eventId, updateData, hostDb);
    set.status = status('OK');
    return response; 
  },
  {
    body: eventSchema.InputEventSchema,
    response: {
      200: UpdateEventResponseSchema, 
    },
  },
)
            /**
             * DELETE api/event/:eventId
             * Delete event
             * @response Delete event status
             */
            .delete(
              '/',
              async ({
                eventId,
                set,
                hostDb,
              }: {
                eventId: string
                set: any
                hostDb: HostDbClient
              }) => {
                await eventService.deleteEvent(eventId, hostDb)
                set.status = status('OK')
                return {
                  message: 'Delete event success',
                }
              },
            )
            /**
             * GET api/event/:eventId/vendor
             * get Event's vendor list
             * @response event's vendor list
             */
            .get(
              '/vendor',
              async ({
                eventId,
                hostDb,
              }: {
                eventId: string
                hostDb: HostDbClient
              }) => {
                const eventVendorList = eventService.getEventVendorList(
                  eventId,
                  hostDb,
                )
                return eventVendorList
              },
            )
            /**
             * PUT api/event/:eventId/vendor
             * Save Event's vendor list
             * @response save event vendor list status
             */
            .put(
              '/vendor',
              async ({
                eventId,
                body,
                hostDb,
              }: {
                eventId: string
                body: any
                hostDb: HostDbClient
              }) => {
                const eventVendorList = eventService.updateEvent(
                  eventId,
                  body,
                  hostDb,
                )
                return eventVendorList
              },
            ),
      ),
    )
