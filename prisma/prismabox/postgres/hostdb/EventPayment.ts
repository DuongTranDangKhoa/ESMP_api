import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const EventPaymentPlain = t.Object(
  {
    eventPaymentid: t.String({ additionalProperties: true }),
    locationId: t.String({ additionalProperties: true }),
    deposit: t.Number({ additionalProperties: true }),
    depositPaymentDate: __nullable__(t.Date({ additionalProperties: true })),
    total: t.Number({ additionalProperties: true }),
    totalPaymentDate: __nullable__(t.Date({ additionalProperties: true })),
    createDate: __nullable__(t.Date({ additionalProperties: true })),
    status: __nullable__(t.String({ additionalProperties: true })),
    vendorinEventId: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const EventPaymentRelations = t.Object(
  {
    location: t.Object(
      {
        locationId: t.String({ additionalProperties: true }),
        typeId: t.String({ additionalProperties: true }),
        shape: t.String({ additionalProperties: true }),
        x: __nullable__(t.Integer({ additionalProperties: true })),
        y: __nullable__(t.Integer({ additionalProperties: true })),
        width: __nullable__(t.Integer({ additionalProperties: true })),
        status: __nullable__(t.String({ additionalProperties: true })),
        heigth: __nullable__(t.Integer({ additionalProperties: true })),
        rotation: __nullable__(t.Integer({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
    vendorInEvent: t.Object(
      {
        vendorinEventId: t.String({ additionalProperties: true }),
        eventId: t.String({ additionalProperties: true }),
        vendorId: t.String({ additionalProperties: true }),
        status: __nullable__(t.String({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const EventPaymentPlainInputCreate = t.Object(
  {
    deposit: t.Number({ additionalProperties: true }),
    depositPaymentDate: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    total: t.Number({ additionalProperties: true }),
    totalPaymentDate: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    createDate: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const EventPaymentPlainInputUpdate = t.Object(
  {
    deposit: t.Number({ additionalProperties: true }),
    depositPaymentDate: __nullable__(t.Date({ additionalProperties: true })),
    total: t.Number({ additionalProperties: true }),
    totalPaymentDate: __nullable__(t.Date({ additionalProperties: true })),
    createDate: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const EventPaymentRelationsInputCreate = t.Object(
  {
    location: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: true }),
          },
          { additionalProperties: true },
        ),
      },
      { additionalProperties: true },
    ),
    vendorInEvent: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: true }),
          },
          { additionalProperties: true },
        ),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const EventPaymentRelationsInputUpdate = t.Partial(
  t.Object(
    {
      location: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: true }),
            },
            { additionalProperties: true },
          ),
        },
        { additionalProperties: true },
      ),
      vendorInEvent: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: true }),
            },
            { additionalProperties: true },
          ),
        },
        { additionalProperties: true },
      ),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const EventPaymentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        eventPaymentid: t.String(),
        locationId: t.String(),
        deposit: t.Number(),
        depositPaymentDate: t.Date(),
        total: t.Number(),
        totalPaymentDate: t.Date(),
        createDate: t.Date(),
        status: t.String(),
        vendorinEventId: t.String(),
      }),
    { $id: "EventPayment" },
  ),
  { additionalProperties: true },
);

export const EventPaymentWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ eventPaymentid: t.String() })),
      t.Union([t.Object({ eventPaymentid: t.String() })]),
      t.Partial(
        t.Object({
          AND: t.Union([Self, t.Array(Self)]),
          NOT: t.Union([Self, t.Array(Self)]),
          OR: t.Array(Self),
        }),
      ),
      t.Partial(
        t.Object(
          {
            eventPaymentid: t.String(),
            locationId: t.String(),
            deposit: t.Number(),
            depositPaymentDate: t.Date(),
            total: t.Number(),
            totalPaymentDate: t.Date(),
            createDate: t.Date(),
            status: t.String(),
            vendorinEventId: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "EventPayment" },
);

export const EventPaymentSelect = t.Partial(
  t.Object(
    {
      eventPaymentid: t.Boolean(),
      locationId: t.Boolean(),
      deposit: t.Boolean(),
      depositPaymentDate: t.Boolean(),
      total: t.Boolean(),
      totalPaymentDate: t.Boolean(),
      createDate: t.Boolean(),
      status: t.Boolean(),
      vendorinEventId: t.Boolean(),
      location: t.Boolean(),
      vendorInEvent: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const EventPaymentInclude = t.Partial(
  t.Object(
    { location: t.Boolean(), vendorInEvent: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const EventPaymentOrderBy = t.Partial(
  t.Object(
    {
      eventPaymentid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      locationId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      deposit: t.Union([t.Literal("asc"), t.Literal("desc")]),
      depositPaymentDate: t.Union([t.Literal("asc"), t.Literal("desc")]),
      total: t.Union([t.Literal("asc"), t.Literal("desc")]),
      totalPaymentDate: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createDate: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorinEventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const EventPayment = t.Composite(
  [EventPaymentPlain, EventPaymentRelations],
  { additionalProperties: true },
);

export const EventPaymentInputCreate = t.Composite(
  [EventPaymentPlainInputCreate, EventPaymentRelationsInputCreate],
  { additionalProperties: true },
);

export const EventPaymentInputUpdate = t.Composite(
  [EventPaymentPlainInputUpdate, EventPaymentRelationsInputUpdate],
  { additionalProperties: true },
);
