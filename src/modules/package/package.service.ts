import { PackageRepository } from "./package.repo";
import { HostDbClient } from "../../database/dbClient.db";

const getPackage = async (hostDb: HostDbClient) => {
    const repository = new PackageRepository(hostDb);
    return await repository.getAllPackages();
};

const createPackage = async (body: any, hostDb: HostDbClient) => {
    const repository = new PackageRepository(hostDb);
    return await repository.createPackage(body);
};

const updatePackage = async (id: string, body: any, hostDb: HostDbClient) => {
    const repository = new PackageRepository(hostDb);
    return await repository.updatePackage(id, body);
};

const deletePackage = async (id: string, hostDb: HostDbClient) => {
    const repository = new PackageRepository(hostDb);
    return await repository.deletePackage(id);
};

const getPackageById = async (id: string, hostDb: HostDbClient) => {
    const repository = new PackageRepository(hostDb);
    return await repository.getPackageById(id);
};

const packageService = {
    getPackage,
    createPackage,
    updatePackage,
    deletePackage,
    getPackageById,
};

export default packageService;
