import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProductInProductItemPlain = t.Object(
  {
    productInProductItemId: t.String({ additionalProperties: true }),
    productItemId: t.String({ additionalProperties: true }),
    productId: t.String({ additionalProperties: true }),
    unit: t.String({ additionalProperties: true }),
    quantity: __nullable__(t.Integer({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const ProductInProductItemRelations = t.Object(
  {
    product: t.Object(
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

export const ProductInProductItemPlainInputCreate = t.Object(
  {
    unit: t.String({ additionalProperties: true }),
    quantity: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
  },
  { additionalProperties: true },
);

export const ProductInProductItemPlainInputUpdate = t.Object(
  {
    unit: t.String({ additionalProperties: true }),
    quantity: __nullable__(t.Integer({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const ProductInProductItemRelationsInputCreate = t.Object(
  {
    product: t.Object(
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

export const ProductInProductItemRelationsInputUpdate = t.Partial(
  t.Object(
    {
      product: t.Object(
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

export const ProductInProductItemWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        productInProductItemId: t.String(),
        productItemId: t.String(),
        productId: t.String(),
        unit: t.String(),
        quantity: t.Integer(),
      }),
    { $id: "ProductInProductItem" },
  ),
  { additionalProperties: true },
);

export const ProductInProductItemWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ productInProductItemId: t.String() })),
      t.Union([t.Object({ productInProductItemId: t.String() })]),
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
            productInProductItemId: t.String(),
            productItemId: t.String(),
            productId: t.String(),
            unit: t.String(),
            quantity: t.Integer(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "ProductInProductItem" },
);

export const ProductInProductItemSelect = t.Partial(
  t.Object(
    {
      productInProductItemId: t.Boolean(),
      productItemId: t.Boolean(),
      productId: t.Boolean(),
      unit: t.Boolean(),
      quantity: t.Boolean(),
      product: t.Boolean(),
      productItem: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductInProductItemInclude = t.Partial(
  t.Object(
    { product: t.Boolean(), productItem: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductInProductItemOrderBy = t.Partial(
  t.Object(
    {
      productInProductItemId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      productItemId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      productId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      unit: t.Union([t.Literal("asc"), t.Literal("desc")]),
      quantity: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductInProductItem = t.Composite(
  [ProductInProductItemPlain, ProductInProductItemRelations],
  { additionalProperties: true },
);

export const ProductInProductItemInputCreate = t.Composite(
  [
    ProductInProductItemPlainInputCreate,
    ProductInProductItemRelationsInputCreate,
  ],
  { additionalProperties: true },
);

export const ProductInProductItemInputUpdate = t.Composite(
  [
    ProductInProductItemPlainInputUpdate,
    ProductInProductItemRelationsInputUpdate,
  ],
  { additionalProperties: true },
);
