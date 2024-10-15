import { HostDbClient } from '../../database/host.db'
import productService from './productitem.service'

export const productItemGroup = (app: any) =>
    app
        .guard('/', (app: any) =>
           app.            
           resolve(
             (context: any) => {console.log(context)
                return {a: context}
             }
           )
            .get(
            '/:vendorId',
            async ({vendorId, hostDb }: { vendorId: string, hostDb: HostDbClient } ) => {
               
                const productItems =  productService.getProductItemByVendorId(vendorId, hostDb)
                return productItems
            },
           )
           .post(
            '/',
            async ({ body, hostDb }: { body: any, hostDb: HostDbClient } ) => {
                const productItem = await productService.createProductItem( body, hostDb)
                return productItem
            },
           )
           .put(
            '/:productItemId',
            async ({  body, hostDb }: {body: any, hostDb: HostDbClient } ) => {
                const productItem = await productService.updateProductItem(body, hostDb)
                return productItem
            },
           )
           .delete(
            '/:productItemId',
            async ({  productId, hostDb }: {  productId: string, hostDb: HostDbClient } ) => {
                await productService.deleteProductItem(vendorId, productId, hostDb)
                return { message: 'Delete productItem success' }
            },
           )

        )