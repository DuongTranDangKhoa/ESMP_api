import { NotFoundError } from 'elysia'
import { HostDbClient } from '../../database/host.db'
import { Vendor } from '../../../prisma/clients/postgres/hostdb'
import { InputEventObject, InputEventRegisterObject } from './event.schema'
import { EventStatus } from '../../common/constant/common.constant'
import { DatabaseError } from '../../errors/database.error'

async function getAllEvent(hostDb: HostDbClient) {
  const eventList = await hostDb.event.findMany().catch((err) => {
    throw new DatabaseError(err.message)
  })
  console.log(eventList)
  return eventList
}

async function getEventById(eventId: string, hostDb: HostDbClient) {
  const event = await hostDb.event
    .findUnique({
      where: {
        eventId,
      },
    })
    .catch((err) => {
      throw new DatabaseError(err.message)
    })

  if (!event) {
    throw new NotFoundError('Event not found')
  }
  return event
}

async function createEvent(event: InputEventObject, hostDb: HostDbClient) {
  await hostDb.event
    .create({
      data: {
        name: event.eventName,
        logo: event.logo,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        status: "On-going",
      },
    })
    .catch((err) => {
      throw new DatabaseError(err.message)
    })
}

async function updateEvent(
  eventId: string,
  updateData: InputEventObject,
  hostDb: HostDbClient,
) {
  await hostDb.event
    .update({
      where: {
        eventId,
      },
      data: {
        name: updateData.eventName,
        logo: updateData.logo,
        description: updateData.description,
        startDate: updateData.startDate,
        endDate: updateData.endDate,
        status: updateData.status,
      },
    })
    .catch((err) => {
      throw new DatabaseError(err.message)
    })
}
async function deleteEvent(eventId: string, hostDb: HostDbClient) {
  await hostDb.event
    .delete({
      where: {
        eventId,
      },
    })
    .catch((err) => {
      throw new DatabaseError(err.message)
    })
}

async function getEventVendorList(eventId: string, hostDb: HostDbClient) {
  const eventVendorList = await hostDb.eventRegister
    .findMany({
      where: {
        eventId,
      },
    })
    .catch((err) => {
      throw new DatabaseError(err.message)
    })
  return eventVendorList
}
async function saveEventVendorList(
  eventId: string,
  eventRegisterList: InputEventRegisterObject[],
  hostDb: HostDbClient,
) {
  try {
    await hostDb.$transaction(async (hostDb) => {
      await Promise.all(
        eventRegisterList.map(async (eventRegister: any) => {
          await hostDb.eventRegister.upsert({
            create: {
              eventId,
              vendorId: eventRegister.vendorId,
              registerStatus: eventRegister.registerStatus,
            },
            update: {
              vendorId: eventRegister.vendorId,
              registerStatus: eventRegister.registerStatus,
            },
            where: eventRegister.eventId,
          })
        }),
      )
    })
  } catch (err: any) {
    throw new DatabaseError(err.message)
  }
}

const eventService = {
  getAllEvent,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventVendorList,
  saveEventVendorList,
}
export default eventService
