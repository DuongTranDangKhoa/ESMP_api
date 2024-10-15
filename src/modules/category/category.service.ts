import { HostDbClient } from '../../database/host.db';
import { Category } from './../../../prisma/clients/postgres/hostdb/index.d';
const getCategory = async ( hostDb: HostDbClient) => {
return await hostDb.category.findMany()
}

const getCategoryById = async (categoryId: string, hostDb: HostDbClient) => {
return await hostDb.category.findMany({ where: { categoryId: categoryId } })
}
const createCategory = async (category: Category, hostDb: HostDbClient) => {
    await hostDb.category.create({ data: category })
}

const updateCategory = async (categoryId: string, newCategory: Category, hostDb: HostDbClient) => {
    await hostDb.category.update({ where: { categoryId: categoryId }, data: newCategory })
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