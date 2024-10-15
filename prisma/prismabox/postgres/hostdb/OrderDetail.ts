import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const OrderDetailPlain = t.Object(
  {
    orderDetailId: t.String({ additionalProperties: true }),
    eventId: t.String({ additionalProperties: true }),
    vendorId: t.String({ additionalProperties: true }),
    orderId: t.String({ additionalProperties: true }),
    quantity: __nullable__(t.Integer({ additionalProperties: true })),
    unitPrice: t.Number({ additionalProperties: true }),
    totalPrice: t.Number({ additionalProperties: true }),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const OrderDetailRelations = t.Object(
  {},
  { additionalProperties: true },
);

export const OrderDetailPlainInputCreate = t.Object(
  {
    quantity: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
    unitPrice: t.Number({ additionalProperties: true }),
    totalPrice: t.Number({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const OrderDetailPlainInputUpdate = t.Object(
  {
    quantity: __nullable__(t.Integer({ additionalProperties: true })),
    unitPrice: t.Number({ additionalProperties: true }),
    totalPrice: t.Number({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const OrderDetailRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const OrderDetailRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const OrderDetailWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        orderDetailId: t.String(),
        eventId: t.String(),
        vendorId: t.String(),
        orderId: t.String(),
        quantity: t.Integer(),
        unitPrice: t.Number(),
        totalPrice: t.Number(),
        createAt: t.Date(),
        updatedAt: t.Date(),
      }),
    { $id: "OrderDetail" },
  ),
  { additionalProperties: true },
);

export const OrderDetailWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({})),
      t.Union([]),
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
            orderDetailId: t.String(),
            eventId: t.String(),
            vendorId: t.String(),
            orderId: t.String(),
            quantity: t.Integer(),
            unitPrice: t.Number(),
            totalPrice: t.Number(),
            createAt: t.Date(),
            updatedAt: t.Date(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "OrderDetail" },
);

export const OrderDetailSelect = t.Partial(
  t.Object(
    {
      orderDetailId: t.Boolean(),
      eventId: t.Boolean(),
      vendorId: t.Boolean(),
      orderId: t.Boolean(),
      quantity: t.Boolean(),
      unitPrice: t.Boolean(),
      totalPrice: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const OrderDetailInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const OrderDetailOrderBy = t.Partial(
  t.Object(
    {
      orderDetailId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      orderId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      quantity: t.Union([t.Literal("asc"), t.Literal("desc")]),
      unitPrice: t.Union([t.Literal("asc"), t.Literal("desc")]),
      totalPrice: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const OrderDetail = t.Composite(
  [OrderDetailPlain, OrderDetailRelations],
  { additionalProperties: true },
);

export const OrderDetailInputCreate = t.Composite(
  [OrderDetailPlainInputCreate, OrderDetailRelationsInputCreate],
  { additionalProperties: true },
);

export const OrderDetailInputUpdate = t.Composite(
  [OrderDetailPlainInputUpdate, OrderDetailRelationsInputUpdate],
  { additionalProperties: true },
);
