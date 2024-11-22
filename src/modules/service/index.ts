
import { HostDbClient } from "../../database/dbClient.db";
import serviceService from "./service.service";



export const serviceGroup = (app: any) =>
    app
        .get('/:eventId', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { eventId } = params;
            return await  serviceService.getService(eventId, hostDb);
        })
        .post('/:eventId', async ({ params, body, hostDb }: { params: any, body: any, hostDb: HostDbClient }) => {
            const { eventId } = params;
            const event = await serviceService.getService(eventId, hostDb);
            if (!event) {
                return 'Event not found';
            }
            await serviceService.createService(eventId, body, hostDb);
            return 'Create successfully Category';
        })
        .put('/:serviceId', async ({ params, body, hostDb }: { params: any, body: any, hostDb: HostDbClient }) => {
            const { serviceId } = params;
            await serviceService.updateService(serviceId, body, hostDb);
            return 'Update successfully Category';
        })
        .delete('/:serviceId', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { serviceId } = params;
            await serviceService.deleteService(serviceId, hostDb);
            return 'Delete successfully Category';
        });
