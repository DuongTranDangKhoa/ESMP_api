
// import { HostDbClient } from "../../database/host.db";
// import packageService from "./package.service";


// export const packageGroup = (app: any) =>
//     app
//         .get('/', async ({ hostDb }: {  hostDb: HostDbClient }) => {
//             return await  packageService.getPackage(hostDb);
//         })
//         .get('/:id', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
//             const { id }    = params;
//             return await  packageService.getPackage(hostDb);
//         })
//         .post('/:id', async ({ params, body, hostDb }: { params: any, body: any, hostDb: HostDbClient }) => {
//             const { eventId } = params;
//             const event = await packageService.getService(eventId, hostDb);
//             if (!event) {
//                 return 'Event not found';
//             }
//             await serviceService.createService(eventId, body, hostDb);
//             return 'Create successfully Category';
//         })
//         .put('/:serviceId', async ({ params, body, hostDb }: { params: any, body: any, hostDb: HostDbClient }) => {
//             const { serviceId } = params;
//             await serviceService.updateService(serviceId, body, hostDb);
//             return 'Update successfully Category';
//         })
//         .delete('/:serviceId', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
//             const { serviceId } = params;
//             await serviceService.deleteService(serviceId, hostDb);
//             return 'Delete successfully Category';
//         });
