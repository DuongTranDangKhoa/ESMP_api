import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const notificationPlain = t.Object(
  {
    id: t.String({ additionalProperties: true }),
    userid: t.String({ additionalProperties: true }),
    source: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const notificationRelations = t.Object(
  {
    account: t.Object(
      {
        id: t.String({ additionalProperties: true }),
        username: t.String({ additionalProperties: true }),
        password: t.String({ additionalProperties: true }),
        role: t.String({ additionalProperties: true }),
        name: t.String({ additionalProperties: true }),
        createdat: __nullable__(t.Date({ additionalProperties: true })),
        updatedat: __nullable__(t.Date({ additionalProperties: true })),
        status: __nullable__(t.Boolean({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const notificationPlainInputCreate = t.Object(
  {
    source: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const notificationPlainInputUpdate = t.Object(
  { source: __nullable__(t.String({ additionalProperties: true })) },
  { additionalProperties: true },
);

export const notificationRelationsInputCreate = t.Object(
  {
    account: t.Object(
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

export const notificationRelationsInputUpdate = t.Partial(
  t.Object(
    {
      account: t.Object(
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

export const notificationWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.String(),
        userid: t.String(),
        source: t.String(),
      }),
    { $id: "notification" },
  ),
  { additionalProperties: true },
);

export const notificationWhereUnique = t.Recursive(
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
          { id: t.String(), userid: t.String(), source: t.String() },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "notification" },
);

export const notificationSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userid: t.Boolean(),
      source: t.Boolean(),
      account: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const notificationInclude = t.Partial(
  t.Object(
    { account: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const notificationOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      userid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      source: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const notification = t.Composite(
  [notificationPlain, notificationRelations],
  { additionalProperties: true },
);

export const notificationInputCreate = t.Composite(
  [notificationPlainInputCreate, notificationRelationsInputCreate],
  { additionalProperties: true },
);

export const notificationInputUpdate = t.Composite(
  [notificationPlainInputUpdate, notificationRelationsInputUpdate],
  { additionalProperties: true },
);
