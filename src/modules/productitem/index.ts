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
                return "Create productItem success"
            },
           )
           .put(
            '/',
            async ({  body, hostDb }: {body: any, hostDb: HostDbClient } ) => {
                const productItem = await productService.updateProductItem(body, hostDb)
                return productItem
            },
           )
           .delete(
  '/:productItemId',
  async (req: { params: { productItemId: string }; hostDb: HostDbClient }) => {
    const { productItemId } = req.params;  // Lấy productItemId từ request params
    console.log('check', productItemId);
    await productService.deleteProductItem(productItemId, req.hostDb);
    return { message: 'Delete productItem success' };
  },
           )

        )