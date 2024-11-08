import { NotFoundError } from 'elysia'
import { HostDbClient } from '../../database/host.db'
import { ProductObject, ProductType } from './product.schema'

const getProductListByVendorId = async (
  vendorid: string,
  hostDb: HostDbClient,
) => {
  const product = await hostDb.product.findMany({
    where: {
      vendorid,
    },
  })
   await hostDb.$disconnect();
  return product
}
const getProductList = async (hostDb: HostDbClient) => {
  const product = await hostDb.product.findMany()
   await hostDb.$disconnect();
  return product
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
      vendorid: vendorId,
    }
  });
   await hostDb.$disconnect();
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
   await hostDb.$disconnect();
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
   await hostDb.$disconnect();
};
const deleteProduct = async (
  productid: string,
  hostDb: HostDbClient,
) => {
  try {
    console.log('Product updated', productid);
    await hostDb.product.delete({
      where: {
        productId: productid,
      },
    });
  } catch (error) {
    console.error('Error updating product status:', error);
    throw error; 
  } finally {
    await hostDb.$disconnect();
  }
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
