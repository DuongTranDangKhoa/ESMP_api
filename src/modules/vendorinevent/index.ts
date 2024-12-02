import { HostDbClient } from "../../database/dbClient.db";
import vendorineventservice from "./vendorinevent.service";

export const vendorineventGroup = (app: any) => 
   
        app.get('/:vendorId/:eventId', async ({ params, hostDb }: { params: any; hostDb: HostDbClient }) => {
    const vendorId = params.vendorId;
    const eventId = params.eventId;
    const vendorInEvent = await vendorineventservice.getVendorInEvent(eventId, vendorId, hostDb);
    if (!vendorInEvent) {
        return { message: 'Vendor do not join' };
    } 
    return vendorInEvent;
          })
        .post('/:vendorId/:eventId', async ({ params, set, hostDb }: {params: any ,  set: any , hostDb: HostDbClient}) => {
            const vendorId = params.vendorId;
            const eventId = params.eventId;
            await vendorineventservice.createVendorInEvent( eventId, vendorId,  hostDb);
            set.status = ('Created');
            return { message: 'Create vendorInEvent success' };

        })
        .put('/:vendorInEventId', async ({ params, body, hostDb}: {params: any,body: any, hostDb: HostDbClient}) => {
            const vendorInEventId = params.vendorInEventId;
            const updatedVendorInEvent = await vendorineventservice.updateVendorInEvent( vendorInEventId,body, hostDb);
            return {
                message: 'Update vendorInEvent success',
            };
        })
        .delete('/:vendorInEventId', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
        })
        .get('/countevents/:hostid', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const hostid = params.hostid;
            const eventCount = await vendorineventservice.countEventByMostVendor(hostid, hostDb);
            return { eventCount };
        })
    