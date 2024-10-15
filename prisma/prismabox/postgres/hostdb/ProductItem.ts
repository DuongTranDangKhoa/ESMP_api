import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const ProductItemPlain = t.Object(
  {
    productItemId: t.String({ additionalProperties: true }),
    productId: t.String({ additionalProperties: true }),
    vendorid: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    imageUrl: __nullable__(t.String({ additionalProperties: true })),
    description: t.String({ additionalProperties: true }),
    productOrigin: t.String({ additionalProperties: true }),
    outofstock: t.Boolean({ additionalProperties: true }),
    price: t.Number({ additionalProperties: true }),
    unit: t.String({ additionalProperties: true }),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
    status: t.Boolean({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const ProductItemRelations = t.Object(
  {},
  { additionalProperties: true },
);

export const ProductItemPlainInputCreate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    imageUrl: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    description: t.String({ additionalProperties: true }),
    productOrigin: t.String({ additionalProperties: true }),
    outofstock: t.Optional(t.Boolean({ additionalProperties: true })),
    price: t.Number({ additionalProperties: true }),
    unit: t.String({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(t.Boolean({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const ProductItemPlainInputUpdate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    imageUrl: __nullable__(t.String({ additionalProperties: true })),
    description: t.String({ additionalProperties: true }),
    productOrigin: t.String({ additionalProperties: true }),
    outofstock: t.Optional(t.Boolean({ additionalProperties: true })),
    price: t.Number({ additionalProperties: true }),
    unit: t.String({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(t.Boolean({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const ProductItemRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const ProductItemRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const ProductItemWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        productItemId: t.String(),
        productId: t.String(),
        vendorid: t.String(),
        name: t.String(),
        imageUrl: t.String(),
        description: t.String(),
        productOrigin: t.String(),
        outofstock: t.Boolean(),
        price: t.Number(),
        unit: t.String(),
        createAt: t.Date(),
        updatedAt: t.Date(),
        status: t.Boolean(),
      }),
    { $id: "ProductItem" },
  ),
  { additionalProperties: true },
);

export const ProductItemWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ productItemId: t.String() })),
      t.Union([t.Object({ productItemId: t.String() })]),
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
            productItemId: t.String(),
            productId: t.String(),
            vendorid: t.String(),
            name: t.String(),
            imageUrl: t.String(),
            description: t.String(),
            productOrigin: t.String(),
            outofstock: t.Boolean(),
            price: t.Number(),
            unit: t.String(),
            createAt: t.Date(),
            updatedAt: t.Date(),
            status: t.Boolean(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "ProductItem" },
);

export const ProductItemSelect = t.Partial(
  t.Object(
    {
      productItemId: t.Boolean(),
      productId: t.Boolean(),
      vendorid: t.Boolean(),
      name: t.Boolean(),
      imageUrl: t.Boolean(),
      description: t.Boolean(),
      productOrigin: t.Boolean(),
      outofstock: t.Boolean(),
      price: t.Boolean(),
      unit: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductItemInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const ProductItemOrderBy = t.Partial(
  t.Object(
    {
      productItemId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      productId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      imageUrl: t.Union([t.Literal("asc"), t.Literal("desc")]),
      description: t.Union([t.Literal("asc"), t.Literal("desc")]),
      productOrigin: t.Union([t.Literal("asc"), t.Literal("desc")]),
      outofstock: t.Union([t.Literal("asc"), t.Literal("desc")]),
      price: t.Union([t.Literal("asc"), t.Literal("desc")]),
      unit: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductItem = t.Composite(
  [ProductItemPlain, ProductItemRelations],
  { additionalProperties: true },
);

export const ProductItemInputCreate = t.Composite(
  [ProductItemPlainInputCreate, ProductItemRelationsInputCreate],
  { additionalProperties: true },
);

export const ProductItemInputUpdate = t.Composite(
  [ProductItemPlainInputUpdate, ProductItemRelationsInputUpdate],
  { additionalProperties: true },
);
