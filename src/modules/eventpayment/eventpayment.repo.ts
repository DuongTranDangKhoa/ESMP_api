import { HostDbClient } from "../../database/dbClient.db";
import { EventPaymentObject } from "./eventpayment.shema";

const getVendorInEvent = async (eventId: string, hostdb: HostDbClient) => {
    return await hostdb.vendorInEvent.findMany({
        where: { eventId }
    });
};
const getEventPaymentByLocationId = async (locationId: string, hostdb: HostDbClient) => {
    return await hostdb.eventPayment.findMany({
        where: {
            locationId,
             AND: [
                { status: { not: 'Refunding Deposit' } },
                { status: { not: 'Finished' } }
            ]
        }
    });
};
const getEventPaymentByVendorInEvent = async (vendorinEventId: string, hostdb: HostDbClient) => {
    return await hostdb.eventPayment.findMany({
        where: {
            vendorinEventId,
             AND: [
                { status: { not: 'Refunding Deposit' } },
                { status: { not: 'Finished' } }
            ]
        }
    });
};
const getVendor = async (vendorId: string, hostdb: HostDbClient) => {
    return await hostdb.vendorInEvent.findMany({
        where: { vendorId }
    });
};
const countVendor = async (vendorinEventId: string, hostdb: HostDbClient)  => {
    return await hostdb.eventPayment.count({
        where: { vendorinEventId,
            status:  'Finished'
         }
    });
}
const getEventPaymentsByVendorInEventIds = async (vendorInEventIds: string[], hostdb: HostDbClient) => {
    return await hostdb.eventPayment.findMany({
        where: { vendorinEventId: { in: vendorInEventIds } }
    });
};

const getLocationsByIds = async (locationIds: string[], hostdb: HostDbClient) => {
    return await hostdb.location.findMany({
        where: { locationId: { in: locationIds } }
    });
};

const getLocationTypesByIds = async (typeIds: string[], hostdb: HostDbClient) => {
    return await hostdb.locationType.findMany({
        where: { typeId: { in: typeIds } }
    });
};

const getVendorsByIds = async (vendorIds: string[], hostdb: HostDbClient) => {
    return await hostdb.vendor.findMany({
        where: { vendorId: { in: vendorIds } }
    });
};

const getAccountsByVendorIds = async (vendorIds: string[], hostdb: HostDbClient) => {
    return await hostdb.account.findMany({
        where: { id: { in: vendorIds } }
    });
};

const getEventsByIds = async (eventIds: string[], hostdb: HostDbClient) => {
    return await hostdb.event.findMany({
        where: { eventId: { in: eventIds } }
    });
};

const createEventPayment = async (data: any, hostdb: HostDbClient) => {
    return await hostdb.eventPayment.create({
        data
    });
};

const updateEventPayment = async (vendorInEventId: string, data: any, hostdb: HostDbClient) => {
    return await hostdb.eventPayment.updateMany({
        where: { vendorinEventId: vendorInEventId },
        data
    });
};

const deleteEventPayment = async (vendorInEventId: string, hostdb: HostDbClient) => {
    return await hostdb.eventPayment.deleteMany({
        where: { vendorinEventId: vendorInEventId }
    });
};

const eventpaymentRepo = {
    getVendorInEvent,
    getEventPaymentByLocationId,
    getEventPaymentByVendorInEvent,
    getVendor,
    countVendor,
    getEventPaymentsByVendorInEventIds,
    getLocationsByIds,
    getLocationTypesByIds,
    getVendorsByIds,
    getAccountsByVendorIds,
    getEventsByIds,
    createEventPayment,
    updateEventPayment,
    deleteEventPayment
};

export default eventpaymentRepo;
