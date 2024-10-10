import { Payment } from './../../../prisma/clients/postgres/hostdb/index.d';
import { HostDbClient } from "../../database/host.db";

const getTransaction = async ( hostDb : HostDbClient ) => {
const transaction = await hostDb.payment.findMany()
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
  try {
    const transaction = await hostDb.payment.create({ data: payment })
    return {message: 'Successfully created transaction'}
  }catch ( e ) {
    return {message: e}
  }
}
const updateTransaction = async ( payment : Payment, hostDb : HostDbClient ) => {
  await hostDb.payment.update({
    where: {
      transactionId_orderId_eventId:{
        transactionId: payment.transactionId,
        orderId: payment.orderId,
        eventId: payment.eventId
      }
    },
    data: payment,
  })
}
const deleteTransaction = async ( transactionId: string, OrderID: string, eventId: string, hostDb : HostDbClient ) => {
  await hostDb.payment.delete({
    where: {
      transactionId_orderId_eventId:{
        transactionId: transactionId,
        orderId: OrderID,
        eventId: eventId
      }
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