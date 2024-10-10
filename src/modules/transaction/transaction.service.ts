import { Payment } from './../../../prisma/clients/postgres/hostdb/index.d';
import { HostDbClient } from "../../database/host.db";

const getTransaction = async ( hostDb : HostDbClient ) => {
const transaction = await hostDb.payment.findMany
return transaction
}
const getTransactionByOrder = async (  OrderID: string ,hostDb : HostDbClient ) => {
const transaction = await hostDb.payment.findMany(
     { where: {orderId: OrderID}, })
return transaction
}
const getTransactionByEvent = async ( eventId: string, hostDb : HostDbClient ) => {
const transaction = await hostDb.payment.findMany( { where: {eventId: eventId}})
return transaction 
}
const createTransaction = async ( payment : Payment, hostDb : HostDbClient ) => {
const transaction = await hostDb.payment.create({ data: payment })
}
const updateTransaction = async ( transactionId: string, payment : Payment, hostDb : HostDbClient ) => {
  await hostDb.payment.updateMany({
    where: {
      transactionId
    },
    data: payment,
  })
}
const deleteTransaction = async ( transactionId: string, hostDb : HostDbClient ) => {
  await hostDb.payment.deleteMany({
    where: {
      transactionId
    },
  })
}
const transactionService = {
  getTransaction,
  getTransactionByOrder,
  getTransactionByEvent,
  createTransaction,
  updateTransaction,
  deleteTransaction,
}

export default transactionService