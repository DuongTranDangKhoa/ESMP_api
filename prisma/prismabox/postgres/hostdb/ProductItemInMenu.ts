import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProductItemInMenuPlain = t.Object(
  {
    productItemInMenuId: t.String({ additionalProperties: true }),
    productItemId: t.String({ additionalProperties: true }),
    menuId: t.String({ additionalProperties: true }),
    status: t.Boolean({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const ProductItemInMenuRelations = t.Object(
  {
    menu: t.Object(
      {
        menuId: t.String({ additionalProperties: true }),
        menuName: t.String({ additionalProperties: true }),
        createAt: __nullable__(t.Date({ additionalProperties: true })),
        updatedAt: __nullable__(t.Date({ additionalProperties: true })),
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

export const ProductItemInMenuPlainInputCreate = t.Object(
  { status: t.Optional(t.Boolean({ additionalProperties: true })) },
  { additionalProperties: true },
);

export const ProductItemInMenuPlainInputUpdate = t.Object(
  { status: t.Optional(t.Boolean({ additionalProperties: true })) },
  { additionalProperties: true },
);

export const ProductItemInMenuRelationsInputCreate = t.Object(
  {
    menu: t.Object(
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

export const ProductItemInMenuRelationsInputUpdate = t.Partial(
  t.Object(
    {
      menu: t.Object(
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

export const ProductItemInMenuWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        productItemInMenuId: t.String(),
        productItemId: t.String(),
        menuId: t.String(),
        status: t.Boolean(),
      }),
    { $id: "ProductItemInMenu" },
  ),
  { additionalProperties: true },
);

export const ProductItemInMenuWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ productItemInMenuId: t.String() })),
      t.Union([t.Object({ productItemInMenuId: t.String() })]),
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
            productItemInMenuId: t.String(),
            productItemId: t.String(),
            menuId: t.String(),
            status: t.Boolean(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "ProductItemInMenu" },
);

export const ProductItemInMenuSelect = t.Partial(
  t.Object(
    {
      productItemInMenuId: t.Boolean(),
      productItemId: t.Boolean(),
      menuId: t.Boolean(),
      status: t.Boolean(),
      menu: t.Boolean(),
      productItem: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductItemInMenuInclude = t.Partial(
  t.Object(
    { menu: t.Boolean(), productItem: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductItemInMenuOrderBy = t.Partial(
  t.Object(
    {
      productItemInMenuId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      productItemId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      menuId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductItemInMenu = t.Composite(
  [ProductItemInMenuPlain, ProductItemInMenuRelations],
  { additionalProperties: true },
);

export const ProductItemInMenuInputCreate = t.Composite(
  [ProductItemInMenuPlainInputCreate, ProductItemInMenuRelationsInputCreate],
  { additionalProperties: true },
);

export const ProductItemInMenuInputUpdate = t.Composite(
  [ProductItemInMenuPlainInputUpdate, ProductItemInMenuRelationsInputUpdate],
  { additionalProperties: true },
);
