// menu.service.ts
import menuRepo from './menu.repo';
import { ProductItemInMenuObject, ProductItemInMenuUpdateObject } from './menu.schema';
import { HostDbClient } from '../../database/dbClient.db';

const getMenuList = async (hostDb: HostDbClient) => {
    return await menuRepo.getMenuList(hostDb);
};

const getMenuListByVendorId = async (vendorId: string, eventId: string, hostDb: HostDbClient) => {
    return await menuRepo.getMenuListByVendorId(vendorId, eventId, hostDb);
    console.log(first)
};

const createMenu = async (vendorId: string, eventId: string, inputData: ProductItemInMenuObject, hostDb: HostDbClient) => {
    try {
        const menu = await menuRepo.createMenu(vendorId, eventId, inputData, hostDb);
        return menu;
    } catch (error) {
        console.error('Error creating menu:', error);
        throw new Error('Failed to create menu');
    }
};

const updateMenu = async (menuId: string, inputData: ProductItemInMenuUpdateObject, hostDb: HostDbClient) => {
    try {
        const menu = await menuRepo.updateMenu(menuId, inputData, hostDb);
        return menu;
    } catch (error) {
        console.error('Error updating menu:', error);
        throw new Error('Failed to update menu');
    }
};

const deleteMenu = async (menuId: string, hostDb: HostDbClient) => {
    try {
        await menuRepo.deleteMenu(menuId, hostDb);
    } catch (error) {
        console.error('Error deleting menu:', error);
        throw new Error('Failed to delete menu');
    }
};

const menuService = {
    getMenuList,
    getMenuListByVendorId,
    createMenu,
    updateMenu,
    deleteMenu,
};

export default menuService;
