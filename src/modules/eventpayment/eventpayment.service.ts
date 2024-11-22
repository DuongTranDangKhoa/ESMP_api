import { Decimal } from "@prisma/client/runtime/library";
import { HostDbClient } from "../../database/dbClient.db";
import { EventPaymentObject, EventPaymentType } from "./eventpayment.shema";
import vendorineventservice from "../vendorinevent/vendorinevent.service";

const getEventPaymentInEvent = async (eventId: string,  hostdb: HostDbClient) => {
    if(!eventId) {
        throw new Error('Event ID is required');
    }
    try {
        // console.log(eventId, "Event");
        const vendorInEvent = await hostdb.vendorInEvent.findMany({
            where: {
                eventId
            }
         });
        //  console.log(vendorInEvent, "vendorInEvent");
         let payment: EventPaymentObject[] = [];
         for(const vendorEvent of vendorInEvent) {
         const eventPayment = await hostdb.eventPayment.findUnique({
            where: {
                vendorinEventId: vendorEvent.vendorinEventId
            }
        });
        // console.log(eventPayment, "eventPayment");
        if(eventPayment) {
        const location = await hostdb.location.findUnique({
            where: {
                locationId: eventPayment?.locationId
            }
        });
        // console.log(location, "location");
        const locationType = await hostdb.locationType.findUnique({
            where: {
                typeId: location?.typeId
            }
        });
        // console.log(locationType, "locationType");
        const vendor = await hostdb.vendor.findUnique({
            where: {
                vendorId: vendorEvent.vendorId
            }
        });
        // console.log(vendor, "vendor");
        const account = await hostdb.account.findUnique({
            where: {
                id: vendor?.userid
            }
        });
        // console.log(account, "account");
        const event = await hostdb.event.findUnique({
            where: {
                eventId
            }
        });
        // console.log(event, "event");
        const paymentValue = new EventPaymentObject(
  eventPayment.eventPaymentid,
  locationType?.typeName ?? "Default Location Name",
  account?.name ?? "Default Name",
  eventPayment.depositPaymentDate,
  eventPayment.deposit ?? new Decimal(0), // Xử lý null thành giá trị mặc định
  eventPayment.total ?? new Decimal(0), // Xử lý null thành giá trị mặc định
  event?.profit ?? new Decimal(0),
  eventPayment.totalPaymentDate ?? null,
  eventPayment.status ?? "Pending Deposit"
);
        payment.push(paymentValue);
    }
        return payment;
    } 
    
     }catch (error) {   
        throw new Error('Error getting event payment in event: ' + error);
    } 
}
const createEventPayment = async ( body: any ,hostdb: HostDbClient) => {
    try {
           const eventpayment = await  hostdb.eventPayment.create({
                data: {
                    locationId: body.locationId,
                    deposit: body.deposit,
                    vendorinEventId: body.vendorinEventId,
                    depositPaymentDate: new Date(), 
                }
            }) 
        return {
            message: 'Event payment created successfully',
            id: eventpayment.eventPaymentid
        };
    } catch (error) {   
        throw new Error('Location is Booked');
    } 
}
const updateEventPayment = async (vendorInEventId: string, body: any ,hostdb: HostDbClient) => {
    if(!vendorInEventId) {
        throw new Error('vendorInEventId is required');
    }

    try {
        const vd = await hostdb.vendorInEvent.findUnique({
            where: {
                vendorinEventId: vendorInEventId
            }
        });
        if(!vd) {
            throw new Error('Vendor In Event not found');
        }
        const event = await hostdb.event.findUnique({
            where: {
                eventId: vd.eventId
            }
        });
        const eventpayment = await hostdb.eventPayment.findUnique({
            where: {
                vendorinEventId: vendorInEventId
            }
        });
        const totalprofit = 
  (((Number(body.totalrevenue) || 0) + (Number(eventpayment?.deposit) || 0)) * (Number(event?.profit) || 1)) / 100;
        const updateeventpayment = await hostdb.eventPayment.update({
            where: {
                vendorinEventId: vendorInEventId
            },
            data: {
               total: totalprofit,
               totalPaymentDate: new Date(),
                status: body.status,
            }
        })
        return {
            message: 'Event payment updated successfully',
            id: updateeventpayment.eventPaymentid
        };
    } catch (error) {   
        throw new Error('Error updating event payment in event: ' + error);
    }
}
const deleteEvetPayment = async (vendorInEventId: string, hostdb: HostDbClient) => {
if(!vendorInEventId) {
        throw new Error('vendorInEventId is required');
    }
    try {
        await hostdb.eventPayment.delete({
            where: {
                vendorinEventId: vendorInEventId
            }
        })
        return {
            message: 'Event payment deleted successfully',
        };
    } catch (error) {   
        throw new Error('Error deleting event payment in event: ' + error);
    }
}
const eventpaymentService = {
    getEventPaymentInEvent,
    createEventPayment,
    updateEventPayment,
    deleteEvetPayment
}
export default eventpaymentService