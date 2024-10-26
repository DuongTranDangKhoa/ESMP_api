import { Elysia } from 'elysia';
import { HostDbClient } from '../../database/host.db';
import menuService from './menu.service'; // Corrected to menuService


export const menuGroup = (app: any) =>
app.guard('/', (app: any) =>
    app
        .resolve(
            (context : any) => {
                console.log(context);
                return { a: context };
            }
        )
        .get('/:vendorId/:eventId', async ({ params, hostDb}: {params: any, hostDb: HostDbClient} ) => {
            const vendorId = params.vendorId;
            const eventId = params.eventId;
            const menuItems = await menuService.getMenuListByVendorId(vendorId,eventId, hostDb);
            return menuItems;
        })
        .post('/:vendorId/:eventId', async ({ params,body, set, hostDb }: {params: any , body: any,  set: any , hostDb: HostDbClient}) => {
            const vendorId = params.vendorId;
            const eventId = params.eventId;
            await menuService.createMenu( vendorId, eventId, body, hostDb);
            set.status = ('Created');
        return {
          message: 'Create order success',
        };
        })
        .put('/:menuId', async ({ body, store }: any) => {
            const hostDb: HostDbClient = store.hostDb; // Assuming hostDb is available in the store
            const updatedMenuItem = await menuService.updateMenu(body, hostDb);
            return updatedMenuItem;
        })
        .delete('/:menuId', async ({ params, store }: any) => {
            const { vendorId, menuId } = params;
            const hostDb: HostDbClient = store.hostDb; // Assuming hostDb is available in the store
            await menuService.deleteMenu(menuId, hostDb);
            return { message: 'Delete menuItem success' };
        })
);