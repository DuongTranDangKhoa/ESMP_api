import { HostDbClient } from "../../database/host.db";
import categoryService from "./category.service";

export const categoryGroup = (app: any) =>
    app
        .get('/:categoryId', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { categoryId } = params;
            return await categoryService.getCategoryById(categoryId, hostDb);
        })
        .get('/hostId/:hostId', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { hostId } = params;
            console.log(hostId);
            const response = await categoryService.getCategory(hostId, hostDb);
            return response;
        })
        .post('/', async ({ body, hostDb }: { body: any, hostDb: HostDbClient }) => {
            await categoryService.createCategory(body, hostDb);
            return 'Create successfully Category';
        })
        .put('/:categoryId', async ({ params, body, hostDb }: { params: any, body: any, hostDb: HostDbClient }) => {
            const { categoryId } = params;
            await categoryService.updateCategory(categoryId, body, hostDb);
            return 'Update successfully Category';
        })
        .delete('/:categoryId', async ({ params, hostDb }: { params: any, hostDb: HostDbClient }) => {
            const { categoryId } = params;
            await categoryService.deleteCategory(categoryId, hostDb);
            return 'Delete successfully Category';
        });
