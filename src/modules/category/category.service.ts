
import { HostDbClient } from '../../database/dbClient.db';
import { Category } from './../../../prisma/clients/postgres/hostdb/index.d';
const getCategory = async ( hostId: string,hostDb: HostDbClient) => {
return await hostDb.category.findMany({where: { hostid: hostId }});
}

const getCategoryById = async (categoryId: string, hostDb: HostDbClient) => {
  if (!categoryId) {
      throw new Error('Category ID is required');
    }

    const category = await hostDb.category.findUnique({ where: { categoryId } });
    if (!category) {
      throw new Error(`Category with ID ${categoryId} does not exist`);
    }

    return category;
}
const createCategory = async (category: Category, hostDb: HostDbClient) => {
    await hostDb.category.create({ data: {
        categoryName: category.categoryName,
        hostid: category.hostid,
    } })
}

const updateCategory = async (categoryId: string, newCategory: Category, hostDb: HostDbClient) => {
    await hostDb.category.update({ where: { categoryId: categoryId }, data:{ categoryId: categoryId,
         categoryName: newCategory.categoryName, status: newCategory.status, updatedAt: new Date()} }) 
}
const deleteCategory = async (categoryId: string, hostDb: HostDbClient) => {
    await hostDb.category.delete({ where: { categoryId: categoryId } })
}

const categoryService = {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}
export default categoryService