import { NotFoundError, InternalServerError } from "elysia";
import { HostDbClient } from "../../database/host.db";
import { ProductItemObject, ProductItemType } from "./productitem.schema";
import { EventStatus } from "../../common/constant/common.constant";
import productService from "../product/product.service";

const getProductItem = async (vendorId: string, hostDb: HostDbClient) => {
    try {
        const products = await productService.getProductListByVendorId(vendorId, hostDb);

        let productItems;
        for (const product of products) {
            productItems = await hostDb.productItem.findMany({
                where: { productId: product.productId }, 
            });
            if (productItems && productItems.length > 0) {
                 await hostDb.$disconnect();
                return {productItems,  vendorId };
            }
        }
        throw new Error('No product items found for any product.');

    } catch (error) {
        throw new InternalServerError('Failed to retrieve product items');
    } finally {
         await hostDb.$disconnect();
    }
}

const getProductItemById = async (
    Guid: string,
    productItemId: string,
    hostDb: HostDbClient,
) => {
    try {
        const productItem = await hostDb.productItem.findUnique({
            where: {
                productItemId: productItemId,
            },
        });
        if (!productItem) {
            throw new NotFoundError('Product item not found');
        }
         await hostDb.$disconnect();
        return productItem;
    } catch (error) {
        throw new InternalServerError('Failed to retrieve product item');
    }
}

const createProductItem = async (
    inputData: ProductItemType, hostDb: HostDbClient
) => {
    try {
        console.log("Product item created", inputData);
        const productItem = await hostDb.productItem.create({
            data: inputData,
        });
         await hostDb.$disconnect();
        return productItem;
    } catch (error) {
        throw new InternalServerError('Failed to create product item');
    }
}

const updateProductItem = async (
    inputData: ProductItemObject, hostDb: HostDbClient
) => {
    try {
        await hostDb.productItem.update({
            where: {
                productItemId: inputData.productItemId,
            },
            data: inputData,
        });
         await hostDb.$disconnect();
        return inputData;
    } catch (error) {
        throw new InternalServerError('Failed to update product item');
    }
}

const deleteProductItem = async (
    productItemId: string, hostDb: HostDbClient
) => {
    try {
        console.log("Product item deleted", productItemId);
        await hostDb.productItem.delete({
            where: {
                productItemId: productItemId,
            },
        });
         await hostDb.$disconnect();
    } catch (error) {
        throw new InternalServerError('Failed to delete product item');
    }
}

const productItemService = {
    getProductItem,
    getProductItemById,
    createProductItem,
    updateProductItem,
    deleteProductItem
};

export default productItemService;
