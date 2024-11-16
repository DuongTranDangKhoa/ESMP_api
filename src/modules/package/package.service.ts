import { HostDbClient } from "../../database/host.db";

const getPackage =  async (hostDb: HostDbClient) => {
    const getPackage = await hostDb.renamedpackage.findMany();
    await hostDb.$disconnect();
    return getPackage;
}
const createPackage = async (body: any, hostDb: HostDbClient) => {
    const createPackage = await hostDb.renamedpackage.create({
        data: body,
    });
    await hostDb.$disconnect();
    return createPackage;
}
const updatePackage = async (id: string, body: any, hostDb: HostDbClient) => {
    const updatePackage = await hostDb.renamedpackage.update({
        where: {
            id,
        },
        data: body,
    });
    await hostDb.$disconnect();
    return updatePackage;
}
const deletePackage = async (id: string, hostDb: HostDbClient) => {
    const deletePackage = await hostDb.renamedpackage.delete({
        where: {
            id,
        },
    });
    await hostDb.$disconnect();
    return deletePackage;
}
const getPackageById = async (id: string, hostDb: HostDbClient) => {
    const getPackageById = await hostDb.renamedpackage.findUnique({
        where: {
            id,
        },
    });
    await hostDb.$disconnect();
    return getPackageById;
}
const packageService = {
    getPackage,
    createPackage,
    updatePackage,
    deletePackage,
    getPackageById,
};
export default packageService;