import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const AccountPlain = t.Object(
  {
    userId: t.String({ additionalProperties: true }),
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    role: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
    status: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const AccountRelations = t.Object({}, { additionalProperties: true });

export const AccountPlainInputCreate = t.Object(
  {
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    role: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const AccountPlainInputUpdate = t.Object(
  {
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    role: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const AccountRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const AccountRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const AccountWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        userId: t.String(),
        username: t.String(),
        password: t.String(),
        role: t.String(),
        name: t.String(),
        createAt: t.Date(),
        updatedAt: t.Date(),
        status: t.String(),
      }),
    { $id: "Account" },
  ),
  { additionalProperties: true },
);

export const AccountWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ userId: t.String(), username: t.String() })),
      t.Union([
        t.Object({ userId: t.String() }),
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
            userId: t.String(),
            username: t.String(),
            password: t.String(),
            role: t.String(),
            name: t.String(),
            createAt: t.Date(),
            updatedAt: t.Date(),
            status: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Account" },
);

export const AccountSelect = t.Partial(
  t.Object(
    {
      userId: t.Boolean(),
      username: t.Boolean(),
      password: t.Boolean(),
      role: t.Boolean(),
      name: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const AccountInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const AccountOrderBy = t.Partial(
  t.Object(
    {
      userId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      username: t.Union([t.Literal("asc"), t.Literal("desc")]),
      password: t.Union([t.Literal("asc"), t.Literal("desc")]),
      role: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Account = t.Composite([AccountPlain, AccountRelations], {
  additionalProperties: true,
});

export const AccountInputCreate = t.Composite(
  [AccountPlainInputCreate, AccountRelationsInputCreate],
  { additionalProperties: true },
);

export const AccountInputUpdate = t.Composite(
  [AccountPlainInputUpdate, AccountRelationsInputUpdate],
  { additionalProperties: true },
);
