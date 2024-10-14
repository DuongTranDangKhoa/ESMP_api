import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const EventPaymentPlain = t.Object(
  {
    eventPayment: t.String({ additionalProperties: true }),
    eventId: t.String({ additionalProperties: true }),
    vendorId: t.String({ additionalProperties: true }),
    locationId: t.String({ additionalProperties: true }),
    deposit: t.Number({ additionalProperties: true }),
    depositPaymentDate: __nullable__(t.Date({ additionalProperties: true })),
    total: t.Number({ additionalProperties: true }),
    totalPaymentDate: __nullable__(t.Date({ additionalProperties: true })),
    createDate: __nullable__(t.Date({ additionalProperties: true })),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const EventPaymentRelations = t.Object(
  {},
  { additionalProperties: true },
);

export const EventPaymentPlainInputCreate = t.Object(
  {
    eventPayment: t.Optional(t.String({ additionalProperties: true })),
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
    eventPayment: t.Optional(t.String({ additionalProperties: true })),
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
  {},
  { additionalProperties: true },
);

export const EventPaymentRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const EventPaymentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        eventPayment: t.String(),
        eventId: t.String(),
        vendorId: t.String(),
        locationId: t.String(),
        deposit: t.Number(),
        depositPaymentDate: t.Date(),
        total: t.Number(),
        totalPaymentDate: t.Date(),
        createDate: t.Date(),
        status: t.String(),
      }),
    { $id: "EventPayment" },
  ),
  { additionalProperties: true },
);

export const EventPaymentWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ eventPayment: t.String(), locationId: t.String() })),
      t.Union([
        t.Object({ eventPayment: t.String() }),
        t.Object({ locationId: t.String() }),
      ]),
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
            eventPayment: t.String(),
            eventId: t.String(),
            vendorId: t.String(),
            locationId: t.String(),
            deposit: t.Number(),
            depositPaymentDate: t.Date(),
            total: t.Number(),
            totalPaymentDate: t.Date(),
            createDate: t.Date(),
            status: t.String(),
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
      eventPayment: t.Boolean(),
      eventId: t.Boolean(),
      vendorId: t.Boolean(),
      locationId: t.Boolean(),
      deposit: t.Boolean(),
      depositPaymentDate: t.Boolean(),
      total: t.Boolean(),
      totalPaymentDate: t.Boolean(),
      createDate: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const EventPaymentInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const EventPaymentOrderBy = t.Partial(
  t.Object(
    {
      eventPayment: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      locationId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      deposit: t.Union([t.Literal("asc"), t.Literal("desc")]),
      depositPaymentDate: t.Union([t.Literal("asc"), t.Literal("desc")]),
      total: t.Union([t.Literal("asc"), t.Literal("desc")]),
      totalPaymentDate: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createDate: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
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
