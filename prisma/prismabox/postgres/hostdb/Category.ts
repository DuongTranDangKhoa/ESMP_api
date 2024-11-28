import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CategoryPlain = t.Object(
  {
    categoryId: t.String({ additionalProperties: true }),
    categoryName: t.String({ additionalProperties: true }),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
    status: t.Boolean({ additionalProperties: true }),
    hostid: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const CategoryRelations = t.Object(
  {
    host: t.Object(
      {
        userid: t.String({ additionalProperties: true }),
        expiretime: __nullable__(t.Date({ additionalProperties: true })),
        bankingaccount: __nullable__(t.String({ additionalProperties: true })),
        phone: __nullable__(t.String({ additionalProperties: true })),
        email: __nullable__(t.String({ additionalProperties: true })),
        eventstoragetime: __nullable__(t.Date({ additionalProperties: true })),
        hostid: t.String({ additionalProperties: true }),
        apibanking: __nullable__(t.String({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
    products: t.Array(
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
  },
  { additionalProperties: true },
);

export const CategoryPlainInputCreate = t.Object(
  {
    categoryName: t.String({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(t.Boolean({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const CategoryPlainInputUpdate = t.Object(
  {
    categoryName: t.String({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(t.Boolean({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const CategoryRelationsInputCreate = t.Object(
  {
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
    products: t.Optional(
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

export const CategoryRelationsInputUpdate = t.Partial(
  t.Object(
    {
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
      products: t.Partial(
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

export const CategoryWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        categoryId: t.String(),
        categoryName: t.String(),
        createAt: t.Date(),
        updatedAt: t.Date(),
        status: t.Boolean(),
        hostid: t.String(),
      }),
    { $id: "Category" },
  ),
  { additionalProperties: true },
);

export const CategoryWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ categoryId: t.String() })),
      t.Union([t.Object({ categoryId: t.String() })]),
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
            categoryId: t.String(),
            categoryName: t.String(),
            createAt: t.Date(),
            updatedAt: t.Date(),
            status: t.Boolean(),
            hostid: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Category" },
);

export const CategorySelect = t.Partial(
  t.Object(
    {
      categoryId: t.Boolean(),
      categoryName: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      status: t.Boolean(),
      hostid: t.Boolean(),
      host: t.Boolean(),
      products: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const CategoryInclude = t.Partial(
  t.Object(
    { host: t.Boolean(), products: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const CategoryOrderBy = t.Partial(
  t.Object(
    {
      categoryId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      categoryName: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
      hostid: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Category = t.Composite([CategoryPlain, CategoryRelations], {
  additionalProperties: true,
});

export const CategoryInputCreate = t.Composite(
  [CategoryPlainInputCreate, CategoryRelationsInputCreate],
  { additionalProperties: true },
);

export const CategoryInputUpdate = t.Composite(
  [CategoryPlainInputUpdate, CategoryRelationsInputUpdate],
  { additionalProperties: true },
);
