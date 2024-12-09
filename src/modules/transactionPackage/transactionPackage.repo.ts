
import { HostDbClient } from "../../database/dbClient.db";
import { TrasactionStatus } from "../../common/constant/common.constant";

export const getTransactionPackage = async (hostDb: HostDbClient) => {
  return await hostDb.transaction.findMany();
};

export const createTransactionPackage = async (body: any, hostDb: HostDbClient) => {
  return await hostDb.transaction.create({
    data: {
      hostid: body.hostid,
      packageid: body.packageid,
      status: TrasactionStatus.PENDING,
    },
  });
};

export const updateTransactionPackage = async (id: string, body: any, hostDb: HostDbClient) => {
  return await hostDb.transaction.update({
    where: { id },
    data: { status: body.status },
  });
};

export const deleteTransactionPackage = async (id: string, hostDb: HostDbClient) => {
  return await hostDb.transaction.delete({
    where: { id },
  });
};
