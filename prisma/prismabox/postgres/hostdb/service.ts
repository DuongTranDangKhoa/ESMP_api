import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const servicePlain = t.Object(
  {
    id: t.String({ additionalProperties: true }),
    eventid: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    price: t.Number({ additionalProperties: true }),
    quantity: t.Integer({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const serviceRelations = t.Object(
  {
    event: t.Object(
      {
        eventId: t.String({ additionalProperties: true }),
        name: t.String({ additionalProperties: true }),
        description: __nullable__(t.String({ additionalProperties: true })),
        startDate: __nullable__(t.Date({ additionalProperties: true })),
        endDate: __nullable__(t.Date({ additionalProperties: true })),
        coordinates: __nullable__(t.String({ additionalProperties: true })),
        createAt: __nullable__(t.Date({ additionalProperties: true })),
        updatedAt: __nullable__(t.Date({ additionalProperties: true })),
        x: __nullable__(t.Integer({ additionalProperties: true })),
        y: __nullable__(t.Integer({ additionalProperties: true })),
        profit: t.Number({ additionalProperties: true }),
        status: __nullable__(t.String({ additionalProperties: true })),
        height: __nullable__(t.Integer({ additionalProperties: true })),
        hostId: t.String({ additionalProperties: true }),
        stageValue: __nullable__(t.String({ additionalProperties: true })),
        themeId: t.String({ additionalProperties: true }),
        width: __nullable__(t.Integer({ additionalProperties: true })),
        onWeb: __nullable__(t.Boolean({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const servicePlainInputCreate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    price: t.Number({ additionalProperties: true }),
    quantity: t.Integer({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const servicePlainInputUpdate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    price: t.Number({ additionalProperties: true }),
    quantity: t.Integer({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const serviceRelationsInputCreate = t.Object(
  {
    event: t.Object(
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

export const serviceRelationsInputUpdate = t.Partial(
  t.Object(
    {
      event: t.Object(
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

export const serviceWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.String(),
        eventid: t.String(),
        name: t.String(),
        price: t.Number(),
        quantity: t.Integer(),
      }),
    { $id: "service" },
  ),
  { additionalProperties: true },
);

export const serviceWhereUnique = t.Recursive(
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
            eventid: t.String(),
            name: t.String(),
            price: t.Number(),
            quantity: t.Integer(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "service" },
);

export const serviceSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      eventid: t.Boolean(),
      name: t.Boolean(),
      price: t.Boolean(),
      quantity: t.Boolean(),
      event: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const serviceInclude = t.Partial(
  t.Object(
    { event: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const serviceOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      price: t.Union([t.Literal("asc"), t.Literal("desc")]),
      quantity: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const service = t.Composite([servicePlain, serviceRelations], {
  additionalProperties: true,
});

export const serviceInputCreate = t.Composite(
  [servicePlainInputCreate, serviceRelationsInputCreate],
  { additionalProperties: true },
);

export const serviceInputUpdate = t.Composite(
  [servicePlainInputUpdate, serviceRelationsInputUpdate],
  { additionalProperties: true },
);
