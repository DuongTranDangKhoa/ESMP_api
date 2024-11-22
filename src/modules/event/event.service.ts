import { NotFoundError } from 'elysia'
import { HostDbClient } from '../../database/dbClient.db'
import { Vendor } from '../../../prisma/clients/postgres/hostdb'
import { EventObject, EventType, InputEventRegisterObject } from './event.schema'
import { EventStatus } from '../../common/constant/common.constant'
import { DatabaseError } from '../../errors/database.error'
import { compareDateToNow } from '../../utilities/datetime.util'

async function getAllEvent(hostId: string, hostDb: HostDbClient) {
  try {
    const eventList = await hostDb.event.findMany({where: {hostId}})
    if (eventList ) {
    for (const event of eventList) {    
    if (
    compareDateToNow(event.startDate) === -1 &&  compareDateToNow(event.endDate) === 1
    ) {
     await hostDb.event.update({ where : {eventId: event.eventId}, data: {status: EventStatus.running}})
  } else if ( compareDateToNow(event.endDate) === -1 ) {
   
     await hostDb.event.update({ where : {eventId: event.eventId}, data: {status: EventStatus.past}})
    }
    }
    await hostDb.$disconnect();
    return eventList
 
}
  }
   catch (err: any) {
    throw new DatabaseError(err.message)
  }
}

async function getEventById(eventId: string, hostDb: HostDbClient) {
  try {
    const event = await hostDb.event.findFirst({
      where: {
        eventId,
      },
    })
    if (!event) {
      throw new NotFoundError('Event not found')
    }
    await hostDb.$disconnect();
    return event
  } catch (err: any) {
    throw new DatabaseError(err.message)
  }
}

async function createEvent(event: EventObject, hostDb: HostDbClient) {
  try {
    const eventO = await hostDb.event.create({
      data: event,
    })
    await hostDb.$disconnect();
    return eventO
  } catch (err: any) {
    throw new DatabaseError(err.message)
  }
  
}

async function updateEvent(
  eventId: string,
  updateData: EventObject,
  hostDb: HostDbClient,
) {
  try {
    const updatedEvent = await hostDb.event.update({
      where: {
        eventId,
      },
      data: {
        eventId: eventId,
        name: updateData.name,
        description: updateData.description,
        themeId: updateData.themeId,
        startDate: updateData.startDate,
        endDate: updateData.endDate,
        status: updateData.status,
        profit: updateData.profit,
        coordinates: updateData.coordinates,
        x: updateData.x,
        y: updateData.y,
        width: updateData.width,
        height: updateData.height,
        stageValue: updateData.stageValue,
        onWeb: updateData.onWeb,
      },
      select: {
        eventId: true, 
      },
    });
    await hostDb.$disconnect();
    return {
      message: "Update event success",
      id: eventId, 
    };
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
}



async function deleteEvent(eventId: string, hostDb: HostDbClient) {
  try {
    await hostDb.event.delete({
      where: {
        eventId,
      },
    })
    await hostDb.$disconnect();
  } catch (err: any) {
    throw new DatabaseError(err.message)
  }
}

async function getEventVendorList(eventId: string, hostDb: HostDbClient) {
  try {
    const eventVendorList = await hostDb.event.findMany({
      where: {
        eventId,
      },
    })
    await hostDb.$disconnect();
    return eventVendorList
  } catch (err: any) {
    throw new DatabaseError(err.message)
  }
}

// async function saveEventVendorList(
//   eventId: string,
//   eventRegisterList: InputEventRegisterObject[],
//   hostDb: HostDbClient,
// ) {
//   try {
//     await hostDb.$transaction(async (hostDb) => {
//       await Promise.all(
//         eventRegisterList.map(async (eventRegister: any) => {
//           await hostDb.eventRegister.upsert({
//             create: {
//               eventId,
//               vendorId: eventRegister.vendorId,
//               registerStatus: eventRegister.registerStatus,
//             },
//             update: {
//               vendorId: eventRegister.vendorId,
//               registerStatus: eventRegister.registerStatus,
//             },
//             where: eventRegister.eventId,
//           })
//         }),
//       )
//     })
//   } catch (err: any) {
//     throw new DatabaseError(err.message)
//   }
// }

const eventService = {
  getAllEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventVendorList,
  // saveEventVendorList,
}

export default eventService
