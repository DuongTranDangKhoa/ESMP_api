
import { HostDbClient } from "../../database/host.db";
import packageService from "./package.service";


export const packageGroup = (app: any) =>
    app
        .get('/', async ({ hostDb }: {  hostDb: HostDbClient }) => {
            return await  packageService.getPackage(hostDb);
        })
        .get('/:id', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { id }  = params;
            return await  packageService.getPackageById(id , hostDb);
        })
        .post('/', async ({ params, body, hostDb }: { params: any, body: any, hostDb: HostDbClient }) => {
            const event = await packageService.createPackage(body ,hostDb);
            if (!event) {
                return 'Create unsuccessfully Package';
            }
            return 'Create successfully Package';
        })
        .put('/:id', async ({ params, body, hostDb }: { params: any, body: any, hostDb: HostDbClient }) => {
            const { id } = params;
            await packageService.updatePackage(id, body, hostDb);
            return 'Update successfully Package';
        })
        .delete('/:id', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { id } = params;
            await packageService.deletePackage(id, hostDb);
            return 'Delete successfully Package';
            
        });
