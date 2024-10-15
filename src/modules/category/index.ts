import { HostDbClient } from "../../database/host.db"
import categoryService from "./category.service"

export const categoryGroup = (app: any) =>
    app.get('/', async ({ hostDb }: { hostDb: HostDbClient }) => {
        const response = await categoryService.getCategory(hostDb)
        return response
    })
        .guard('/', (app: any) => 
            app.resolve(
                (context: any) => {
                    return {a: context}
                }
            )
            .get('/:categoryId', async ({ categoryId, hostDb }: { categoryId: string, hostDb: HostDbClient }) => {
                await categoryService.getCategoryById(categoryId, hostDb)
            })
            .post('/', async ({ body, hostDb }: { body: any, hostDb: HostDbClient }) => {
                await categoryService.createCategory(body, hostDb)         
            })
            .put('/:categoryId', async ({ categoryId, body, hostDb }: { categoryId: string, body: any, hostDb: HostDbClient }) => {
                await categoryService.updateCategory(categoryId, body, hostDb)
            })
            .delete('/:categoryId', async ({ categoryId, hostDb }: { categoryId: string, hostDb: HostDbClient }) => {
                await categoryService.deleteCategory(categoryId, hostDb)
            })
        )