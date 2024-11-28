import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ConfigPlain = t.Object(
  {
    configId: t.String({ additionalProperties: true }),
    sessionDuration: __nullable__(t.Integer({ additionalProperties: true })),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    createBy: __nullable__(t.String({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedBy: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const ConfigRelations = t.Object({}, { additionalProperties: true });

export const ConfigPlainInputCreate = t.Object(
  {
    sessionDuration: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    createBy: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedBy: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
  },
  { additionalProperties: true },
);

export const ConfigPlainInputUpdate = t.Object(
  {
    sessionDuration: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    createBy: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedBy: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
  },
  { additionalProperties: true },
);

export const ConfigRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const ConfigRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const ConfigWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        configId: t.String(),
        sessionDuration: t.Integer(),
        createAt: t.Date(),
        createBy: t.String(),
        updatedAt: t.Date(),
        updatedBy: t.String(),
      }),
    { $id: "Config" },
  ),
  { additionalProperties: true },
);

export const ConfigWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ configId: t.String() })),
      t.Union([t.Object({ configId: t.String() })]),
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
            configId: t.String(),
            sessionDuration: t.Integer(),
            createAt: t.Date(),
            createBy: t.String(),
            updatedAt: t.Date(),
            updatedBy: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Config" },
);

export const ConfigSelect = t.Partial(
  t.Object(
    {
      configId: t.Boolean(),
      sessionDuration: t.Boolean(),
      createAt: t.Boolean(),
      createBy: t.Boolean(),
      updatedAt: t.Boolean(),
      updatedBy: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ConfigInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const ConfigOrderBy = t.Partial(
  t.Object(
    {
      configId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      sessionDuration: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createBy: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedBy: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Config = t.Composite([ConfigPlain, ConfigRelations], {
  additionalProperties: true,
});

export const ConfigInputCreate = t.Composite(
  [ConfigPlainInputCreate, ConfigRelationsInputCreate],
  { additionalProperties: true },
);

export const ConfigInputUpdate = t.Composite(
  [ConfigPlainInputUpdate, ConfigRelationsInputUpdate],
  { additionalProperties: true },
);
