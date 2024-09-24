import { NotFoundError } from 'elysia'
import { HostDbClient } from '../../database/host.db'
import { ProductObject, ProductType } from './product.schema'

const getProductListByVendorId = async (
  categoryId: string,
  hostDb: HostDbClient,
) => {
  return await hostDb.product.findMany({
    where: {
      categoryId,
    },
  })
}
const getProductList = async (hostDb: HostDbClient) => {
  return await hostDb.product.findMany()
}
const createVendorProduct = async (
  inputData: ProductObject,
  hostDb: HostDbClient,
) => {
  await hostDb.product.create({
    data: inputData,
  })
}

const getProductById = async (
  productId: string,
  hostDb: HostDbClient,
) => {
  console.log( productId)
  const product = await hostDb.product.findUnique({
    where: {
        productId,

    },
  })
  if (!product) {
    throw new NotFoundError('Product not existed!')
  }
  return product
}

const updateProduct = async (
  productId: string,
  updateData: ProductObject,
  hostDb: HostDbClient,
) => {
  await hostDb.product.update({
    where: {
        productId
      },
       data: updateData,
    },)
}


const deleteProduct = async (
  productId: string,
  hostDb: HostDbClient,
) => {
  await hostDb.product.delete({
    where: {
        productId,
      },
    },
  )
}


const productService = {
  getProductListByVendorId,
  getProductList,
  createVendorProduct,
  getProductById,
  updateProduct,
  deleteProduct,
}

export default productService
