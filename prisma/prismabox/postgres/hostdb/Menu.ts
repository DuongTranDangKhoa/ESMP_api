import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const MenuPlain = t.Object(
  {
    menuId: t.String({ additionalProperties: true }),
    eventId: t.String({ additionalProperties: true }),
    vendorId: t.String({ additionalProperties: true }),
    menuName: t.String({ additionalProperties: true }),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const MenuRelations = t.Object({}, { additionalProperties: true });

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
  {},
  { additionalProperties: true },
);

export const MenuRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
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
        eventId: t.String(),
        vendorId: t.String(),
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
      t.Partial(t.Object({})),
      t.Union([]),
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
            eventId: t.String(),
            vendorId: t.String(),
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
      eventId: t.Boolean(),
      vendorId: t.Boolean(),
      menuName: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const MenuInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const MenuOrderBy = t.Partial(
  t.Object(
    {
      menuId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorId: t.Union([t.Literal("asc"), t.Literal("desc")]),
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
