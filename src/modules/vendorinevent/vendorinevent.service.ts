import { HostDbClient } from "../../database/dbClient.db";
import { DatabaseError } from "../../errors/database.error";
import { VendorInEvent } from "./vendorinevent.schema";

const getVendorInEvent = async (eventId: string, vendorId: string, hostDb: HostDbClient) => {
    try {
        const vendorInEvent = await hostDb.vendorInEvent.findFirst({
            where: {
                eventId,
                vendorId,
            },
        });
        await hostDb.$disconnect();
        return vendorInEvent;
    } catch (err) {
       console.error("Error retrieving Vendor In Event:", err);
        throw new Error('Failed to retrieve Vendor In Event');
    }
};
const getVendorInEventById = async (vendorinevent: string, hostDb: HostDbClient) => {
    try {
        const vendorInEvent = await hostDb.vendorInEvent.findUnique({
            where: {
                vendorinEventId: vendorinevent
            },
        });
        await hostDb.$disconnect();
        return vendorInEvent;
    } catch (err) {
       console.error("Error retrieving Vendor In Event:", err);
        throw new Error('Failed to retrieve Vendor In Event');
    }
};
const createVendorInEvent = async (eventId: string, vendorId: string, hostDb: HostDbClient) => {
    try {
        const vendorInEvent = await hostDb.vendorInEvent.create({
            data: {
            eventId,
            vendorId,
            status: 'accept',
            },
        });
        await hostDb.$disconnect();
        return vendorInEvent;
    } catch (err) {
       console.error("Error retrieving Vendor In Event:", err);
        throw new Error('Failed to retrieve Vendor In Event');
    }
}
const updateVendorInEvent = async (vendorInEventId: string, body: VendorInEvent , hostDb: HostDbClient) => {
    try {
        const vendorInEvent = await hostDb.vendorInEvent.update({
            where: {
              vendorinEventId: vendorInEventId
            },
            data: {
                status: body.status,
            },
        });
        await hostDb.$disconnect();
        return vendorInEvent;
    } catch (err) {
       console.error("Error updating Vendor In Event:", err);
        throw new Error('Failed to update Vendor In Event');
    }
}
const vendorineventservice = {
    getVendorInEvent,
    createVendorInEvent,
    updateVendorInEvent,
    getVendorInEventById
}
export default vendorineventservice;