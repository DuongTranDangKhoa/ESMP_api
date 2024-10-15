import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const OrderPlain = t.Object(
  {
    orderId: t.String({ additionalProperties: true }),
    eventId: t.String({ additionalProperties: true }),
    vendorId: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    totalAmount: __nullable__(t.Integer({ additionalProperties: true })),
    totalPrice: t.Number({ additionalProperties: true }),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const OrderRelations = t.Object({}, { additionalProperties: true });

export const OrderPlainInputCreate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    totalAmount: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
    totalPrice: t.Number({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const OrderPlainInputUpdate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    totalAmount: __nullable__(t.Integer({ additionalProperties: true })),
    totalPrice: t.Number({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const OrderRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const OrderRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const OrderWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        orderId: t.String(),
        eventId: t.String(),
        vendorId: t.String(),
        name: t.String(),
        totalAmount: t.Integer(),
        totalPrice: t.Number(),
        createAt: t.Date(),
        updatedAt: t.Date(),
      }),
    { $id: "Order" },
  ),
  { additionalProperties: true },
);

export const OrderWhereUnique = t.Recursive(
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
            orderId: t.String(),
            eventId: t.String(),
            vendorId: t.String(),
            name: t.String(),
            totalAmount: t.Integer(),
            totalPrice: t.Number(),
            createAt: t.Date(),
            updatedAt: t.Date(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Order" },
);

export const OrderSelect = t.Partial(
  t.Object(
    {
      orderId: t.Boolean(),
      eventId: t.Boolean(),
      vendorId: t.Boolean(),
      name: t.Boolean(),
      totalAmount: t.Boolean(),
      totalPrice: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const OrderInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const OrderOrderBy = t.Partial(
  t.Object(
    {
      orderId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      totalAmount: t.Union([t.Literal("asc"), t.Literal("desc")]),
      totalPrice: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Order = t.Composite([OrderPlain, OrderRelations], {
  additionalProperties: true,
});

export const OrderInputCreate = t.Composite(
  [OrderPlainInputCreate, OrderRelationsInputCreate],
  { additionalProperties: true },
);

export const OrderInputUpdate = t.Composite(
  [OrderPlainInputUpdate, OrderRelationsInputUpdate],
  { additionalProperties: true },
);
