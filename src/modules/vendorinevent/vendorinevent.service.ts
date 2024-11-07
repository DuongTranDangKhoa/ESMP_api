import { HostDbClient } from "../../database/host.db";
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
const createVendorInEvent = async (eventId: string, vendorId: string, hostDb: HostDbClient) => {
    try {
        const vendorInEvent = await hostDb.vendorInEvent.create({
            data: {
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
}
const updateVendorInEvent = async (body: VendorInEvent , hostDb: HostDbClient) => {
    try {
        const vendorInEvent = await hostDb.vendorInEvent.updateMany({
            where: {
               eventId: body.eventId,
               vendorId: body.vendorId,
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
    updateVendorInEvent
}
export default vendorineventservice;