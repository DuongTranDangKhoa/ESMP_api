import { HostDbClient } from '../../database/host.db'
import productService from './productitem.service'
import status from 'statuses'
import * as productitemshema from "./productitem.schema";
import * as commonSchema from '../../common/schema.common'
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
            async (req: { params: { vendorId: string }; hostDb: HostDbClient } ) => {  
              const { vendorId } = req.params;          
                const productItems =  productService.getProductItem(vendorId, req.hostDb)
                return productItems
            },
           )
           .post(
            '/',
            async ({ body,set, hostDb }: { body: any, set : any, hostDb: HostDbClient } ) => {
                console.log('body', body);
                const productItem = await productService.createProductItem( body, hostDb)
                 set.status = status('Created')
                return {
                   message: 'Create productItem success',
                   id: productItem.productItemId
                }
            },
                {
                body: productitemshema.GetProuctPramas,
                response: {
                  201: commonSchema.CommonSuccessResponse,
                },
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