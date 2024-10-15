import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const ProductPlain = t.Object(
  {
    productId: t.String({ additionalProperties: true }),
    categoryId: t.String({ additionalProperties: true }),
    productName: t.String({ additionalProperties: true }),
    description: __nullable__(t.String({ additionalProperties: true })),
    quantity: __nullable__(t.Integer({ additionalProperties: true })),
    count: __nullable__(t.Integer({ additionalProperties: true })),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
    status: __nullable__(t.Boolean({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const ProductRelations = t.Object({}, { additionalProperties: true });

export const ProductPlainInputCreate = t.Object(
  {
    productName: t.String({ additionalProperties: true }),
    description: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    quantity: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
    count: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const ProductPlainInputUpdate = t.Object(
  {
    productName: t.String({ additionalProperties: true }),
    description: __nullable__(t.String({ additionalProperties: true })),
    quantity: __nullable__(t.Integer({ additionalProperties: true })),
    count: __nullable__(t.Integer({ additionalProperties: true })),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const ProductRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const ProductRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
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
        categoryId: t.String(),
        productName: t.String(),
        description: t.String(),
        quantity: t.Integer(),
        count: t.Integer(),
        createAt: t.Date(),
        updatedAt: t.Date(),
        status: t.Boolean(),
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
            categoryId: t.String(),
            productName: t.String(),
            description: t.String(),
            quantity: t.Integer(),
            count: t.Integer(),
            createAt: t.Date(),
            updatedAt: t.Date(),
            status: t.Boolean(),
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
      categoryId: t.Boolean(),
      productName: t.Boolean(),
      description: t.Boolean(),
      quantity: t.Boolean(),
      count: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const ProductOrderBy = t.Partial(
  t.Object(
    {
      productId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      categoryId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      productName: t.Union([t.Literal("asc"), t.Literal("desc")]),
      description: t.Union([t.Literal("asc"), t.Literal("desc")]),
      quantity: t.Union([t.Literal("asc"), t.Literal("desc")]),
      count: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
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
