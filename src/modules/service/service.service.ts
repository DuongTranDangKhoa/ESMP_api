
import { HostDbClient } from "../../database/dbClient.db";
import { DatabaseError } from "../../errors/database.error";
import { ServiceObject } from "./service.schema";
import * as serviceRepo from "./service.repo";

const getService = async (eventid: string, hostDb: HostDbClient) => {
  try {
    const service = await serviceRepo.getService(eventid, hostDb);
    const serviceList = service.map((service) => new ServiceObject(service));
    return serviceList;
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const createService = async (eventid: string, inputData: ServiceObject, hostDb: HostDbClient) => {
  try {
    await serviceRepo.createService(eventid, inputData, hostDb);
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const updateService = async (serviceId: string, inputData: ServiceObject, hostDb: HostDbClient) => {
  try {
    await serviceRepo.updateService(serviceId, inputData, hostDb);
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const deleteService = async (serviceId: string, hostDb: HostDbClient) => {
  try {
    await serviceRepo.deleteService(serviceId, hostDb);
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const serviceService = {
  getService,
  createService,
  updateService,
  deleteService,
};

export default serviceService;
