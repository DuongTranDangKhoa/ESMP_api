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
              return  await categoryService.getCategoryById(categoryId, hostDb)
            })
            .post('/', async ({ body, hostDb }: { body: any, hostDb: HostDbClient }) => {
                await categoryService.createCategory(body, hostDb)         
                return 'Create successfully Category'
            })
            .put('/:categoryId', async ({ params, body, hostDb }: { params: any, body: any, hostDb: HostDbClient }) => {
                const categoryId = params.categoryId
                await categoryService.updateCategory(categoryId, body, hostDb)
                return 'Update successfully Category'})
            .delete('/:categoryId', async ({ categoryId, hostDb }: { categoryId: string, hostDb: HostDbClient }) => {
                await categoryService.deleteCategory(categoryId, hostDb)
           
            })
        )