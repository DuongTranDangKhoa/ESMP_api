
import { HostDbClient } from "../../database/dbClient.db";
import { ServiceObject } from "./service.schema";

export const getService = async (eventid: string, hostDb: HostDbClient) => {
  return await hostDb.service.findMany({ where: { eventid } });
};

export const createService = async (eventid: string, inputData: ServiceObject, hostDb: HostDbClient) => {
  return await hostDb.service.create({
    data: {
      eventid,
      name: inputData.name,
      price: inputData.price,
      quantity: inputData.quantity,
    },
  });
};

export const updateService = async (serviceId: string, inputData: ServiceObject, hostDb: HostDbClient) => {
  return await hostDb.service.update({
    where: { id: serviceId },
    data: {
      name: inputData.name,
      price: inputData.price,
      quantity: inputData.quantity,
    },
  });
};

export const deleteService = async (serviceId: string, hostDb: HostDbClient) => {
  return await hostDb.service.delete({
    where: { id: serviceId },
  });
};

