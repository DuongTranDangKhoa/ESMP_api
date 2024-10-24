import { Elysia } from 'elysia';
import { HostDbClient } from '../../database/host.db';
import menuService from './menu.service'; // Corrected to menuService


export const MenuGroup = (app: any) =>
app.guard('/', (app: any) =>
    app
        .resolve(
            (context : any) => {
                console.log(context);
                return { a: context };
            }
        )
        .get('/:vendorId', async ({ params, store }: any) => {
            const { vendorId } = params;
            const hostDb: HostDbClient = store.hostDb; // Assuming hostDb is available in the store
            const menuItems = await menuService.getMenuListByVendorId(vendorId, hostDb);
            return menuItems;
        })
        .post('/', async ({ body, store }: any) => {
            const hostDb: HostDbClient = store.hostDb; // Assuming hostDb is available in the store
            const menuItem = await menuService.createMenu(body, hostDb);
            return menuItem;
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