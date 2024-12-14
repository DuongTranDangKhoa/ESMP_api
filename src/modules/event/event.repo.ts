import { HostDbClient } from '../../database/dbClient.db';
import { EventObject } from './event.schema';
import { EventStatus } from '../../common/constant/common.constant';
import { NotFoundError } from 'elysia';
import { DatabaseError } from '../../errors/database.error';
import { compareDateToNow } from '../../utilities/datetime.util';
import { MainTemplateObject } from '../map/map.schema';

export const eventRepo = {

  async getAllEvent(hostId: string, hostDb: HostDbClient) {
    try {
      const eventList = await hostDb.event.findMany({ where: { hostId } });
      if (eventList) {
        for (const event of eventList) {
          if (event.status !== EventStatus.cancelled){
          if (
            compareDateToNow(event.startDate) === -1 && compareDateToNow(event.endDate) === 1
          ) {
            await hostDb.event.update({ where: { eventId: event.eventId }, data: { status: EventStatus.running } });
          } else if (compareDateToNow(event.endDate) === -1) {
            await hostDb.event.update({ where: { eventId: event.eventId }, data: { status: EventStatus.past } });
          }
        }
        }
      }
      await hostDb.$disconnect();
      return eventList;
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  },


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
  async updateEventMap( eventId: string,mainTemplate: MainTemplateObject ,hostDb: HostDbClient){
  return  await hostDb.event.update({
                where: { eventId: eventId },
                data: {
                    x: mainTemplate.x,
                    y: mainTemplate.y,
                    width: mainTemplate.width,
                    height: mainTemplate.height,
                }
            });
  },

  async deleteEvent(eventId: string, hostDb: HostDbClient) {
    try {
      await hostDb.event.delete({ where: { eventId } });
      await hostDb.$disconnect();
    } catch (err: any) {
      throw new DatabaseError(err.message);
    }
  },


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
