// menu.repo.ts
import { HostDbClient } from "../../database/dbClient.db";
import { MenuObject, ProductItemInMenuObject, ProductItemInMenuUpdateObject } from "./menu.schema";

// Repository methods to interact with database
const getMenuList = async (hostDb: HostDbClient) => {
    return await hostDb.menu.findMany();
};

const getMenuListByVendorId = async (vendorId: string, eventId: string, hostDb: HostDbClient) => {
    const vendorInEvent = await hostDb.vendorInEvent.findFirst({
        where: { vendorId, eventId },
    });

    if (!vendorInEvent) {
        throw new Error('Vendor in event not found');
    }

    const menuEvent = await hostDb.menu.findUnique({
        where: {
            menuId: vendorInEvent.vendorinEventId,
        },
    });

    if (!menuEvent) {
        throw new Error('Menu event not found');
    }

    const details = await hostDb.productItemInMenu.findMany({
        where: { menuId: menuEvent.menuId },
    });

    const productItemIds = details.map((item) => ({
        productItemId: item.productItemId,
        status: item.status,
    }));

    return { menuEvent, productItemIds };
};

const createMenu = async (vendorId: string, eventId: string, inputData: ProductItemInMenuObject, hostDb: HostDbClient) => {
    const menuEvent = await hostDb.vendorInEvent.findFirst({
        where: { vendorId, eventId },
    });

    if (!menuEvent) {
        throw new Error('Vendor in event not found');
    }

    const vendorInEventId = menuEvent.vendorinEventId;

    const existingMenu = await hostDb.menu.findUnique({
        where: { menuId: vendorInEventId },
    });

    let menu;
    if (existingMenu) {
        menu = existingMenu;
    } else {
        menu = await hostDb.menu.create({
            data: {
                menuId: vendorInEventId,
                menuName: inputData.menuName,
            },
        });
    }

    const productItemData = inputData.productItem.map((item) => {
        return hostDb.productItemInMenu.create({
            data: {
                menuId: menu.menuId,
                productItemId: item.id,
            },
        });
    });

    await Promise.all(productItemData);
    return menu;
};

const updateMenu = async (menuId: string, inputData: ProductItemInMenuUpdateObject, hostDb: HostDbClient) => {
    const menu = await hostDb.menu.update({
        where: { menuId },
        data: {
            menuName: inputData.menuName,
        },
    });

    const productItemData = inputData.productItem.map((item) => {
        return hostDb.productItemInMenu.updateMany({
            where: { menuId, productItemId: item.id },
            data: {
                status: item.status,
            },
        });
    });

    await Promise.all(productItemData);
    return menu;
};

const deleteMenu = async (menuId: string, hostDb: HostDbClient) => {
    await hostDb.productItemInMenu.deleteMany({ where: { menuId } });
    await hostDb.menu.delete({ where: { menuId } });
};

const menuRepo = {
    getMenuList,
    getMenuListByVendorId,
    createMenu,
    updateMenu,
    deleteMenu,
};

export default menuRepo;
