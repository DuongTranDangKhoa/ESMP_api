import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SessionDataPlain = t.Object(
  {
    accessToken: t.String({ additionalProperties: true }),
    createdAt: t.Integer({ additionalProperties: true }),
    expiredAt: t.Integer({ additionalProperties: true }),
    updatedAt: t.Integer({ additionalProperties: true }),
    sessionInfo: t.Any({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const SessionDataRelations = t.Object(
  {},
  { additionalProperties: true },
);

export const SessionDataPlainInputCreate = t.Object(
  {
    createdAt: t.Integer({ additionalProperties: true }),
    expiredAt: t.Integer({ additionalProperties: true }),
    updatedAt: t.Integer({ additionalProperties: true }),
    sessionInfo: t.Any({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const SessionDataPlainInputUpdate = t.Object(
  {
    createdAt: t.Integer({ additionalProperties: true }),
    expiredAt: t.Integer({ additionalProperties: true }),
    updatedAt: t.Integer({ additionalProperties: true }),
    sessionInfo: t.Any({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const SessionDataRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const SessionDataRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const SessionDataWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        accessToken: t.String(),
        createdAt: t.Integer(),
        expiredAt: t.Integer(),
        updatedAt: t.Integer(),
        sessionInfo: t.Any(),
      }),
    { $id: "SessionData" },
  ),
  { additionalProperties: true },
);

export const SessionDataWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ accessToken: t.String() })),
      t.Union([t.Object({ accessToken: t.String() })]),
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
            accessToken: t.String(),
            createdAt: t.Integer(),
            expiredAt: t.Integer(),
            updatedAt: t.Integer(),
            sessionInfo: t.Any(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "SessionData" },
);

export const SessionDataSelect = t.Partial(
  t.Object(
    {
      accessToken: t.Boolean(),
      createdAt: t.Boolean(),
      expiredAt: t.Boolean(),
      updatedAt: t.Boolean(),
      sessionInfo: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const SessionDataInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const SessionDataOrderBy = t.Partial(
  t.Object(
    {
      accessToken: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      expiredAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      sessionInfo: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const SessionData = t.Composite(
  [SessionDataPlain, SessionDataRelations],
  { additionalProperties: true },
);

export const SessionDataInputCreate = t.Composite(
  [SessionDataPlainInputCreate, SessionDataRelationsInputCreate],
  { additionalProperties: true },
);

export const SessionDataInputUpdate = t.Composite(
  [SessionDataPlainInputUpdate, SessionDataRelationsInputUpdate],
  { additionalProperties: true },
);
