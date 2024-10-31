import { NotFoundError } from 'elysia'
import { HostDbClient } from '../../database/host.db'
import { Vendor } from '../../../prisma/clients/postgres/hostdb'
import { EventObject, EventType, InputEventRegisterObject } from './event.schema'
import { EventStatus } from '../../common/constant/common.constant'
import { DatabaseError } from '../../errors/database.error'

async function getAllEvent(hostDb: HostDbClient) {
  try {
    const eventList = await hostDb.event.findMany()
    await hostDb.$disconnect();
    return eventList
  } catch (err: any) {
    throw new DatabaseError(err.message)
  }
}

async function getEventById(eventId: string, hostDb: HostDbClient) {
  try {
    const event = await hostDb.event.findUnique({
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
    await hostDb.event.update({
      where: {
        eventId,
      },
      data: {
        name: updateData.name,
        logo: updateData.logo,
        description: updateData.description,
        startDate: updateData.startDate,
        endDate: updateData.endDate,
        status: updateData.status,
      },
    })
    await hostDb.$disconnect();
  } catch (err: any) {
    throw new DatabaseError(err.message)
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
