import { Transaction } from './../../../prisma/clients/postgres/hostdb/index.d';
import { HostDbClient } from "../../database/host.db";

const getTransaction = async ( hostDb : HostDbClient ) => {
const transaction = await hostDb.transaction.findMany
return transaction
}
const getTransactionById = async (  transactionId: string ,hostDb : HostDbClient ) => {
const transaction = await hostDb.transaction.findMany(
     { where: {transactionId: transactionId}, })
return transaction
}
const transactionService = {
  getTransaction,
  getTransactionById
}

export default transactionService