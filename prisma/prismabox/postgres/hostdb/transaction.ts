import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const transactionPlain = t.Object(
  {
    id: t.String({ additionalProperties: true }),
    hostid: t.String({ additionalProperties: true }),
    packageid: t.String({ additionalProperties: true }),
    createdat: __nullable__(t.Date({ additionalProperties: true })),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const transactionRelations = t.Object(
  {
    Renamedpackage: t.Object(
      {
        id: t.String({ additionalProperties: true }),
        name: __nullable__(t.String({ additionalProperties: true })),
        description: __nullable__(t.String({ additionalProperties: true })),
        eventstoragetime: __nullable__(
          t.Integer({ additionalProperties: true }),
        ),
        createdat: __nullable__(t.Date({ additionalProperties: true })),
        updatedat: __nullable__(t.Date({ additionalProperties: true })),
        status: __nullable__(t.Boolean({ additionalProperties: true })),
        price: __nullable__(t.Number({ additionalProperties: true })),
      },
      {
        additionalProperties: true,
        description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
      },
    ),
  },
  { additionalProperties: true },
);

export const transactionPlainInputCreate = t.Object(
  {
    createdat: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const transactionPlainInputUpdate = t.Object(
  {
    createdat: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const transactionRelationsInputCreate = t.Object(
  {
    Renamedpackage: t.Object(
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

export const transactionRelationsInputUpdate = t.Partial(
  t.Object(
    {
      Renamedpackage: t.Object(
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

export const transactionWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.String(),
        hostid: t.String(),
        packageid: t.String(),
        createdat: t.Date(),
        status: t.String(),
      }),
    { $id: "transaction" },
  ),
  { additionalProperties: true },
);

export const transactionWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ id: t.String() })),
      t.Union([t.Object({ id: t.String() })]),
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
            id: t.String(),
            hostid: t.String(),
            packageid: t.String(),
            createdat: t.Date(),
            status: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "transaction" },
);

export const transactionSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      hostid: t.Boolean(),
      packageid: t.Boolean(),
      createdat: t.Boolean(),
      status: t.Boolean(),
      Renamedpackage: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const transactionInclude = t.Partial(
  t.Object(
    { Renamedpackage: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const transactionOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      hostid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      packageid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdat: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const transaction = t.Composite(
  [transactionPlain, transactionRelations],
  { additionalProperties: true },
);

export const transactionInputCreate = t.Composite(
  [transactionPlainInputCreate, transactionRelationsInputCreate],
  { additionalProperties: true },
);

export const transactionInputUpdate = t.Composite(
  [transactionPlainInputUpdate, transactionRelationsInputUpdate],
  { additionalProperties: true },
);
