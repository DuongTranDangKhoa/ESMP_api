import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MenuPlain = t.Object(
  {
    menuId: t.String({ additionalProperties: true }),
    menuName: t.String({ additionalProperties: true }),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const MenuRelations = t.Object(
  {
    vendorInEvent: t.Object(
      {
        vendorinEventId: t.String({ additionalProperties: true }),
        eventId: t.String({ additionalProperties: true }),
        vendorId: t.String({ additionalProperties: true }),
        status: __nullable__(t.String({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
    productItems: t.Array(
      t.Object(
        {
          productItemInMenuId: t.String({ additionalProperties: true }),
          productItemId: t.String({ additionalProperties: true }),
          menuId: t.String({ additionalProperties: true }),
          status: t.Boolean({ additionalProperties: true }),
        },
        { additionalProperties: true },
      ),
    ),
  },
  { additionalProperties: true },
);

export const MenuPlainInputCreate = t.Object(
  {
    menuName: t.String({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const MenuPlainInputUpdate = t.Object(
  {
    menuName: t.String({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const MenuRelationsInputCreate = t.Object(
  {
    vendorInEvent: t.Object(
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
    productItems: t.Optional(
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

export const MenuRelationsInputUpdate = t.Partial(
  t.Object(
    {
      vendorInEvent: t.Object(
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
      productItems: t.Partial(
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

export const MenuWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        menuId: t.String(),
        menuName: t.String(),
        createAt: t.Date(),
        updatedAt: t.Date(),
      }),
    { $id: "Menu" },
  ),
  { additionalProperties: true },
);

export const MenuWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ menuId: t.String() })),
      t.Union([t.Object({ menuId: t.String() })]),
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
            menuId: t.String(),
            menuName: t.String(),
            createAt: t.Date(),
            updatedAt: t.Date(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Menu" },
);

export const MenuSelect = t.Partial(
  t.Object(
    {
      menuId: t.Boolean(),
      menuName: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      vendorInEvent: t.Boolean(),
      productItems: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const MenuInclude = t.Partial(
  t.Object(
    {
      vendorInEvent: t.Boolean(),
      productItems: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const MenuOrderBy = t.Partial(
  t.Object(
    {
      menuId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      menuName: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Menu = t.Composite([MenuPlain, MenuRelations], {
  additionalProperties: true,
});

export const MenuInputCreate = t.Composite(
  [MenuPlainInputCreate, MenuRelationsInputCreate],
  { additionalProperties: true },
);

export const MenuInputUpdate = t.Composite(
  [MenuPlainInputUpdate, MenuRelationsInputUpdate],
  { additionalProperties: true },
);
