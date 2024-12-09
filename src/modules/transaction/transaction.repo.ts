
import { HostDbClient } from "../../database/dbClient.db";
import { Payment } from './../../../prisma/clients/postgres/hostdb/index.d';
import { TransactionObject } from './transaction.schema';

export const getTransaction = async (hostDb: HostDbClient) => {
  return await hostDb.payment.findMany();
};

export const getTransactionByOrder = async (orderId: string, hostDb: HostDbClient) => {
  return await hostDb.payment.findMany({
    where: { orderId },
  });
};

export const createTransaction = async (payment: TransactionObject, hostDb: HostDbClient) => {
  return await hostDb.payment.create({
    data: payment,
  });
};

export const updateTransaction = async (payment: Payment, hostDb: HostDbClient) => {
  return await hostDb.payment.updateMany({
    where: { paymentId: payment.paymentId },
    data: {
      transactionType: payment.transactionType,
      paymentTime: payment.paymentTime,
      price: payment.price,
      status: payment.status,
    },
  });
};

export const deleteTransaction = async (transactionId: string, hostDb: HostDbClient) => {
  return await hostDb.payment.deleteMany({
    where: { paymentId: transactionId },
  });
};
