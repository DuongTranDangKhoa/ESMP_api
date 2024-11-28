import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const RenamedpackagePlain = t.Object(
  {
    id: t.String({ additionalProperties: true }),
    name: __nullable__(t.String({ additionalProperties: true })),
    description: __nullable__(t.String({ additionalProperties: true })),
    eventstoragetime: __nullable__(t.Integer({ additionalProperties: true })),
    createdat: __nullable__(t.Date({ additionalProperties: true })),
    updatedat: __nullable__(t.Date({ additionalProperties: true })),
    status: __nullable__(t.Boolean({ additionalProperties: true })),
    price: __nullable__(t.Number({ additionalProperties: true })),
    expiretime: __nullable__(t.Integer({ additionalProperties: true })),
  },
  {
    additionalProperties: true,
    description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
  },
);

export const RenamedpackageRelations = t.Object(
  {
    transaction: t.Array(
      t.Object(
        {
          id: t.String({ additionalProperties: true }),
          hostid: t.String({ additionalProperties: true }),
          packageid: t.String({ additionalProperties: true }),
          createdat: __nullable__(t.Date({ additionalProperties: true })),
          status: __nullable__(t.String({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
  },
  {
    additionalProperties: true,
    description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
  },
);

export const RenamedpackagePlainInputCreate = t.Object(
  {
    name: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
    description: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    eventstoragetime: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
    createdat: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedat: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
    price: t.Optional(__nullable__(t.Number({ additionalProperties: true }))),
    expiretime: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
  },
  {
    additionalProperties: true,
    description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
  },
);

export const RenamedpackagePlainInputUpdate = t.Object(
  {
    name: __nullable__(t.String({ additionalProperties: true })),
    description: __nullable__(t.String({ additionalProperties: true })),
    eventstoragetime: __nullable__(t.Integer({ additionalProperties: true })),
    createdat: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedat: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
    price: __nullable__(t.Number({ additionalProperties: true })),
    expiretime: __nullable__(t.Integer({ additionalProperties: true })),
  },
  {
    additionalProperties: true,
    description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
  },
);

export const RenamedpackageRelationsInputCreate = t.Object(
  {
    transaction: t.Optional(
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
  {
    additionalProperties: true,
    description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
  },
);

export const RenamedpackageRelationsInputUpdate = t.Partial(
  t.Object(
    {
      transaction: t.Partial(
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
    {
      additionalProperties: true,
      description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
    },
  ),
  { additionalProperties: true },
);

export const RenamedpackageWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self)]),
          NOT: t.Union([Self, t.Array(Self)]),
          OR: t.Array(Self),
          id: t.String(),
          name: t.String(),
          description: t.String(),
          eventstoragetime: t.Integer(),
          createdat: t.Date(),
          updatedat: t.Date(),
          status: t.Boolean(),
          price: t.Number(),
          expiretime: t.Integer(),
        },
        {
          description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
        },
      ),
    { $id: "Renamedpackage" },
  ),
  { additionalProperties: true },
);

export const RenamedpackageWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(
        t.Object(
          { id: t.String() },
          {
            description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
          },
        ),
      ),
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
            name: t.String(),
            description: t.String(),
            eventstoragetime: t.Integer(),
            createdat: t.Date(),
            updatedat: t.Date(),
            status: t.Boolean(),
            price: t.Number(),
            expiretime: t.Integer(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Renamedpackage" },
);

export const RenamedpackageSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      description: t.Boolean(),
      eventstoragetime: t.Boolean(),
      createdat: t.Boolean(),
      updatedat: t.Boolean(),
      status: t.Boolean(),
      price: t.Boolean(),
      expiretime: t.Boolean(),
      transaction: t.Boolean(),
      _count: t.Boolean(),
    },
    {
      additionalProperties: true,
      description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
    },
  ),
  { additionalProperties: true },
);

export const RenamedpackageInclude = t.Partial(
  t.Object(
    { transaction: t.Boolean(), _count: t.Boolean() },
    {
      additionalProperties: true,
      description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
    },
  ),
  { additionalProperties: true },
);

export const RenamedpackageOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      description: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventstoragetime: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdat: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedat: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
      price: t.Union([t.Literal("asc"), t.Literal("desc")]),
      expiretime: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    {
      additionalProperties: true,
      description: `This model has been renamed to 'Renamedpackage' during introspection, because the original name 'package' is reserved.`,
    },
  ),
  { additionalProperties: true },
);

export const Renamedpackage = t.Composite(
  [RenamedpackagePlain, RenamedpackageRelations],
  { additionalProperties: true },
);

export const RenamedpackageInputCreate = t.Composite(
  [RenamedpackagePlainInputCreate, RenamedpackageRelationsInputCreate],
  { additionalProperties: true },
);

export const RenamedpackageInputUpdate = t.Composite(
  [RenamedpackagePlainInputUpdate, RenamedpackageRelationsInputUpdate],
  { additionalProperties: true },
);
