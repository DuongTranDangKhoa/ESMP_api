import status from 'statuses'
import { HostDbClient } from '../../database/host.db'
import * as commonSchema from '../../common/schema.common'
import * as vendorSchema from '../vendor/vendor.schema'
import * as productSchema from './product.schema'
import vendorService from '../vendor/vendor.service'
import productService from './product.service'

export const productGroup = (app: any) =>
  app.get('/',  async ({ hostDb }: { hostDb: HostDbClient }) => {
        const response = await productService.getProductList(hostDb)
        return response
      }, 
    )
  // group that require vendorId
  .group('/', (app: any) =>
    app.guard(
      {
        params: vendorSchema.GetVendorParams,
      },
      (app: any) =>
        app
          //guard for checking vendor exist or not
          .resolve(
            async ({
              params,
              hostDb,
            }: {
              params: any
              hostDb: HostDbClient
            }) => {
              const vendorId = params.vendorId
              await vendorService.getVendorById(vendorId, hostDb)
              return { vendorId }
            },
          )
          /**
           * GET api/product/:vendorId
           * Get Vendor's product list
           * @response get vendor's product list
           */
          .get(
            '/',
            async ({
              vendorId,
              set,
              hostDb,
            }: {
              vendorId: string
              set: any
              hostDb: HostDbClient
            }) => {
              const productListByVendorId =
                productService.getProductListByVendorId(vendorId, hostDb)
              set.status = status('OK')
              return productListByVendorId
            },
          )
          /**
           * POST api/product/:vendorId
           * Create Vendor's product
           * @response create product status
           */
          .post(
            '/',
            async ({
              vendorId,
              body,
              set,
              hostDb,
            }: {
              vendorId: string
              body: any
              set: any
              hostDb: HostDbClient
            }) => {
              const inputData = new productSchema.ProductObject( body)

              await productService.createVendorProduct(inputData, hostDb)

              set.status = status('Created')
            },
          )
          // group that require productId
          .group('/:productId', (app: any) =>
            app.guard(
              {
                params: productSchema.GetProductParams,
              },
              (app: any) =>
                app
                  //guard for checking product exist or not
                  .resolve(
                    async ({
                      params,
                      vendorId,
                      hostDb,
                    }: {
                      params: any
                      vendorId: string
                      hostDb: HostDbClient
                    }) => {
                      const productId = params.productId
                      const product = await productService.getProductById(
                        productId,
                        hostDb,
                      )
                      return { product, productId }
                    },
                  )
                  /**
                   * GET api/product/:vendorId/:productId
                   * Create Vendor's product
                   * @response product's details
                   */
                  .get(
                    '/',
                    ({
                      set,
                      product,
                    }: {
                      set: any
                      product: productSchema.ProductObject
                    }) => {
                      set.status = status('OK')
                      return product
                    },
                  )
                  /**
                   * PUT api/product/:vendorId/:productId
                   * Update Vendor's product
                   * @response update product status
                   */
                  .put(
                    '/',
                    async ({
                      vendorId,
                      productId,
                      body,
                      set,
                      hostDb,
                    }: {
                      vendorId: string
                      productId: string
                      body: any
                      set: any
                      hostDb: HostDbClient
                    }) => {
                      const updateData = new productSchema.ProductObject(
                        body
                      )
                      await productService.updateProduct(
                        productId,
                        updateData,
                        hostDb,
                      )
                      set.status = status('OK')
                      return {
                        message: 'Update product success',
                      }
                    },
                    {
                      body: vendorSchema.VendorObject,
                      response: {
                        200: commonSchema.CommonSuccessResponse,
                      },
                    },
                  )
                  /**
                   * DELETE api/product/:vendorId/:productId
                   * Delete product
                   * @response Delete product status
                   */
                  .delete(
                    '/',
                    async ({
                      vendorId,
                      productId,
                      set,
                      hostDb,
                    }: {
                      vendorId: string
                      productId: string
                      set: any
                      hostDb: HostDbClient
                    }) => {
                      await productService.deleteProduct(
                        productId,
                        hostDb,
                      )
                      set.status = status('OK')
                      return {
                        message: 'Delete product success',
                      }
                    },
                  ),
            ),
          ),
    ),
  )
