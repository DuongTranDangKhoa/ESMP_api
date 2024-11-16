import { TrasactionStatus } from "../../common/constant/common.constant";
import { HostDbClient } from "../../database/host.db";

const getTransactionPackage = async ( hostDb: HostDbClient) => {
    const getTransactionPackage = await hostDb.transaction.findMany();
    await hostDb.$disconnect();
    return getTransactionPackage;
}
const createTransactionPackage = async (body: any, hostDb: HostDbClient) => {
    const createTransactionPackage = await hostDb.transaction.create({
        data: {
            hostid: body.hostid,
            packageid: body.packageid,
            status: TrasactionStatus.PENDING,
        },
    });
    await hostDb.$disconnect();
    return createTransactionPackage;
}
const updateTransactionPackage = async (id: string, body: any, hostDb: HostDbClient) => {
  try {
  const updateTransactionPackage = await hostDb.transaction.update({
    where: { id },
    data: { status: body.status },
  });
  return updateTransactionPackage;
} catch (err) {
  console.error("Update failed:", err);
  throw err; // Ném lỗi để dễ dàng debug
}
}
const deleteTransactionPackage = async (id: string, hostDb: HostDbClient) => {
    
    const deleteTransactionPackage = await hostDb.transaction.delete({
        where: {
            id,
        },
    });
    await hostDb.$disconnect();
    return deleteTransactionPackage;
}
const transactionPackageService = {
    getTransactionPackage,
    createTransactionPackage,
    updateTransactionPackage,
    deleteTransactionPackage,
}
export default transactionPackageService;