import { debuggingGroup } from './../debug/index';
import { HostDbClient } from "../../database/host.db";
import { DatabaseError } from "../../errors/database.error";
import { ServiceObject } from "./service.schema";

const getService = async (eventid: string, hostDb: HostDbClient) => {
    try {
    const service = await hostDb.service.findMany({ where: { eventid: eventid } });
    const serviceList = service.map((service) => new ServiceObject(service));
     await hostDb.$disconnect();
    return serviceList
    } catch (err: any) {
    throw new DatabaseError(err.message);
    }
}
const createService = async (eventid: string, inputData: ServiceObject, hostDb: HostDbClient) => {
    try {
    await hostDb.service.create({ data: {
        eventid: eventid,
        name: inputData.name,
        price: inputData.price,
        quantity: inputData.quantity,
    } })
    await hostDb.$disconnect();
    } catch (err: any) {
    throw new DatabaseError(err.message);
    }
}
const updateService = async (serviceId: string, inputData: ServiceObject, hostDb: HostDbClient) => {
    try {
    await hostDb.service.update({ where: { id: serviceId }, data: {
        name: inputData.name,
        price: inputData.price,
        quantity: inputData.quantity,
    } })
    await hostDb.$disconnect();
    } catch (err: any) {
    throw new DatabaseError(err.message);
    }
}
const deleteService = async (serviceId: string, hostDb: HostDbClient) => {
    try {
    await hostDb.service.delete({ where: { id: serviceId } })
    await hostDb.$disconnect();
    } catch (err: any) {
    throw new DatabaseError(err.message);
    }
}
 const serviceService = {
    getService,
    createService,
    updateService,
    deleteService,
}
export default serviceService;