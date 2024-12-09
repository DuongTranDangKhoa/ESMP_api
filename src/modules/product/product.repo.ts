
import { HostDbClient } from '../../database/dbClient.db'
import { ProductObject } from './product.schema'

export const getProductListByVendorId = async (vendorId: string, hostDb: HostDbClient) => {
  return await hostDb.product.findMany({
    where: {
      vendorid: vendorId,
    },
  })
}

export const getProductList = async (hostDb: HostDbClient) => {
  return await hostDb.product.findMany()
}

export const createVendorProduct = async (inputData: ProductObject, vendorId: string, hostDb: HostDbClient) => {
  return await hostDb.product.create({
    data: {
      categoryId: inputData.categoryId,
      productName: inputData.productName,
      description: inputData.description,
      quantity: inputData.quantity,
      count: inputData.count,
      status: inputData.status,
      vendorid: vendorId,
    },
  })
}

export const getProductById = async (productId: string, hostDb: HostDbClient) => {
  return await hostDb.product.findUnique({
    where: {
      productId,
    },
  })
}

export const updateProduct = async (productId: string, vendorId: string, updateData: ProductObject, hostDb: HostDbClient) => {
  return await hostDb.product.update({
    where: {
      productId,
    },
    data: {
      productId,
      vendorid: vendorId,
      categoryId: updateData.categoryId,
      productName: updateData.productName,
      description: updateData.description,
      quantity: updateData.quantity,
      count: updateData.count,
      status: updateData.status,
    },
  })
}

export const deleteProduct = async (productId: string, hostDb: HostDbClient) => {
  return await hostDb.product.delete({
    where: {
      productId,
    },
  })
}
