import { NotFoundError } from "elysia";
import { HostDbClient } from "../../database/host.db";
import { ProductItemObject, ProductItemType } from "./productitem.schema";
import { EventStatus } from "../../common/constant/common.constant";

const getProductItemByVendorId = async (
    vendorId: string, hostDb: HostDbClient,
) => {return await hostDb.productItem.findMany({
    where : {vendorid: vendorId},
})
}
const getProductItemById = async (
Guid : string,
productItemId: string,
hostDb: HostDbClient,
) => {
const productItem = await hostDb.productItem.findUnique({
where: {
    productItemId: productItemId
},
})
 if (!productItem) {
    throw new NotFoundError('Product item not found')
 }
 return productItem
}
const createProductItem = async (
inputData: ProductItemType, hostDb: HostDbClient) => {
  const productItem = await hostDb.productItem.create({
    data: inputData,
  })
  return productItem
}
const updateProductItem = async (
    inputData: ProductItemObject, hostDb: HostDbClient) => {
        await hostDb.productItem.update({
            where: {
                productItemId: inputData.productItemId,
            },
            data: inputData,
        })
        return inputData
    }
const deleteProductItem = async (
    productItemId: string, hostDb: HostDbClient) => {
        await hostDb.productItem.delete({
            where: {
                productItemId: productItemId,
                },
            },
        )
    }
const productService = {
    getProductItemByVendorId,
    getProductItemById,
    createProductItem,
    updateProductItem,
    deleteProductItem
} 
export default productService