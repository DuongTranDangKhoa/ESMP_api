import { HostDbClient } from "../../database/host.db";
import { MenuObject } from "./menu.schema";

const getMenuList = async (hostDb: HostDbClient) => {
    return await hostDb.menu.findMany()
}
const getMenuListByVendorId = async ( vendorId: string ,hostDb: HostDbClient) => {
    return await hostDb.menu.findMany({where: {vendorId} })
}
const getMenuListByEventId = async ( eventId: string, hostDb: HostDbClient) => {
    return await hostDb.menu.findMany({where: {eventId} })
}
const createMenu = async (inputData: MenuObject ,hostDb: HostDbClient) => {
      await hostDb.menu.create({data: inputData})
}
const updateMenu = async (inputData: MenuObject ,hostDb: HostDbClient) =>{
    await hostDb.menu.updateMany({where: {menuId: inputData.menuId}, data: inputData})
}
const deleteMenu = async (menuId: string ,hostDb: HostDbClient) => { 
    await hostDb.menu.deleteMany({where: {menuId}})
}
const menuService = {
    getMenuList,
    getMenuListByVendorId,
    getMenuListByEventId,
    createMenu,
    updateMenu,
    deleteMenu,
}
export default menuService