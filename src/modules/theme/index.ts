import { Theme } from './../../../prisma/prismabox/postgres/hostdb/Theme';
import { HostDbClient } from "../../database/dbClient.db";
import themeService from './theme.service';


export const themeGroup = (app: any) =>
    app
        .get('/:themId', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { themId } = params;
            return await  themeService.getThemeById(themId, hostDb);
        })
        .get('/hostId/:hostId', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { hostId } = params;
            console.log(hostId);
            const response = await themeService.getTheme(hostId, hostDb);
            return response;
        })
        .post('/', async ({ body, hostDb }: { body: any, hostDb: HostDbClient }) => {
            await themeService.createTheme(body, hostDb);
            return 'Create successfully Category';
        })
        .put('/:themId', async ({ params, body, hostDb }: { params: any, body: any, hostDb: HostDbClient }) => {
            const { themId } = params;
            await themeService.updateTheme(themId, body, hostDb);
            return 'Update successfully Category';
        })
        .delete('/:themId', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { themId } = params;
            await themeService.deleteTheme(themId, hostDb);
            return 'Delete successfully Category';
        });
