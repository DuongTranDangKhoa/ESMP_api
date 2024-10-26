import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const OrderDetailPlain = t.Object(
  {
    orderDetailId: t.String({ additionalProperties: true }),
    productitemId: t.String({ additionalProperties: true }),
    orderId: t.String({ additionalProperties: true }),
    quantity: __nullable__(t.Integer({ additionalProperties: true })),
    unitPrice: t.Number({ additionalProperties: true }),
    totalPrice: t.Number({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const OrderDetailRelations = t.Object(
  {
    order: t.Object(
      {
        orderId: t.String({ additionalProperties: true }),
        eventId: t.String({ additionalProperties: true }),
        vendorId: t.String({ additionalProperties: true }),
        name: t.String({ additionalProperties: true }),
        totalAmount: __nullable__(t.Integer({ additionalProperties: true })),
        totalPrice: t.Number({ additionalProperties: true }),
        createAt: __nullable__(t.Date({ additionalProperties: true })),
        updatedAt: __nullable__(t.Date({ additionalProperties: true })),
        status: t.String({ additionalProperties: true }),
      },
      { additionalProperties: true },
    ),
    productItem: t.Object(
      {
        productItemId: t.String({ additionalProperties: true }),
        name: t.String({ additionalProperties: true }),
        description: t.String({ additionalProperties: true }),
        price: t.Number({ additionalProperties: true }),
        createAt: __nullable__(t.Date({ additionalProperties: true })),
        updatedAt: __nullable__(t.Date({ additionalProperties: true })),
        status: t.Boolean({ additionalProperties: true }),
        vendorId: t.String({ additionalProperties: true }),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const OrderDetailPlainInputCreate = t.Object(
  {
    quantity: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
    unitPrice: t.Number({ additionalProperties: true }),
    totalPrice: t.Number({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const OrderDetailPlainInputUpdate = t.Object(
  {
    quantity: __nullable__(t.Integer({ additionalProperties: true })),
    unitPrice: t.Number({ additionalProperties: true }),
    totalPrice: t.Number({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const OrderDetailRelationsInputCreate = t.Object(
  {
    order: t.Object(
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
    productItem: t.Object(
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

export const OrderDetailRelationsInputUpdate = t.Partial(
  t.Object(
    {
      order: t.Object(
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
      productItem: t.Object(
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

export const OrderDetailWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        orderDetailId: t.String(),
        productitemId: t.String(),
        orderId: t.String(),
        quantity: t.Integer(),
        unitPrice: t.Number(),
        totalPrice: t.Number(),
      }),
    { $id: "OrderDetail" },
  ),
  { additionalProperties: true },
);

export const OrderDetailWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ orderDetailId: t.String() })),
      t.Union([t.Object({ orderDetailId: t.String() })]),
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
            productitemId: t.String(),
            orderId: t.String(),
            quantity: t.Integer(),
            unitPrice: t.Number(),
            totalPrice: t.Number(),
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
      productitemId: t.Boolean(),
      orderId: t.Boolean(),
      quantity: t.Boolean(),
      unitPrice: t.Boolean(),
      totalPrice: t.Boolean(),
      order: t.Boolean(),
      productItem: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const OrderDetailInclude = t.Partial(
  t.Object(
    { order: t.Boolean(), productItem: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const OrderDetailOrderBy = t.Partial(
  t.Object(
    {
      orderDetailId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      productitemId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      orderId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      quantity: t.Union([t.Literal("asc"), t.Literal("desc")]),
      unitPrice: t.Union([t.Literal("asc"), t.Literal("desc")]),
      totalPrice: t.Union([t.Literal("asc"), t.Literal("desc")]),
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
