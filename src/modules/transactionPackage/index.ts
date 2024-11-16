
import { HostDbClient } from "../../database/host.db";
import transactionPackageService from "./transactionPackage.service";



export const transactionpackageGroup = (app: any) =>
    app
        .get('/', async ({ hostDb }: {  hostDb: HostDbClient }) => {
            return await  transactionPackageService.getTransactionPackage(hostDb);
        })
        .post('/', async ({  body, hostDb }: { body: any, hostDb: HostDbClient }) => {
            const event = await transactionPackageService.createTransactionPackage(body ,hostDb);
            if (!event) {
                return 'Create unsuccessfully Buy Package';
            }
            return 'Create successfully Buy Package';
        })
        .put('/:id', async ({ params, body, hostDb }: { params: any, body: any, hostDb: HostDbClient }) => {
            const { id } = params;
            await transactionPackageService.updateTransactionPackage(id, body, hostDb);
            return 'Update successfully Buy Package';
        })
        .delete('/:id', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { id } = params;
            await transactionPackageService.deleteTransactionPackage(id, hostDb);
            return 'Delete successfully Buy Package';
            
        });
