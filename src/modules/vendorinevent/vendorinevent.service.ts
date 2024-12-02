// vendorInEvent.service.ts
import { VendorInEventRepository } from "./vendorinevent.repo";
import { HostDbClient } from "../../database/dbClient.db";
import { VendorInEvent } from "./vendorinevent.schema";

const getVendorInEvent = async (eventId: string, vendorId: string, hostDb: HostDbClient) => {
    const vendorInEventRepo = new VendorInEventRepository(hostDb);
    try {
        const vendorInEvent = await vendorInEventRepo.getVendorInEvent(eventId, vendorId);
        return vendorInEvent;
    } catch (err) {
        console.error("Error retrieving Vendor In Event:", err);
        throw new Error('Failed to retrieve Vendor In Event');
    }
};

const getVendorInEventById = async (vendorInEventId: string, hostDb: HostDbClient) => {
    const vendorInEventRepo = new VendorInEventRepository(hostDb);
    try {
        const vendorInEvent = await vendorInEventRepo.getVendorInEventById(vendorInEventId);
        return vendorInEvent;
    } catch (err) {
        console.error("Error retrieving Vendor In Event:", err);
        throw new Error('Failed to retrieve Vendor In Event');
    }
};

const createVendorInEvent = async (eventId: string, vendorId: string, hostDb: HostDbClient) => {
    const vendorInEventRepo = new VendorInEventRepository(hostDb);
    try {
        const vendorInEvent = await vendorInEventRepo.createVendorInEvent(eventId, vendorId);
        return vendorInEvent;
    } catch (err) {
        console.error("Error creating Vendor In Event:", err);
        throw new Error('Failed to create Vendor In Event');
    }
};

const updateVendorInEvent = async (vendorInEventId: string, body: VendorInEvent, hostDb: HostDbClient) => {
    const vendorInEventRepo = new VendorInEventRepository(hostDb);
    try {
        if (!body.status) {
            throw new Error('Status is required');
        }
        const vendorInEvent = await vendorInEventRepo.updateVendorInEvent(vendorInEventId, body.status);
        return vendorInEvent;
    } catch (err) {
        console.error("Error updating Vendor In Event:", err);
        throw new Error('Failed to update Vendor In Event');
    }
};

const deleteVendorInEvent = async (vendorInEventId: string, hostDb: HostDbClient) => {
    const vendorInEventRepo = new VendorInEventRepository(hostDb);
    try {
        await vendorInEventRepo.deleteVendorInEvent(vendorInEventId);
    } catch (err) {
        console.error("Error deleting Vendor In Event:", err);
        throw new Error('Failed to delete Vendor In Event');
    }
};

const countEventByMostVendor = async (hostId: string, hostDb: HostDbClient) => {
    const vendorInEventRepo = new VendorInEventRepository(hostDb);
    try {
        const vendorInEvent = await vendorInEventRepo.countEventByMostVendor(hostId);
        return vendorInEvent;
    } catch (err) {
        console.error("Error retrieving Vendor In Event:", err);
        throw new Error('Failed to retrieve Vendor In Event');
    }
};

const vendorInEventService = {
    getVendorInEvent,
    createVendorInEvent,
    updateVendorInEvent,
    getVendorInEventById,
    deleteVendorInEvent,
    countEventByMostVendor
};

export default vendorInEventService;
