import { NotFoundError } from "elysia";
import { HostDbClient } from "../../database/host.db";
import { ProductItemObject } from "./productitem.schema";
import { EventStatus } from "../../common/constant/common.constant";

const getProductItemByVendorId = async (
    vendorId: string, hostDb: HostDbClient,
) => {return await hostDb.productItem.findMany({
    where : {vendorid: vendorId},
})
}
const getProductItemById = async (
Guid : string,
vendorid : string,
productId: string,
hostDb: HostDbClient,
) => {
const productItem = await hostDb.productItem.findUnique({
where: {
    productId_vendorid: {
        productId,
        vendorid,
      },
},
})
 if (!productItem) {
    throw new NotFoundError('Product item not found')
 }
 return productItem
}
const createProductItem = async (
inputData: ProductItemObject, hostDb: HostDbClient) => {
  const productItem = await hostDb.productItem.create({
    data : inputData
  })
  return productItem
}
const updateProductItem = async (
    inputData: ProductItemObject, hostDb: HostDbClient) => {
        await hostDb.productItem.update({
            where: {
                productId_vendorid: {
                    productId: inputData.productId,
                    vendorid: inputData.vendorid,
                },
            },
            data: inputData,
        })
        return inputData
    }
const deleteProductItem = async (
    productId: string, vendorid: string, hostDb: HostDbClient) => {
        await hostDb.productItem.delete({
            where: {
                productId_vendorid: {
                    productId,
                    vendorid,
                },
            },
        })
    }
const productService = {
    getProductItemByVendorId,
    getProductItemById,
    createProductItem,
    updateProductItem,
    deleteProductItem
} 
export default productService