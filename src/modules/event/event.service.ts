import { eventRepo } from './event.repo';
import { EventObject } from './event.schema';
import { HostDbClient } from '../../database/dbClient.db';
import { EventStatus } from '../../common/constant/common.constant';

const getAllEvent = async (hostId: string, hostDb: HostDbClient) => {
  return await eventRepo.getAllEvent(hostId, hostDb);
};

const getEventById = async (eventId: string, hostDb: HostDbClient) => {
  return await eventRepo.getEventById(eventId, hostDb);
};

const createEvent = async (event: EventObject, hostDb: HostDbClient) => {
  return await eventRepo.createEvent(event, hostDb);
};

const updateEvent = async (eventId: string, updateData: EventObject, hostDb: HostDbClient) => {
  return await eventRepo.updateEvent(eventId, updateData, hostDb);
};

const deleteEvent = async (eventId: string, hostDb: HostDbClient) => {
  await eventRepo.deleteEvent(eventId, hostDb);
};

const getEventVendorList = async (eventId: string, hostDb: HostDbClient) => {
  return await eventRepo.getEventVendorList(eventId, hostDb);
};

 const eventService = {
  getAllEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventVendorList,
};
export default eventService;