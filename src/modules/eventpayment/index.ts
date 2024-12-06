import { HostDbClient } from '../../database/dbClient.db';
import { GetEventPaymentInEventParams } from '../vendorinevent/vendorinevent.schema';
import eventpaymentService from './eventpayment.service';
import { EventPaymentSchema, EventPaymentType, UpdateEventPayment } from './eventpayment.shema';
export const eventPaymentGroup = (app: any) =>
    app.get('/:eventId', async ({params, hostDb }: { params: any, hostDb: HostDbClient }) => {
        const eventId = params.eventId
        const payment = await eventpaymentService.getEventPaymentInEvent(eventId, hostDb)
                return payment
            })
        .get('/location/:locationId', async ({params, hostDb }: { params: any, hostDb: HostDbClient }) => {
        const locationId = params.locationId
        return await eventpaymentService.getEventPaymentInLocation(locationId, hostDb)
        })
        .get('/vendor/:vendorId', async ({params, hostDb }: { params: any, hostDb: HostDbClient }) => {
        const vendorId = params.vendorId
        const payment = await eventpaymentService.getEventPaymentInVendor(vendorId, hostDb)
        return payment
        }
    )
        .post('/', async ({ body, hostDb }: {  body: any, hostDb: HostDbClient }) => {
               return await eventpaymentService.createEventPayment(body, hostDb);
            },{
                body: EventPaymentSchema,
            })    
      .group('/:vendorInEventId', (app: any) =>
        app.guard(
            {
                 params: GetEventPaymentInEventParams,
            },
            (app: any) =>           
                app.resolve(
                    async ({
                params,
                hostDb,
              }: {
                eventId: string
                params: any
                hostDb: HostDbClient
              }) => {
                const vendorInEventId = params.vendorInEventId
                return { vendorInEventId }
              },
            )
            
            .put('/', async ({ vendorInEventId, body, hostDb }: {  vendorInEventId: string, body: any, hostDb: HostDbClient }) => {
                return await eventpaymentService.updateEventPayment(vendorInEventId ,body, hostDb);
            },{
                body: UpdateEventPayment,
            })
            .delete('/', async ({ vendorInEventId, hostDb }: {  vendorInEventId: string, hostDb: HostDbClient }) => {
               const payment = await eventpaymentService.deleteEventPayment(vendorInEventId, hostDb);
                return payment;
            })
        )
    )