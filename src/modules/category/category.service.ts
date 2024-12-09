// src/service/category.service.ts
import { HostDbClient } from "../../database/dbClient.db";
import { Category } from './../../../prisma/clients/postgres/hostdb/index.d';
import { DatabaseError } from "../../errors/database.error";
import * as categoryRepo from "./category.repo";

const getCategory = async (hostId: string, hostDb: HostDbClient) => {
  try {
    const categories = await categoryRepo.getCategory(hostId, hostDb);
    return categories;
  } catch (err: any) {
    throw new DatabaseError("Error fetching categories: " + err.message);
  }
};

const getCategoryById = async (categoryId: string, hostDb: HostDbClient) => {
  try {
    if (!categoryId) {
      throw new Error('Category ID is required');
    }

    const category = await categoryRepo.getCategoryById(categoryId, hostDb);
    if (!category) {
      throw new Error(`Category with ID ${categoryId} does not exist`);
    }

    return category;
  } catch (err: any) {
    throw new DatabaseError("Error fetching category by ID: " + err.message);
  }
};

const createCategory = async (category: Category, hostDb: HostDbClient) => {
  try {
    const newCategory = await categoryRepo.createCategory(category, hostDb);
    return { message: "Category created successfully", data: newCategory };
  } catch (err: any) {
    throw new DatabaseError("Error creating category: " + err.message);
  }
};

const updateCategory = async (categoryId: string, newCategory: Category, hostDb: HostDbClient) => {
  try {
    const updatedCategory = await categoryRepo.updateCategory(categoryId, newCategory, hostDb);
    return { message: "Category updated successfully", data: updatedCategory };
  } catch (err: any) {
    throw new DatabaseError("Error updating category: " + err.message);
  }
};

const deleteCategory = async (categoryId: string, hostDb: HostDbClient) => {
  try {
    const deletedCategory = await categoryRepo.deleteCategory(categoryId, hostDb);
    return { message: "Category deleted successfully", data: deletedCategory };
  } catch (err: any) {
    throw new DatabaseError("Error deleting category: " + err.message);
  }
};

const categoryService = {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
