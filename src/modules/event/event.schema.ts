import { error, Static, t } from 'elysia'
import { Event, Prisma } from '../../../prisma/clients/postgres/hostdb'
import { convertTimeFormat } from '../../utilities/datetime.util'
import { timeFormat } from '../../common/timeFormat.common'
import { EventRegisterStatus } from '../../common/constant/common.constant'
import { Decimal } from '@prisma/client/runtime/library'

export type EventType = Event
export class EventObject {
      eventId?: string
      hostId: string
      themeId: string
      name: string
      description: string | null
      startDate: Date | null
      endDate: Date | null
      coordinates?: string | null
      createAt?: Date | null
      updatedAt?: Date | null
      x?: number | null
      y?: number | null
      width?: number | null
      height?: number | null
      stageValue?: string | null
      onWeb?: boolean
      deposit: Prisma.Decimal
      status: string 
      constructor(data: any) {
        this.eventId = data.eventId
        this.hostId = data.hostId
        this.themeId = data.themeId
        this.name = data.name
        this.description = data.description
        this.startDate = data.startDate
        this.endDate = data.endDate
        this.coordinates = data.coordinates
        this.createAt = data.createAt
        this.updatedAt = data.updatedAt
        this.x = data.x
        this.y = data.y
        this.width = data.width
        this.height = data.height
        this.stageValue = data.stageValue
        this.onWeb = data.onWeb
        this.deposit = data.deposit
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
    name: t.String({
      minLength: 10,
      maxLength: 100,
      error: 'Event name must be at least 10 and maximum 100 characters',
    }),
    description: t.String({
      minLength: 10,
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
    deposit: t.Number({ // Thêm trường profit vào schema
      error: 'Profit must be a number',
    }),
     }),
     {
    additionalProperties: true, // Cho phép các thuộc tính khác
  },
  );

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

export const UpdateEventResponseSchema = t.Required(
  t.Object({
    message: t.String({
      error: 'Message must be a string',
    }),
    id: t.String({
      format: 'uuid',
      error: 'ID must be a valid UUID string',
    }),
  }),
  {
    error: 'Response must contain both message and id',
  },
);
