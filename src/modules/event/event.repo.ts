import { HostDbClient } from '../../database/dbClient.db';
import { EventObject } from './event.schema';
import { EventStatus } from '../../common/constant/common.constant';
import { NotFoundError } from 'elysia';
import { DatabaseError } from '../../errors/database.error';
import { compareDateToNow } from '../../utilities/datetime.util';

export const eventRepo = {
  // Get all events for a specific host
  async getAllEvent(hostId: string, hostDb: HostDbClient) {
    try {
      const eventList = await hostDb.event.findMany({ where: { hostId } });
      if (eventList) {
        for (const event of eventList) {
          if (
            compareDateToNow(event.startDate) === -1 && compareDateToNow(event.endDate) === 1
          ) {
            await hostDb.event.update({ where: { eventId: event.eventId }, data: { status: EventStatus.running } });
          } else if (compareDateToNow(event.endDate) === -1) {
            await hostDb.event.update({ where: { eventId: event.eventId }, data: { status: EventStatus.past } });
          }
        }
      }
      await hostDb.$disconnect();
      return eventList;
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  },

  // Get event by ID
  async getEventById(eventId: string, hostDb: HostDbClient) {
    try {
      const event = await hostDb.event.findFirst({ where: { eventId } });
      if (!event) {
        throw new NotFoundError('Event not found');
      }
      await hostDb.$disconnect();
      return event;
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  },


  async createEvent(event: EventObject, hostDb: HostDbClient) {
    try {
      const eventO = await hostDb.event.create({ data: event });
      await hostDb.$disconnect();
      return eventO;
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  },

  // Update an event by ID
  async updateEvent(eventId: string, updateData: EventObject, hostDb: HostDbClient) {
    try {
      const updatedEvent = await hostDb.event.update({
        where: { eventId },
        data: updateData,
        select: { eventId: true },
      });
      await hostDb.$disconnect();
      return { message: "Update event success", id: eventId };
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  },

  // Delete event by ID
  async deleteEvent(eventId: string, hostDb: HostDbClient) {
    try {
      await hostDb.event.delete({ where: { eventId } });
      await hostDb.$disconnect();
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  },

  // Get vendor list for a specific event
  async getEventVendorList(eventId: string, hostDb: HostDbClient) {
    try {
      const eventVendorList = await hostDb.event.findMany({
        where: { eventId },
      });
      await hostDb.$disconnect();
      return eventVendorList;
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  },
};
