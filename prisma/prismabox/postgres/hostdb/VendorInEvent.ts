import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const VendorInEventPlain = t.Object(
  {
    vendorinEventId: t.String({ additionalProperties: true }),
    eventId: t.String({ additionalProperties: true }),
    vendorId: t.String({ additionalProperties: true }),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const VendorInEventRelations = t.Object(
  {
    EventPayment: t.Array(
      t.Object(
        {
          eventPaymentid: t.String({ additionalProperties: true }),
          locationId: t.String({ additionalProperties: true }),
          deposit: t.Number({ additionalProperties: true }),
          depositPaymentDate: __nullable__(
            t.Date({ additionalProperties: true }),
          ),
          total: t.Number({ additionalProperties: true }),
          totalPaymentDate: __nullable__(
            t.Date({ additionalProperties: true }),
          ),
          createDate: __nullable__(t.Date({ additionalProperties: true })),
          status: __nullable__(t.String({ additionalProperties: true })),
          vendorinEventId: t.String({ additionalProperties: true }),
        },
        { additionalProperties: true },
      ),
    ),
    Menu: __nullable__(
      t.Object(
        {
          menuId: t.String({ additionalProperties: true }),
          menuName: t.String({ additionalProperties: true }),
          createAt: __nullable__(t.Date({ additionalProperties: true })),
          updatedAt: __nullable__(t.Date({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
    event: t.Object(
      {
        eventId: t.String({ additionalProperties: true }),
        name: t.String({ additionalProperties: true }),
        description: __nullable__(t.String({ additionalProperties: true })),
        startDate: __nullable__(t.Date({ additionalProperties: true })),
        endDate: __nullable__(t.Date({ additionalProperties: true })),
        venue: __nullable__(t.String({ additionalProperties: true })),
        createAt: __nullable__(t.Date({ additionalProperties: true })),
        updatedAt: __nullable__(t.Date({ additionalProperties: true })),
        x: __nullable__(t.Integer({ additionalProperties: true })),
        y: __nullable__(t.Integer({ additionalProperties: true })),
        profit: t.Number({ additionalProperties: true }),
        status: __nullable__(t.String({ additionalProperties: true })),
        height: __nullable__(t.Integer({ additionalProperties: true })),
        hostId: t.String({ additionalProperties: true }),
        stageValue: __nullable__(t.String({ additionalProperties: true })),
        themeId: t.String({ additionalProperties: true }),
        width: __nullable__(t.Integer({ additionalProperties: true })),
        onWeb: __nullable__(t.Boolean({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
    vendor: t.Object(
      {
        vendorId: t.String({ additionalProperties: true }),
        userid: t.String({ additionalProperties: true }),
        hostid: t.String({ additionalProperties: true }),
        phone: __nullable__(t.String({ additionalProperties: true })),
        email: __nullable__(t.String({ additionalProperties: true })),
        address: __nullable__(t.String({ additionalProperties: true })),
        urlQr: __nullable__(t.String({ additionalProperties: true })),
        status: __nullable__(t.Boolean({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const VendorInEventPlainInputCreate = t.Object(
  {
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const VendorInEventPlainInputUpdate = t.Object(
  {
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const VendorInEventRelationsInputCreate = t.Object(
  {
    EventPayment: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: true }),
              },
              { additionalProperties: true },
            ),
          ),
        },
        { additionalProperties: true },
      ),
    ),
    Menu: t.Optional(
      t.Object(
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
    ),
    event: t.Object(
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
    vendor: t.Object(
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

export const VendorInEventRelationsInputUpdate = t.Partial(
  t.Object(
    {
      EventPayment: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: true }),
                },
                { additionalProperties: true },
              ),
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: true }),
                },
                { additionalProperties: true },
              ),
            ),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
      Menu: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: true }),
              },
              { additionalProperties: true },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
      event: t.Object(
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
      vendor: t.Object(
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

export const VendorInEventWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        vendorinEventId: t.String(),
        eventId: t.String(),
        vendorId: t.String(),
        status: t.String(),
      }),
    { $id: "VendorInEvent" },
  ),
  { additionalProperties: true },
);

export const VendorInEventWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ vendorinEventId: t.String() })),
      t.Union([t.Object({ vendorinEventId: t.String() })]),
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
            vendorinEventId: t.String(),
            eventId: t.String(),
            vendorId: t.String(),
            status: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "VendorInEvent" },
);

export const VendorInEventSelect = t.Partial(
  t.Object(
    {
      vendorinEventId: t.Boolean(),
      eventId: t.Boolean(),
      vendorId: t.Boolean(),
      status: t.Boolean(),
      EventPayment: t.Boolean(),
      Menu: t.Boolean(),
      event: t.Boolean(),
      vendor: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const VendorInEventInclude = t.Partial(
  t.Object(
    {
      EventPayment: t.Boolean(),
      Menu: t.Boolean(),
      event: t.Boolean(),
      vendor: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const VendorInEventOrderBy = t.Partial(
  t.Object(
    {
      vendorinEventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const VendorInEvent = t.Composite(
  [VendorInEventPlain, VendorInEventRelations],
  { additionalProperties: true },
);

export const VendorInEventInputCreate = t.Composite(
  [VendorInEventPlainInputCreate, VendorInEventRelationsInputCreate],
  { additionalProperties: true },
);

export const VendorInEventInputUpdate = t.Composite(
  [VendorInEventPlainInputUpdate, VendorInEventRelationsInputUpdate],
  { additionalProperties: true },
);
