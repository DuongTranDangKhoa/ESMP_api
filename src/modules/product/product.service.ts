import { NotFoundError } from 'elysia'
import { HostDbClient } from '../../database/host.db'
import { ProductObject, ProductType } from './product.schema'

const getProductListByVendorId = async (
  vendorid: string,
  hostDb: HostDbClient,
) => {
  return await hostDb.product.findMany({
    where: {
      vendorid,
    },
  })
}
const getProductList = async (hostDb: HostDbClient) => {
  return await hostDb.product.findMany()
}
const createVendorProduct = async (
  vendorId: string,
  inputData: ProductObject,
  hostDb: HostDbClient,
) => {
  console.log('Product created', inputData)
 const product = await hostDb.product.create({
    data: {
      categoryId: inputData.categoryId,
      productName: inputData.productName,
      description: inputData.description,
      quantity: inputData.quantity,
      count: inputData.count, 
      status: inputData.status,
      vendor: {
        connect: { vendorId } 
      }
    }
  });
  return product;
}

const getProductById = async (
  productId: string,
  hostDb: HostDbClient,
) => {
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
  vendorId: string,
  productid: string,
  updateData: ProductObject,
  hostDb: HostDbClient,
) => {
  console.log('Product updated', productid)
  await hostDb.product.update({
    where: {
      productId: productid 
    },
    data: {
      productId: productid,
      vendorid: vendorId,
      categoryId: updateData.categoryId,
      productName: updateData.productName,
      description: updateData.description,
      quantity: updateData.quantity,
      count: updateData.count,
      status: updateData.status
    }
  });
};
const deleteProduct = async (
  productid: string,
  hostDb: HostDbClient,
) => {
  console.log('Product updated', productid)
  await hostDb.product.update({
    where: {
      productId: productid 
    },
    data: {
      status: false
    }
  });
};





const productService = {
  getProductListByVendorId,
  getProductList,
  createVendorProduct,
  getProductById,
  updateProduct,
  deleteProduct,
}

export default productService
