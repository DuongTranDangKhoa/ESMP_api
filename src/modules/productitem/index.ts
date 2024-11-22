import { HostDbClient } from '../../database/dbClient.db'
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
            '/:vendorId',
            async ({ params, body,set, hostDb }: { params: any,body: any, set : any, hostDb: HostDbClient } ) => {
                console.log('body', body);
                const vendorId = params.vendorId
                const productItem = await productService.createProductItem( vendorId ,body, hostDb)
                 set.status = status('Created')
                return {
                   message: 'Create productItem success',
                   id: productItem.productItemId
                }
            },
                {
                response: {
                  201: commonSchema.CommonSuccessResponse,
                },
              },        
           )
           .put(
            '/:vendorId/:productItemId/',
            async ({  params ,body, hostDb }: {params: any ,body: any, hostDb: HostDbClient } ) => {
              const { productItemId, vendorId } = params;  
                const productItem = await productService.updateProductItem(productItemId, vendorId,  body, hostDb)
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