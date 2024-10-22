import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const ProductPlain = t.Object(
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
);

export const ProductRelations = t.Object(
  {
    vendor: t.Object(
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
    ),
    ProductItem: t.Array(
      t.Object(
        {
          productItemId: t.String({ additionalProperties: true }),
          productId: t.String({ additionalProperties: true }),
          name: t.String({ additionalProperties: true }),
          description: t.String({ additionalProperties: true }),
          productOriginBy: t.String({ additionalProperties: true }),
          price: t.Number({ additionalProperties: true }),
          unit: t.String({ additionalProperties: true }),
          createAt: __nullable__(t.Date({ additionalProperties: true })),
          updatedAt: __nullable__(t.Date({ additionalProperties: true })),
          status: t.Boolean({ additionalProperties: true }),
        },
        { additionalProperties: true },
      ),
    ),
  },
  { additionalProperties: true },
);

export const ProductPlainInputCreate = t.Object(
  {
    productName: t.String({ additionalProperties: true }),
    description: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    quantity: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
    count: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const ProductPlainInputUpdate = t.Object(
  {
    productName: t.String({ additionalProperties: true }),
    description: __nullable__(t.String({ additionalProperties: true })),
    quantity: __nullable__(t.Integer({ additionalProperties: true })),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
    count: __nullable__(t.Integer({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const ProductRelationsInputCreate = t.Object(
  {
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
  },
  { additionalProperties: true },
);

export const ProductRelationsInputUpdate = t.Partial(
  t.Object(
    {
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
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        productId: t.String(),
        vendorid: t.String(),
        categoryId: t.String(),
        productName: t.String(),
        description: t.String(),
        quantity: t.Integer(),
        createAt: t.Date(),
        updatedAt: t.Date(),
        status: t.Boolean(),
        count: t.Integer(),
      }),
    { $id: "Product" },
  ),
  { additionalProperties: true },
);

export const ProductWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ productId: t.String() })),
      t.Union([t.Object({ productId: t.String() })]),
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
            productId: t.String(),
            vendorid: t.String(),
            categoryId: t.String(),
            productName: t.String(),
            description: t.String(),
            quantity: t.Integer(),
            createAt: t.Date(),
            updatedAt: t.Date(),
            status: t.Boolean(),
            count: t.Integer(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Product" },
);

export const ProductSelect = t.Partial(
  t.Object(
    {
      productId: t.Boolean(),
      vendorid: t.Boolean(),
      categoryId: t.Boolean(),
      productName: t.Boolean(),
      description: t.Boolean(),
      quantity: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      status: t.Boolean(),
      count: t.Boolean(),
      vendor: t.Boolean(),
      ProductItem: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductInclude = t.Partial(
  t.Object(
    { vendor: t.Boolean(), ProductItem: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductOrderBy = t.Partial(
  t.Object(
    {
      productId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      categoryId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      productName: t.Union([t.Literal("asc"), t.Literal("desc")]),
      description: t.Union([t.Literal("asc"), t.Literal("desc")]),
      quantity: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
      count: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Product = t.Composite([ProductPlain, ProductRelations], {
  additionalProperties: true,
});

export const ProductInputCreate = t.Composite(
  [ProductPlainInputCreate, ProductRelationsInputCreate],
  { additionalProperties: true },
);

export const ProductInputUpdate = t.Composite(
  [ProductPlainInputUpdate, ProductRelationsInputUpdate],
  { additionalProperties: true },
);
