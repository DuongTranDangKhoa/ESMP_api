import { productItemRepo } from './productitem.repo';
import { ProductItemObject } from './productitem.schema';
import { HostDbClient } from '../../database/dbClient.db';
import { NotFoundError, InternalServerError } from 'elysia';

const getProductItems = async (vendorId: string, hostDb: HostDbClient) => {
    try {
        const productItems = await productItemRepo.getProductItems(vendorId, hostDb);

        if (!productItems || productItems.length === 0) {
            throw new NotFoundError('Product items not found');
        }

        return productItems;
    } catch (error) {
        throw new InternalServerError('Failed to retrieve product items');
    }
};

const createProductItem = async (vendorId: string, inputData: ProductItemObject, hostDb: HostDbClient) => {
    try {
        return await productItemRepo.createProductItem(vendorId, inputData, hostDb);
    } catch (error) {
        throw new InternalServerError('Failed to create product item');
    }
};

const updateProductItem = async (productItemId: string, vendorId: string, updatedData: ProductItemObject, hostDb: HostDbClient) => {
    try {
        return await productItemRepo.updateProductItem(productItemId, vendorId, updatedData, hostDb);
    } catch (error) {
        throw new InternalServerError('Failed to update product item');
    }
};

const deleteProductItem = async (productItemId: string, hostDb: HostDbClient) => {
    try {
        await productItemRepo.deleteProductItem(productItemId, hostDb);
    } catch (error) {
        throw new InternalServerError('Failed to delete product item');
    }
};

const productItemService = {
    getProductItems,
    createProductItem,
    updateProductItem,
    deleteProductItem,
};

export default productItemService;
