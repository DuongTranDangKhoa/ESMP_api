
import { HostDbClient } from "../../database/dbClient.db";
import { Payment } from './../../../prisma/clients/postgres/hostdb/index.d';
import { DatabaseError } from "../../errors/database.error";
import { TransactionObject } from './transaction.schema';
import * as transactionRepo from "./transaction.repo";

const getTransaction = async (hostDb: HostDbClient) => {
  try {
    const transactions = await transactionRepo.getTransaction(hostDb);
    return transactions;
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const getTransactionByOrder = async (orderId: string, hostDb: HostDbClient) => {
  try {
    const transaction = await transactionRepo.getTransactionByOrder(orderId, hostDb);
    if (!transaction || transaction.length === 0) {
      throw new Error("Transaction not found for this order.");
    }
    return transaction;
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const createTransaction = async (payment: TransactionObject, hostDb: HostDbClient) => {
  try {
    const response = await transactionRepo.createTransaction(payment, hostDb);
    return { message: "Successfully created transaction", data: response };
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const updateTransaction = async (payment: Payment, hostDb: HostDbClient) => {
  try {
    const response = await transactionRepo.updateTransaction(payment, hostDb);
    return { message: "Successfully updated transaction", data: response };
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const deleteTransaction = async (transactionId: string, hostDb: HostDbClient) => {
  try {
    const response = await transactionRepo.deleteTransaction(transactionId, hostDb);
    return { message: "Successfully deleted transaction", data: response };
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const transactionService = {
  getTransaction,
  getTransactionByOrder,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};

export default transactionService;
