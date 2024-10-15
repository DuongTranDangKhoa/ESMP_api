import { HostDbClient } from "../../database/host.db"
import transactionService from "./transaction.service"

export const transactionGroup = (app: any) =>
  app.get('/', async  ({hostDb}: {hostDb: HostDbClient }) => {
    const response = await transactionService.getTransaction(hostDb)
    return response
  })
     .guard('/', (app: any) => 
      app.resolve(
        (context: any) => { 
          return {a: context}
        }
      ).get(
        '/:eventId', 
        async ({eventId, hostDb}: {eventId: string, hostDb: HostDbClient}) => {
          const transaction = await transactionService.getTransactionByEvent(eventId, hostDb)
          return transaction
        },
      )
      .get(
        'order/:orderId',
        async ({orderId, hostDb}: {orderId: string, hostDb: HostDbClient}) => {
          const transaction = await transactionService.getTransactionByOrder(orderId, hostDb)
          return transaction
        },
      )
        .post(
        '/',
        async ({body, hostDb}: {body: any, hostDb: HostDbClient}) => {
          const transaction = await transactionService.createTransaction(body, hostDb)
          return transaction
        },
        )
        .put(
          '/',
          async ({transactionId, body, hostDb}: {transactionId: string, body: any, hostDb: HostDbClient}) => {
            const transaction = await transactionService.updateTransaction(body, hostDb)
            return 'Updated'
          },
        )
        .delete(
           '/:transactionId/:orderId/:eventId',
  async ({
    params: { transactionId, orderId, eventId },
    hostDb,
  }: {
    params: { transactionId: string; orderId: string; eventId: string };
    hostDb: HostDbClient;
  }) => {
    const result = await transactionService.deleteTransaction(transactionId, orderId, eventId, hostDb);
    return 'Deleted';
  }
        )
        )
      
    
