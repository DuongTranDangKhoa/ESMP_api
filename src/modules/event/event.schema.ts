import { error, Static, t } from 'elysia'
import { Event } from '../../../prisma/clients/postgres/hostdb'
import { convertTimeFormat } from '../../utilities/datetime.util'
import { timeFormat } from '../../common/timeFormat.common'
import { EventRegisterStatus } from '../../common/constant/common.constant'

export type EventType = Pick<
  Event,
  'eventId' | 'name' | 'logo' | 'startDate' | 'endDate' | 'description' | 'status' 
>

export class InputEventObject {
  eventName: string
  logo: string
  startDate: Date
  endDate: Date
  description: string
  status: string
  constructor(data: any) {
    this.eventName = data.eventName
    this.logo = data.logo
    this.description = data.description
    this.startDate = new Date(
      convertTimeFormat(data.startDate, timeFormat.date),
    )
    this.endDate = new Date(convertTimeFormat(data.endDate, timeFormat.date))
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

