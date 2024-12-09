
import { HostDbClient } from "../../database/dbClient.db";
import { DatabaseError } from "../../errors/database.error";
import * as transactionPackageRepo from "./transactionPackage.repo";

const getTransactionPackage = async (hostDb: HostDbClient) => {
  try {
    const transactions = await transactionPackageRepo.getTransactionPackage(hostDb);
    return transactions;
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const createTransactionPackage = async (body: any, hostDb: HostDbClient) => {
  try {
    const transactionPackage = await transactionPackageRepo.createTransactionPackage(body, hostDb);
    return { message: "Transaction package successfully created", data: transactionPackage };
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const updateTransactionPackage = async (id: string, body: any, hostDb: HostDbClient) => {
  try {
    const updatedPackage = await transactionPackageRepo.updateTransactionPackage(id, body, hostDb);
    return { message: "Transaction package successfully updated", data: updatedPackage };
  } catch (err: any) {
    throw new DatabaseError("Error updating transaction package: " + err.message);
  }
};

const deleteTransactionPackage = async (id: string, hostDb: HostDbClient) => {
  try {
    const deletedPackage = await transactionPackageRepo.deleteTransactionPackage(id, hostDb);
    return { message: "Transaction package successfully deleted", data: deletedPackage };
  } catch (err: any) {
    throw new DatabaseError("Error deleting transaction package: " + err.message);
  }
};

const transactionPackageService = {
  getTransactionPackage,
  createTransactionPackage,
  updateTransactionPackage,
  deleteTransactionPackage,
};

export default transactionPackageService;
