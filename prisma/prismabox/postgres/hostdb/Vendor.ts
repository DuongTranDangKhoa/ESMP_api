import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const VendorPlain = t.Object(
  {
    vendorId: t.String({ additionalProperties: true }),
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    vendorName: __nullable__(t.String({ additionalProperties: true })),
    phone: __nullable__(t.String({ additionalProperties: true })),
    email: __nullable__(t.String({ additionalProperties: true })),
    image: __nullable__(t.String({ additionalProperties: true })),
    address: __nullable__(t.String({ additionalProperties: true })),
    urlQr: __nullable__(t.String({ additionalProperties: true })),
    createDate: __nullable__(t.Date({ additionalProperties: true })),
    updatedDate: __nullable__(t.Date({ additionalProperties: true })),
    status: __nullable__(t.Boolean({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const VendorRelations = t.Object(
  {
    Product: t.Array(
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
    ProductItem: t.Array(
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
    VendorInEvent: t.Array(
      t.Object(
        {
          vendorinEventId: t.String({ additionalProperties: true }),
          eventId: t.String({ additionalProperties: true }),
          vendorId: t.String({ additionalProperties: true }),
          status: __nullable__(t.Boolean({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
  },
  { additionalProperties: true },
);

export const VendorPlainInputCreate = t.Object(
  {
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    vendorName: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    phone: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
    email: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
    image: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
    address: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
    urlQr: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
    createDate: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    updatedDate: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const VendorPlainInputUpdate = t.Object(
  {
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    vendorName: __nullable__(t.String({ additionalProperties: true })),
    phone: __nullable__(t.String({ additionalProperties: true })),
    email: __nullable__(t.String({ additionalProperties: true })),
    image: __nullable__(t.String({ additionalProperties: true })),
    address: __nullable__(t.String({ additionalProperties: true })),
    urlQr: __nullable__(t.String({ additionalProperties: true })),
    createDate: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    updatedDate: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const VendorRelationsInputCreate = t.Object(
  {
    Product: t.Optional(
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
    ProductItem: t.Optional(
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
    VendorInEvent: t.Optional(
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
      Product: t.Partial(
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
      ProductItem: t.Partial(
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
      VendorInEvent: t.Partial(
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
        username: t.String(),
        password: t.String(),
        vendorName: t.String(),
        phone: t.String(),
        email: t.String(),
        image: t.String(),
        address: t.String(),
        urlQr: t.String(),
        createDate: t.Date(),
        updatedDate: t.Date(),
        status: t.Boolean(),
      }),
    { $id: "Vendor" },
  ),
  { additionalProperties: true },
);

export const VendorWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ vendorId: t.String(), username: t.String() })),
      t.Union([
        t.Object({ vendorId: t.String() }),
        t.Object({ username: t.String() }),
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
            username: t.String(),
            password: t.String(),
            vendorName: t.String(),
            phone: t.String(),
            email: t.String(),
            image: t.String(),
            address: t.String(),
            urlQr: t.String(),
            createDate: t.Date(),
            updatedDate: t.Date(),
            status: t.Boolean(),
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
      username: t.Boolean(),
      password: t.Boolean(),
      vendorName: t.Boolean(),
      phone: t.Boolean(),
      email: t.Boolean(),
      image: t.Boolean(),
      address: t.Boolean(),
      urlQr: t.Boolean(),
      createDate: t.Boolean(),
      updatedDate: t.Boolean(),
      status: t.Boolean(),
      Product: t.Boolean(),
      ProductItem: t.Boolean(),
      VendorInEvent: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const VendorInclude = t.Partial(
  t.Object(
    {
      Product: t.Boolean(),
      ProductItem: t.Boolean(),
      VendorInEvent: t.Boolean(),
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
      username: t.Union([t.Literal("asc"), t.Literal("desc")]),
      password: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorName: t.Union([t.Literal("asc"), t.Literal("desc")]),
      phone: t.Union([t.Literal("asc"), t.Literal("desc")]),
      email: t.Union([t.Literal("asc"), t.Literal("desc")]),
      image: t.Union([t.Literal("asc"), t.Literal("desc")]),
      address: t.Union([t.Literal("asc"), t.Literal("desc")]),
      urlQr: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createDate: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedDate: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
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
