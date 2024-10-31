import { HostDbClient } from "../../database/host.db";
import { MenuObject, ProductItemInMenuObject, ProductItemInMenuUpdateObject } from "./menu.schema";

const getMenuList = async (hostDb: HostDbClient) => {
    return await hostDb.menu.findMany()
}
const getMenuListByVendorId = async ( vendorId: string , eventId: string ,hostDb: HostDbClient) => {
    const menuEvent = await hostDb.vendorInEvent.findMany({
            where: {           
                    vendorId: vendorId,
                    eventId: eventId,
            },
        });
       
        if (!menuEvent) {
            throw new Error('Vendor in event not found');
        }
        const vendorinEventid =  menuEvent[0].vendorinEventId
        const menu = await hostDb.menu.findUnique({where: {menuId: vendorinEventid}})
        const details = await hostDb.productItemInMenu.findMany({where: {menuId: vendorinEventid, status: true }})
        const productItemIds = details.map((item) => item.productItemId)
         await hostDb.$disconnect();
        return {menu, productItemIds}    
}
// const getMenuListByEventId = async ( eventId: string, hostDb: HostDbClient) => {
//     return await hostDb.menu.findMany({where: {eventId} })
// }
const createMenu = async (vendorId: string, eventId: string, inputData: ProductItemInMenuObject, hostDb: HostDbClient) => {
    try {
       
        const menuEvent = await hostDb.vendorInEvent.findFirst({
            where: {
                vendorId: vendorId,
                eventId: eventId,
            },
        });

        if (!menuEvent) {
            throw new Error('Vendor in event not found');
        }

        const vendorinEventId = menuEvent.vendorinEventId;

   
        const existingMenu = await hostDb.menu.findUnique({
            where: { menuId: vendorinEventId },
        });

        let menu;
        if (existingMenu) {
    
            menu = existingMenu;
        } else {
          
            menu = await hostDb.menu.create({
                data: {
                    menuId: vendorinEventId, 
                    menuName: inputData.menuName,
                },
            });
        }

        const productItemData = inputData.productItem.map((item: { id: string }) => {
            return hostDb.productItemInMenu.create({
                data: {
                    menuId: menu.menuId,
                    productItemId: item.id,
                },
            });
        });

   
        await Promise.all(productItemData);

    } catch (error) {
        console.error("Error creating menu:", error);
        throw new Error('Failed to create menu');
    } finally {
        await hostDb.$disconnect();
    }
};

const updateMenu = async (menuid: string, inputData: ProductItemInMenuUpdateObject, hostDb: HostDbClient) =>{
     try {
        const
            menu = await hostDb.menu.update({
    where: { menuId: menuid },
    data: {
        menuName: inputData.menuName,
    },
});
        

        const productItemData = inputData.productItem.map((item: { id: string, status: boolean }) => {
            return hostDb.productItemInMenu.updateMany({
                where: { menuId: menuid, productItemId: item.id },
                data: {
                    status: item.status,
                },
               
            });
        });

   
        await Promise.all(productItemData);

    } catch (error) {
        console.error("Error creating menu:", error);
        throw new Error('Failed to update menu');
    } finally {
        await hostDb.$disconnect();
    }
}
const deleteMenu = async (menuId: string ,hostDb: HostDbClient) => { 
  
    await hostDb.productItemInMenu.deleteMany({where: {menuId}})
    await hostDb.menu.deleteMany({where: {menuId}})
    await hostDb.$disconnect();
}
const menuService = {
    getMenuList,
    getMenuListByVendorId,
    // getMenuListByEventId,
    createMenu,
    updateMenu,
    deleteMenu,
}
export default menuService