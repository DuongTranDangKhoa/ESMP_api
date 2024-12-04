// productitem.repo.ts
import { HostDbClient } from '../../database/dbClient.db';
import { ProductItemObject, ProductInProductItemObject } from './productitem.schema';

export const productItemRepo = {
    getProductItems: async (vendorId: string, hostDb: HostDbClient) => {
        return await hostDb.productItem.findMany({
            where: {
                vendorId: vendorId,
            },
        });
    },

    createProductItem: async (vendorId: string, inputData: ProductItemObject, hostDb: HostDbClient) => {
        const productItem = await hostDb.productItem.create({
            data: {
                vendorId: vendorId,
                description: inputData.description,
                status: true,
                name: inputData.name,
                price: inputData.price,
            },
        });

        const productInProductItem = inputData.details.map(detail => ({
            productId: detail.productId,
            productItemId: productItem.productItemId,
            quantity: detail.quantity,
            unit: detail.unit,
        }));

        for (const detail of productInProductItem) {
            await hostDb.productInProductItem.createMany({
                data: {
                    productId: detail.productId,
                    productItemId: productItem.productItemId,
                    quantity: detail.quantity,
                    unit: detail.unit,
                },
            });
        }

        return productItem;
    },

    updateProductItem: async (productItemId: string, vendorId: string, updatedData: ProductItemObject, hostDb: HostDbClient) => {
        const productItem = await hostDb.productItem.update({
            where: { productItemId: productItemId },
            data: {
                vendorId: vendorId,
                description: updatedData.description,
                status: updatedData.status !== undefined ? updatedData.status : true,
                name: updatedData.name,
                price: updatedData.price,
                updatedAt: new Date(),
            },
        });

        await hostDb.productInProductItem.deleteMany({
            where: { productItemId: productItemId },
        });

        const updatedProductInProductItem = updatedData.details.map(detail => ({
            productId: detail.productId,
            productItemId: productItemId,
            quantity: detail.quantity,
            unit: detail.unit,
        }));

        for (const detail of updatedProductInProductItem) {
            await hostDb.productInProductItem.createMany({
                data: {
                    productId: detail.productId,
                    productItemId: productItemId,
                    quantity: detail.quantity,
                    unit: detail.unit,
                },
            });
        }

        return productItem;
    },

    deleteProductItem: async (productItemId: string, hostDb: HostDbClient) => {
        await hostDb.productItem.update({
            where: {
                productItemId: productItemId,
            },
            data: {
                status: false, 
            },
        });
    },
      // Update product quantity and count
  updateProductQuantityAndCount: async (productId: string, quantity: number, hostDb: HostDbClient) => {
    return await hostDb.product.update({
      where: { productId },
      data: {
        quantity: { decrement: quantity },
        count: { increment: quantity },
      },
    });
  },


  getProductInProductItem: async (productItemId: string, hostDb: HostDbClient) => {
    return await hostDb.productInProductItem.findMany({
      where: { productItemId },
    });
  },


  getProductById: async (productId: string, hostDb: HostDbClient) => {
    return await hostDb.product.findUnique({
      where: { productId },
    });
  },
};
