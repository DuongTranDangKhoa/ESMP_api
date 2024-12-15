// src/repository/category.repo.ts
import { HostDbClient } from "../../database/dbClient.db";
import { Category } from './../../../prisma/clients/postgres/hostdb/index.d';

export const getCategory = async (hostId: string, hostDb: HostDbClient) => {
  return await hostDb.category.findMany({
    where: { hostid: hostId },
  });
};

export const getCategoryById = async (categoryId: string, hostDb: HostDbClient) => {
  return await hostDb.category.findUnique({
    where: { categoryId },
  });
};

export const createCategory = async (category: Category, hostDb: HostDbClient) => {
  return await hostDb.category.create({
    data: {
      categoryName: category.categoryName,
      hostid: category.hostid,
      status: category.status,
    },
  });
};

export const updateCategory = async (categoryId: string, newCategory: Category, hostDb: HostDbClient) => {
  return await hostDb.category.update({
    where: { categoryId },
    data: {
      categoryName: newCategory.categoryName,
      status: newCategory.status,
      updatedAt: new Date(),
    },
  });
};

export const deleteCategory = async (categoryId: string, hostDb: HostDbClient) => {
  return await hostDb.category.delete({
    where: { categoryId },
  });
};
