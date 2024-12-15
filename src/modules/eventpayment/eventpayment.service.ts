import { Decimal } from "@prisma/client/runtime/library";
import { HostDbClient } from "../../database/dbClient.db";
import { EventPaymentObject, EventPaymentType, EventPaymentVendorObject } from "./eventpayment.shema";
import eventpaymentRepo from "./eventpayment.repo"; // Import the repository
import { VendorInEventRepository } from "../vendorinevent/vendorinevent.repo";
import { vendorRepository } from "../vendor/vendor.repo";
import { mapRepo } from "../map/map.repo";
import { LocationType } from "../../../prisma/prismabox/postgres/hostdb/LocationType";
const getEventPaymentInLocation = async (locationId: string, hostdb: HostDbClient) => {
    const vendorInEventRepo = new VendorInEventRepository(hostdb);
    const eventPaymentInfo = await eventpaymentRepo.getEventPaymentByLocationId(locationId, hostdb);

    if (eventPaymentInfo.length === 0) {
       throw new Error('Location is not booked or Location of status is Available ' );
    }

    const vendorInEvent = await vendorInEventRepo.getVendorInEventById(eventPaymentInfo[0].vendorinEventId);
    const location = await mapRepo.findLocationbyLocationId(eventPaymentInfo[0].locationId, hostdb);
    if (!location){
        throw new Error('Location not found');
    }
    const locationType = await mapRepo.getLocationTypeByID(location?.typeId, hostdb);
    if (vendorInEvent) {
        return { vendor: (await vendorRepository.getVendorById( vendorInEvent.vendorId, hostdb)).name,
                 name: locationType?.typeName,
                 status: location.status, 
                 price: locationType?.price,
        }
    } else {
         throw new Error('Location is not booked or Location of status is Available ' );
    }
};
const getEventPaymentInVendorId = async (vendorinEventId: string, hostdb: HostDbClient) => {
    const eventPaymentInfo = await eventpaymentRepo.getEventPaymentByVendorInEvent(vendorinEventId, hostdb);
    if (eventPaymentInfo.length === 0) {
        throw new Error('Vendor In Event not found');
    }
    const location = await mapRepo.findLocationbyLocationId(eventPaymentInfo[0].locationId, hostdb);
    return {
        locationId: location?.locationId,
        typeId: location?.typeId
    };
}   
const getEventPaymentInEvent = async (eventId: string, hostdb: HostDbClient) => {
    if (!eventId) {
        throw new Error('eventId ID is required');
    }

    try {
        const vendorInEvent = await eventpaymentRepo.getVendorInEvent(eventId, hostdb);
        if (vendorInEvent.length === 0) return [];

        const vendorInEventIds = vendorInEvent.map(v => v.vendorinEventId);
        const eventPayments = await eventpaymentRepo.getEventPaymentsByVendorInEventIds(vendorInEventIds, hostdb);

        const locationIds = eventPayments.map(ep => ep.locationId);
        const locations = await eventpaymentRepo.getLocationsByIds(locationIds, hostdb);

        const locationTypeIds = locations.map(loc => loc.typeId);
        const locationTypes = await eventpaymentRepo.getLocationTypesByIds(locationTypeIds, hostdb);

        const vendorIds = vendorInEvent.map(v => v.vendorId);
        const vendors = await eventpaymentRepo.getVendorsByIds(vendorIds, hostdb);

        const accountIds = vendors.map(v => v.userid);
        const accounts = await eventpaymentRepo.getAccountsByVendorIds(accountIds, hostdb);

        const eventIds = vendorInEvent.map(v => v.eventId);
        const events = await eventpaymentRepo.getEventsByIds(eventIds, hostdb);

        const formatDate = (date: Date | null): Date | null => {
            if (!date) return null;
            return new Date(date.toISOString().split('T')[0]);
        };

        const paymentPromises = eventPayments.map(async (eventPayment) => {
            const location = locations.find(loc => loc.locationId === eventPayment.locationId);
            const locationType = location ? locationTypes.find(locType => locType.typeId === location.typeId) : null;
            const event = events.find(e => e.eventId === vendorInEvent.find(v => v.vendorinEventId === eventPayment.vendorinEventId)?.eventId);
            const vendorInEventItem = vendorInEvent.find(v => v.vendorinEventId === eventPayment.vendorinEventId);
            const vendorId = vendorInEventItem ? vendorInEventItem.vendorId : null;
            const vendorItem = vendorId ? vendors.find(v => v.vendorId === vendorId) : null;
            const account = vendorItem ? accounts.find(a => a.id === vendorItem.userid) : null;

            const paymentValue = new EventPaymentObject(
                eventPayment.eventPaymentid,
                vendorItem?.vendorId,
                locationType?.typeName ?? "Default Location Name",
                account?.name ?? "Default Name",
                formatDate(eventPayment.depositPaymentDate),
                eventPayment.deposit ?? new Decimal(0),
                eventPayment.total ?? new Decimal(0),
                eventPayment.totalPaymentDate ?? null,
                eventPayment.status ?? "Pending Deposit"
            );

            return paymentValue;
        });

        const payment = await Promise.all(paymentPromises);
        return payment;
        
    } catch (error) {
        throw new Error('Error getting event payment in event: ' + error);
    }
};

const getEventPaymentInVendor = async (vendorId: string, hostdb: HostDbClient) => {
    if (!vendorId) {
        throw new Error('Vendor ID is required');
    }

    try {
        const vendorInEvent = await eventpaymentRepo.getVendor(vendorId, hostdb);
        if (vendorInEvent.length === 0) return [];

        const vendorInEventIds = vendorInEvent.map(v => v.vendorinEventId);
        const eventPayments = await eventpaymentRepo.getEventPaymentsByVendorInEventIds(vendorInEventIds, hostdb);

        const locationIds = eventPayments.map(ep => ep.locationId);
        const locations = await eventpaymentRepo.getLocationsByIds(locationIds, hostdb);

        const locationTypeIds = locations.map(loc => loc.typeId);
        const locationTypes = await eventpaymentRepo.getLocationTypesByIds(locationTypeIds, hostdb);

        const vendor = await eventpaymentRepo.getVendorsByIds([vendorId], hostdb);
        const account = vendor.length > 0 ? await eventpaymentRepo.getAccountsByVendorIds([vendor[0].userid], hostdb) : [];

        const eventIds = vendorInEvent.map(v => v.eventId);
        const events = await eventpaymentRepo.getEventsByIds(eventIds, hostdb);

        const formatDate = (date: Date | null): Date | null => {
            if (!date) return null;
            return new Date(date.toISOString().split('T')[0]);
        };

        const paymentPromises = eventPayments.map(async (eventPayment) => {
            const location = locations.find(loc => loc.locationId === eventPayment.locationId);
            const locationType = location ? locationTypes.find(locType => locType.typeId === location.typeId) : null;
            const event = events.find(e => e.eventId === vendorInEvent.find(v => v.vendorinEventId === eventPayment.vendorinEventId)?.eventId);

            const paymentValue = new EventPaymentVendorObject(
                eventPayment.eventPaymentid,
                locationType?.typeName ?? "Default Location Name",
                event?.name ?? "Default Name",
                formatDate(eventPayment.depositPaymentDate),
                eventPayment.deposit ?? new Decimal(0),
                eventPayment.total ?? new Decimal(0),
                eventPayment.totalPaymentDate ?? null,
                eventPayment.status ?? "Pending Deposit"
            );

            return paymentValue;
        });

        const payment = await Promise.all(paymentPromises);
        return payment;

    } catch (error) {
        throw new Error('Error getting event payment in event: ' + error);
    }
};

const createEventPayment = async (body: any, hostdb: HostDbClient) => {
    try {
        const vendorInEventRepo = new VendorInEventRepository(hostdb);
        const vd = await vendorInEventRepo.getVendorInEventById(body.vendorinEventId);
        if (vd) {
            const event = await hostdb.event.findUnique({
            where: { eventId: vd.eventId }
        })
        
        const eventpayment = await eventpaymentRepo.createEventPayment({
            locationId: body.locationId,
            deposit: event?.deposit,
            vendorinEventId: body.vendorinEventId,
            total: body.total,
            depositPaymentDate: new Date(),
            totalPaymentDate: new Date()
        }, hostdb);

        return {
            message: 'Event payment created successfully',
            id: eventpayment.eventPaymentid
        };
    }else{
        throw new Error('Vendor In Event not found');
    }
    } catch (error) {
        throw new Error('Location is Booked');
    }
};

const updateEventPayment = async (vendorInEventId: string, body: any, hostdb: HostDbClient) => {
    if (!vendorInEventId) {
        throw new Error('vendorInEventId is required');
    }

    try {
        await eventpaymentRepo.updateEventPayment(vendorInEventId, {
            status: body.status,
            totalPaymentDate: new Date()
        }, hostdb);

        return { message: 'Event payment updated successfully' };
    } catch (error) {
        throw new Error('Error updating event payment in event: ' + error);
    }
};
const updateEventPaymentByid = async (id: string , body: any, hostdb: HostDbClient) => {
    if (!id) {
        throw new Error('id is required');
    }
    try {
        await eventpaymentRepo.updateEventPaymentByid(id, {
            status: body.status,
            totalPaymentDate: new Date()
        }, hostdb);
        return { message: 'Event payment updated successfully' };
    } catch (error) {
        throw new Error('Error updating event payment in event: ' + error);
    }
}
const deleteEventPayment = async (vendorInEventId: string, hostdb: HostDbClient) => {
    if (!vendorInEventId) {
        throw new Error('vendorInEventId is required');
    }

    try {
        await eventpaymentRepo.deleteEventPayment(vendorInEventId, hostdb);
        return { message: 'Event payment deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting event payment in event: ' + error);
    }
};

const eventpaymentService = {
    getEventPaymentInEvent,
    getEventPaymentInLocation,
    getEventPaymentInVendorId,
    getEventPaymentInVendor,
    createEventPayment,
    updateEventPayment,
    updateEventPaymentByid,
    deleteEventPayment
};

export default eventpaymentService;
