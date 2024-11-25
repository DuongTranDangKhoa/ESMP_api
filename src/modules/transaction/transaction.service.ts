import { Payment } from './../../../prisma/clients/postgres/hostdb/index.d';
import { HostDbClient } from "../../database/dbClient.db";
import { TransactionObject } from './transaction.schema';

const getTransaction = async ( hostDb : HostDbClient ) => {
const transaction = await hostDb.payment.findMany()
return transaction
}
const getTransactionByOrder = async (  OrderID: string ,hostDb : HostDbClient ) => {
  const transaction = await hostDb.payment.findMany(
     { where: {orderId: OrderID}, })
return transaction
}

const createTransaction = async ( payment : TransactionObject, hostDb : HostDbClient ) => {
  try {
    const transaction = await hostDb.payment.create({ data: payment })
    return {message: 'Successfully created transaction'}
  }catch ( e ) {
    return {message: e}
  }
}
const updateTransaction = async ( payment : Payment, hostDb : HostDbClient ) => {
  await hostDb.payment.updateMany({
    where: {
        paymentId: payment.paymentId,
      },
    data: {
      transactionType: payment.transactionType,
      paymentTime: payment.paymentTime,
      price: payment.price,
      status: payment.status
    }
  })
}
const deleteTransaction = async ( transactionId: string, hostDb : HostDbClient ) => {
  await hostDb.payment.deleteMany({
    where: {
        paymentId: transactionId,
      },
  })
}
const transactionService = {
  getTransaction,
  getTransactionByOrder,
  createTransaction,
  updateTransaction,
  deleteTransaction,
}

export default transactionService