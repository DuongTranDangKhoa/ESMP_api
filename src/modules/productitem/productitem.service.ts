import { NotFoundError, InternalServerError } from "elysia";
import { HostDbClient } from "../../database/host.db";
import { ProductInProductItemObject, ProductItemObject, ProductItemType } from "./productitem.schema";
import { EventStatus } from "../../common/constant/common.constant";
import productService from "../product/product.service";

const getProductItem = async (vendorId: string, hostDb: HostDbClient) => {
    try {
        const productItems = await hostDb.productItem.findMany({
            where: {
                vendorId: vendorId,
            },
        });

        if (!productItems || productItems.length === 0) {
            throw new Error('Product items not found');
        }

        const productItemDetails: ProductItemObject[] = [];

        for (const productItem of productItems) {
            // Fetch details for each product item
            const productInProductItems = await hostDb.productInProductItem.findMany({
                where: {
                    productItemId: productItem.productItemId,
                },
            });
            
            // Map each detail to ProductInProductItemObject
            const details = productInProductItems.map(detail => new ProductInProductItemObject({
                productId: detail.productId,
                quantity: detail.quantity,
                unit: detail.unit
            }));
            console.log("productInProductItems", details);
            productItemDetails.push(new ProductItemObject({
                productItemId: productItem.productItemId,
                vendorId: vendorId,
                name: productItem.name,
                description: productItem.description,
                price: productItem.price,  
                details: details,  
                createAt: productItem.createAt ,
                updateAt: productItem.updatedAt,
                status: productItem.status,
            }));
        }

        await hostDb.$disconnect();
        return productItemDetails;

    } catch (error) {
        console.error("Error retrieving product items:", error);
        throw new Error('Failed to retrieve product items');
    }
};



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
    vendorId: string ,inputData: ProductItemObject, hostDb: HostDbClient
) => {
    try {
        console.log("Creating product item", inputData);
        const productItem = await hostDb.productItem.create({
            data: {
                vendorId: vendorId,
                description: inputData.description,
                status: true,
                name: inputData.name,
                price: inputData.price
            },
        });

     
        const productInProductItem = inputData.details.map(detail => ({
    productId: detail.productId,
    productItemId: productItem.productItemId,
    quantity: detail.quantity,
    unit: detail.unit 
}));
        for (const detail of productInProductItem) {
            console.log("Creating product in product item", detail);    
            await hostDb.productInProductItem.createMany({
            data: {
                productId: detail.productId,
                productItemId: productItem.productItemId,
                quantity: detail.quantity,
                unit: detail.unit
            }
        });
        }
        await hostDb.$disconnect();
        return productItem;
    } catch (error) {
        console.error("Error creating product item:", error);
        throw new Error('Failed to create product item');
    }
};


// const updateProductItem = async (
//     inputData: ProductItemObject, hostDb: HostDbClient
// ) => {
//     try {
//         await hostDb.productItem.update({
//             where: {
//                 productItemId: inputData.productItemId,
//             },
//             data: inputData,
//         });
//          await hostDb.$disconnect();
//         return inputData;
//     } catch (error) {
//         throw new InternalServerError('Failed to update product item');
//     }
// }
const updateProductItem = async (
    productItemId: string,
    vendorId: string,
    updatedData: ProductItemObject,
    hostDb: HostDbClient
) => {
    try {
        const productItem = await hostDb.productItem.update({
            where: { productItemId: productItemId }, 
            data: {
                vendorId: vendorId,
                description: updatedData.description,
                status: updatedData.status !== undefined ? updatedData.status : true,
                name: updatedData.name,
                price: updatedData.price,
                updatedAt: new Date() 
            },
        });
        await hostDb.productInProductItem.deleteMany({
            where: { productItemId: productItemId }
        });
        const updatedProductInProductItem = updatedData.details.map(detail => ({
            productId: detail.productId,
            productItemId: productItemId,
            quantity: detail.quantity,
            unit: detail.unit
        }));

        for (const detail of updatedProductInProductItem) {
            
            await hostDb.productInProductItem.createMany({
                data: {
                    productId: detail.productId,
                    productItemId: productItemId,
                    quantity: detail.quantity,
                    unit: detail.unit
                }
            });
        }

        await hostDb.$disconnect();
        return productItem;
    } catch (error) {
        console.error("Error updating product item:", error);
        throw new Error('Failed to update product item');
    }
};
const deleteProductItem = async (
    productItemId: string, hostDb: HostDbClient
) => {
    try {
        console.log("Product item deleted", productItemId);
        await hostDb.productItem.update({
            where: {
                productItemId: productItemId,
            },data: {
                status: false, // Sử dụng dấu hai chấm (:) thay vì dấu chấm phẩy (;)
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
