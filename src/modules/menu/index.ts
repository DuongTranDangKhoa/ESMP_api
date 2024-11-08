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
            if (menuItems === null) {
                return { message: 'Menu not found' };           
            }
            return menuItems;
        })
        .post('/:vendorId/:eventId', async ({ params,body, set, hostDb }: {params: any , body: any,  set: any , hostDb: HostDbClient}) => {
            const vendorId = params.vendorId;
            const eventId = params.eventId;
            await menuService.createMenu( vendorId, eventId, body, hostDb);
            set.status = ('Created');
        return {
          message: 'Create menuItem success',
        };
        })
        .put('/:menuId', async ({ params, body, hostDb}: {params: any,body: any, hostDb: HostDbClient}) => {
            const menuId = params.menuId;
            const updatedMenuItem = await menuService.updateMenu(menuId, body, hostDb);
            return {
                message: 'Update menuItem success',
            };
        })
        .delete('/:menuId', async ({ params, hostDb }: {params: any, hostDb: HostDbClient} ) => {
            const { menuId } = params;
            await menuService.deleteMenu(menuId, hostDb);
            return { message: 'Delete menuItem success' };
        })
);