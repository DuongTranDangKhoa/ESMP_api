// vendorInEvent.repository.ts
import { HostDbClient } from "../../database/dbClient.db";
import { VendorInEvent } from "./vendorinevent.schema";

export class VendorInEventRepository {
    private hostDb: HostDbClient;

    constructor(hostDb: HostDbClient) {
        this.hostDb = hostDb;
    }

    async getVendorInEvent(eventId: string, vendorId: string) {
        return this.hostDb.vendorInEvent.findFirst({
            where: { eventId, vendorId },
        });
    }

    async getVendorInEventById(vendorinEventId: string) {
        return this.hostDb.vendorInEvent.findUnique({
            where: { vendorinEventId },
        });
    }

    async createVendorInEvent(eventId: string, vendorId: string) {
        return this.hostDb.vendorInEvent.create({
            data: {
                eventId,
                vendorId,
                status: 'accept',
            },
        });
    }

    async updateVendorInEvent(vendorinEventId: string, status: string) {
        return this.hostDb.vendorInEvent.update({
            where: { vendorinEventId },
            data: { status },
        });
    }

    async deleteVendorInEvent(vendorinEventId: string) {
        return this.hostDb.vendorInEvent.delete({
            where: { vendorinEventId },
        });
    }

    async countEventByMostVendor(hostId: string) {
        return this.hostDb.vendorInEvent.findMany({
            where: {
                event: { hostId },
            },
        });
    }
}
