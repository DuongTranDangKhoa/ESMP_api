import { HostDbClient } from "../../database/dbClient.db";


export class PackageRepository {
    private db: HostDbClient;

    constructor(db: HostDbClient) {
        this.db = db;
    }

    async getAllPackages() {
        return await this.db.renamedpackage.findMany();
    }

    async getPackageById(id: string) {
        return await this.db.renamedpackage.findUnique({
            where: { id },
        });
    }

    async createPackage(data: any) {
        return await this.db.renamedpackage.create({
            data,
        });
    }

    async updatePackage(id: string, data: any) {
        return await this.db.renamedpackage.update({
            where: { id },
            data,
        });
    }

    async deletePackage(id: string) {
        return await this.db.renamedpackage.delete({
            where: { id },
        });
    }
}
