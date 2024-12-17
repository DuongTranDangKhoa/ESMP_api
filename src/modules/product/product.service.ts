
import { HostDbClient } from '../../database/dbClient.db'
import categoryService from '../category/category.service'
import * as productRepo from './product.repo'
import { ProductObject } from './product.schema'

const getProductListByVendorId = async (vendorId: string, hostDb: HostDbClient) => {
  return await productRepo.getProductListByVendorId(vendorId, hostDb)
}

const getProductList = async (hostDb: HostDbClient) => {
  return await productRepo.getProductList(hostDb)
}

const createVendorProduct = async (vendorId: string, inputData: ProductObject, hostDb: HostDbClient) => {
  try {
    await categoryService.getCategoryById(inputData.categoryId, hostDb)
    return await productRepo.createVendorProduct(inputData, vendorId, hostDb)
  } catch (error) {
    console.error('Error creating product:', error)
    throw new Error('Failed to create product: ' + error)
  }
}
const createProductByExcel = async (inputData: any, vendorId: string, hostId: string ,hostDb: HostDbClient) => {
  try{
   return await productRepo.createProductByExcel(inputData, vendorId, hostId ,hostDb);
  }catch (error) {
    console.error('Error creating product:', error)
    throw new Error('Failed to create product: ' + error)
  }
}

const getProductById = async (productId: string, hostDb: HostDbClient) => {
  const product = await productRepo.getProductById(productId, hostDb)
  if (!product) {
    throw new Error('Product not found!')
  }
  return product
}

const updateProduct = async (vendorId: string, productId: string, updateData: ProductObject, hostDb: HostDbClient) => {
  console.log('Updating product:', productId)
  await categoryService.getCategoryById(updateData.categoryId, hostDb)
  return await productRepo.updateProduct(productId, vendorId, updateData, hostDb)
}

const deleteProduct = async (productId: string, hostDb: HostDbClient) => {
  try {
    console.log('Deleting product:', productId)
    await productRepo.deleteProduct(productId, hostDb)
  } catch (error) {
    console.error('Error deleting product:', error)
    throw new Error('Failed to delete product: ' + error)
  }
}

const productService = {
  getProductListByVendorId,
  getProductList,
  createVendorProduct,
  createProductByExcel,
  getProductById,
  updateProduct,
  deleteProduct,
}

export default productService
