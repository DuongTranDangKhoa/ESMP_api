
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
export const createProductByExcel = async (inputData: any, vendorId: string, hostId: string ,hostDb: HostDbClient) => {
  
  const categories = await hostDb.category.findMany({
    where: { hostid: hostId },
  });


  const matchedCategory = categories.find(
    (category) => category.categoryName === inputData.categoryname
  );
  const categoryId = matchedCategory ? matchedCategory.categoryId : null;

  if (!categoryId) {
    throw new Error(`Category not found for name: ${inputData.categoryname}`);
  }

  const product = await hostDb.product.create({
    data: {
      categoryId: categoryId,
      productName: inputData.productName,
      description: inputData.description,
      quantity: inputData.quantity,
      status: true,
      vendorid: vendorId,
    },
  });

  return product;
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
