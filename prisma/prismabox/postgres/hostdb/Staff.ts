import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const StaffPlain = t.Object(
  {
    staffId: t.String({ additionalProperties: true }),
    vendorId: t.String({ additionalProperties: true }),
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    image: t.String({ additionalProperties: true }),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
    status: __nullable__(t.Boolean({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const StaffRelations = t.Object({}, { additionalProperties: true });

export const StaffPlainInputCreate = t.Object(
  {
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    image: t.String({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const StaffPlainInputUpdate = t.Object(
  {
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    image: t.String({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const StaffRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const StaffRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const StaffWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        staffId: t.String(),
        vendorId: t.String(),
        username: t.String(),
        password: t.String(),
        name: t.String(),
        image: t.String(),
        createAt: t.Date(),
        updatedAt: t.Date(),
        status: t.Boolean(),
      }),
    { $id: "Staff" },
  ),
  { additionalProperties: true },
);

export const StaffWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ staffId: t.String(), username: t.String() })),
      t.Union([
        t.Object({ staffId: t.String() }),
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
            staffId: t.String(),
            vendorId: t.String(),
            username: t.String(),
            password: t.String(),
            name: t.String(),
            image: t.String(),
            createAt: t.Date(),
            updatedAt: t.Date(),
            status: t.Boolean(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Staff" },
);

export const StaffSelect = t.Partial(
  t.Object(
    {
      staffId: t.Boolean(),
      vendorId: t.Boolean(),
      username: t.Boolean(),
      password: t.Boolean(),
      name: t.Boolean(),
      image: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const StaffInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const StaffOrderBy = t.Partial(
  t.Object(
    {
      staffId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      username: t.Union([t.Literal("asc"), t.Literal("desc")]),
      password: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      image: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Staff = t.Composite([StaffPlain, StaffRelations], {
  additionalProperties: true,
});

export const StaffInputCreate = t.Composite(
  [StaffPlainInputCreate, StaffRelationsInputCreate],
  { additionalProperties: true },
);

export const StaffInputUpdate = t.Composite(
  [StaffPlainInputUpdate, StaffRelationsInputUpdate],
  { additionalProperties: true },
);