import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const PaymentPlain = t.Object(
  {
    paymentId: t.String({ additionalProperties: true }),
    orderId: t.String({ additionalProperties: true }),
    transactionType: __nullable__(t.String({ additionalProperties: true })),
    paymentTime: __nullable__(t.Date({ additionalProperties: true })),
    price: t.Number({ additionalProperties: true }),
    status: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const PaymentRelations = t.Object(
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
  },
  { additionalProperties: true },
);

export const PaymentPlainInputCreate = t.Object(
  {
    transactionType: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    paymentTime: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    price: t.Optional(t.Number({ additionalProperties: true })),
    status: t.Optional(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const PaymentPlainInputUpdate = t.Object(
  {
    transactionType: __nullable__(t.String({ additionalProperties: true })),
    paymentTime: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    price: t.Optional(t.Number({ additionalProperties: true })),
    status: t.Optional(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const PaymentRelationsInputCreate = t.Object(
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
  },
  { additionalProperties: true },
);

export const PaymentRelationsInputUpdate = t.Partial(
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
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const PaymentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        paymentId: t.String(),
        orderId: t.String(),
        transactionType: t.String(),
        paymentTime: t.Date(),
        price: t.Number(),
        status: t.String(),
      }),
    { $id: "Payment" },
  ),
  { additionalProperties: true },
);

export const PaymentWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ paymentId: t.String(), orderId: t.String() })),
      t.Union([
        t.Object({ paymentId: t.String() }),
        t.Object({ orderId: t.String() }),
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
            paymentId: t.String(),
            orderId: t.String(),
            transactionType: t.String(),
            paymentTime: t.Date(),
            price: t.Number(),
            status: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Payment" },
);

export const PaymentSelect = t.Partial(
  t.Object(
    {
      paymentId: t.Boolean(),
      orderId: t.Boolean(),
      transactionType: t.Boolean(),
      paymentTime: t.Boolean(),
      price: t.Boolean(),
      status: t.Boolean(),
      order: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const PaymentInclude = t.Partial(
  t.Object(
    { order: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const PaymentOrderBy = t.Partial(
  t.Object(
    {
      paymentId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      orderId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      transactionType: t.Union([t.Literal("asc"), t.Literal("desc")]),
      paymentTime: t.Union([t.Literal("asc"), t.Literal("desc")]),
      price: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Payment = t.Composite([PaymentPlain, PaymentRelations], {
  additionalProperties: true,
});

export const PaymentInputCreate = t.Composite(
  [PaymentPlainInputCreate, PaymentRelationsInputCreate],
  { additionalProperties: true },
);

export const PaymentInputUpdate = t.Composite(
  [PaymentPlainInputUpdate, PaymentRelationsInputUpdate],
  { additionalProperties: true },
);
