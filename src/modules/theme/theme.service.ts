import { HostDbClient } from "../../database/dbClient.db";
import { ThemeObject } from "./theme.schema";

const getTheme = async ( hostId: string,hostDb: HostDbClient) => {
return await hostDb.theme.findMany({where: { hostid: hostId }});
}

const getThemeById = async (themeId: string, hostDb: HostDbClient) => {
return await hostDb.theme.findFirst({ where: { themeId: themeId } })
}
const createTheme = async (theme: ThemeObject, hostDb: HostDbClient) => {
    console.log(theme);
    await hostDb.theme.create({ data: {
        name: theme.name,
        status: theme.status,
        hostid: theme.hostid,
    } })
}

const updateTheme = async (themeId: string, newTheme: ThemeObject, hostDb: HostDbClient) => {
    await hostDb.theme.update({ where: { themeId: themeId }, data:{ 
         name: newTheme.name, status: newTheme.status,} }) 
}
const deleteTheme = async (themeId: string, hostDb: HostDbClient) => {
    await hostDb.theme.delete({ where: { themeId: themeId } })
}

const themeService = {
    getTheme,
    getThemeById,
    createTheme,
    updateTheme,
    deleteTheme,
}
export default themeService