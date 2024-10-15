import { error, Static, t } from 'elysia'
import { Event } from '../../../prisma/clients/postgres/hostdb'
import { convertTimeFormat } from '../../utilities/datetime.util'
import { timeFormat } from '../../common/timeFormat.common'
import { EventRegisterStatus } from '../../common/constant/common.constant'
import { Decimal } from '@prisma/client/runtime/library'

export type EventType = Event
export class EventObject {
      eventId: string
      name: string
      description: string | null
      logo: string | null
      startDate: Date | null
      endDate: Date | null
      venue: string | null
      createAt: Date | null
      updatedAt: Date | null
      x?: number | null
      y?: number | null
      onWeb?: Buffer
      profit?: Decimal
      status: string 
      constructor(data: any) {
        this.eventId = data.eventId
        this.name = data.name
        this.description = data.description
        this.logo = data.logo
        this.startDate = data.startDate
        this.endDate = data.endDate
        this.venue = data.venue
        this.createAt = data.createAt
        this.updatedAt = data.updatedAt
        this.x = data.x
        this.y = data.y
        this.onWeb = data.onWeb
        this.profit = data.profit
        this.status = data.status
      }
}

export const GetEventDetailsParams = t.Required(
  t.Object(
    {
      eventId: t.String({
        format: 'uuid',
        error: 'Event ID is invalid',
      }),
    },
    {
      error: 'Event ID not provided',
    },
  ),
)

export const InputEventSchema = t.Required(
  t.Object({
    eventName: t.String({
      minLength: 10,
      maxLength: 100,
      error: 'Event name must be at least 10 and maximum 100 characters',
    }),
    description: t.String({
      minLength: 100,
      maxLength: 1000,
      error:
        'Event description must be at least 100 and maximum 1000 characters',
    }),
    startDate: t.String({
      format: 'date',
      error: 'Invalid date',
    }),
    endDate: t.String({
      format: 'date',
      error: 'Invalid date',
    }),
  }),
)

export const InputEventRegisterItemSchema = t.Required(
  t.Object({
    vendorId: t.String({
      format: 'uuid',
      error: 'Invalid vendor ID',
    }),
    registerStatus: t.Number({}),
  }),
)

export const InputEventRegisterSchema = t.Required(
  t.Array(InputEventRegisterItemSchema, {
    error: 'Saving data must be an array',
  }),
  {
    error: 'Saving data not provided',
  },
)

export class InputEventRegisterObject {
  vendorId: string
  registerStatus: 0 | 1 | 2

  constructor(data: any) {
    this.vendorId = data.vendorId
    this.registerStatus = data.registerStatus
  }
}

