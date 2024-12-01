import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const VendorPlain = t.Object(
  {
    vendorId: t.String({ additionalProperties: true }),
    userid: t.String({ additionalProperties: true }),
    hostid: t.String({ additionalProperties: true }),
    address: __nullable__(t.String({ additionalProperties: true })),
    urlQr: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const VendorRelations = t.Object(
  {
    order: t.Array(
      t.Object(
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
    ),
    product: t.Array(
      t.Object(
        {
          productId: t.String({ additionalProperties: true }),
          vendorid: t.String({ additionalProperties: true }),
          categoryId: t.String({ additionalProperties: true }),
          productName: t.String({ additionalProperties: true }),
          description: __nullable__(t.String({ additionalProperties: true })),
          quantity: __nullable__(t.Integer({ additionalProperties: true })),
          createAt: __nullable__(t.Date({ additionalProperties: true })),
          updatedAt: __nullable__(t.Date({ additionalProperties: true })),
          status: __nullable__(t.Boolean({ additionalProperties: true })),
          count: __nullable__(t.Integer({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
    productItem: t.Array(
      t.Object(
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
    ),
    staff: t.Array(
      t.Object(
        {
          staffid: t.String({ additionalProperties: true }),
          vendorId: t.String({ additionalProperties: true }),
          userid: t.String({ additionalProperties: true }),
        },
        { additionalProperties: true },
      ),
    ),
    account: t.Object(
      {
        id: t.String({ additionalProperties: true }),
        username: t.String({ additionalProperties: true }),
        password: t.String({ additionalProperties: true }),
        role: t.String({ additionalProperties: true }),
        name: t.String({ additionalProperties: true }),
        createdat: __nullable__(t.Date({ additionalProperties: true })),
        updatedat: __nullable__(t.Date({ additionalProperties: true })),
        status: __nullable__(t.Boolean({ additionalProperties: true })),
        phone: __nullable__(t.String({ additionalProperties: true })),
        email: __nullable__(t.String({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
    host: t.Object(
      {
        userid: t.String({ additionalProperties: true }),
        expiretime: __nullable__(t.Date({ additionalProperties: true })),
        bankingaccount: __nullable__(t.String({ additionalProperties: true })),
        eventstoragetime: __nullable__(t.Date({ additionalProperties: true })),
        hostid: t.String({ additionalProperties: true }),
        apibanking: __nullable__(t.String({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
    vendorinevent: t.Array(
      t.Object(
        {
          vendorinEventId: t.String({ additionalProperties: true }),
          eventId: t.String({ additionalProperties: true }),
          vendorId: t.String({ additionalProperties: true }),
          status: __nullable__(t.String({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
  },
  { additionalProperties: true },
);

export const VendorPlainInputCreate = t.Object(
  {
    address: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
    urlQr: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const VendorPlainInputUpdate = t.Object(
  {
    address: __nullable__(t.String({ additionalProperties: true })),
    urlQr: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const VendorRelationsInputCreate = t.Object(
  {
    order: t.Optional(
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
    product: t.Optional(
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
    productItem: t.Optional(
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
    staff: t.Optional(
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
    account: t.Object(
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
    host: t.Object(
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
    vendorinevent: t.Optional(
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
  },
  { additionalProperties: true },
);

export const VendorRelationsInputUpdate = t.Partial(
  t.Object(
    {
      order: t.Partial(
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
      product: t.Partial(
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
      productItem: t.Partial(
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
      staff: t.Partial(
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
      account: t.Object(
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
      host: t.Object(
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
      vendorinevent: t.Partial(
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
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const VendorWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        vendorId: t.String(),
        userid: t.String(),
        hostid: t.String(),
        address: t.String(),
        urlQr: t.String(),
      }),
    { $id: "Vendor" },
  ),
  { additionalProperties: true },
);

export const VendorWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ vendorId: t.String(), userid: t.String() })),
      t.Union([
        t.Object({ vendorId: t.String() }),
        t.Object({ userid: t.String() }),
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
            vendorId: t.String(),
            userid: t.String(),
            hostid: t.String(),
            address: t.String(),
            urlQr: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Vendor" },
);

export const VendorSelect = t.Partial(
  t.Object(
    {
      vendorId: t.Boolean(),
      userid: t.Boolean(),
      hostid: t.Boolean(),
      address: t.Boolean(),
      urlQr: t.Boolean(),
      order: t.Boolean(),
      product: t.Boolean(),
      productItem: t.Boolean(),
      staff: t.Boolean(),
      account: t.Boolean(),
      host: t.Boolean(),
      vendorinevent: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const VendorInclude = t.Partial(
  t.Object(
    {
      order: t.Boolean(),
      product: t.Boolean(),
      productItem: t.Boolean(),
      staff: t.Boolean(),
      account: t.Boolean(),
      host: t.Boolean(),
      vendorinevent: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const VendorOrderBy = t.Partial(
  t.Object(
    {
      vendorId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      userid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      hostid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      address: t.Union([t.Literal("asc"), t.Literal("desc")]),
      urlQr: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Vendor = t.Composite([VendorPlain, VendorRelations], {
  additionalProperties: true,
});

export const VendorInputCreate = t.Composite(
  [VendorPlainInputCreate, VendorRelationsInputCreate],
  { additionalProperties: true },
);

export const VendorInputUpdate = t.Composite(
  [VendorPlainInputUpdate, VendorRelationsInputUpdate],
  { additionalProperties: true },
);
