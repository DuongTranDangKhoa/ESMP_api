import { service } from "../../../prisma/clients/postgres/hostdb";

export type ServiceType =  service
export class ServiceObject {
    serviceId?: string
    eventid?: string
    price: number;
    quantity: number;
    name: string;
    constructor(data: any) {
        this.serviceId = data.serviceId
        this.eventid = data.eventid
        this.quantity = data.quantity
        this.price = data.price
        this.name = data.name
    }
}