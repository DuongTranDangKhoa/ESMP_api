import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const LocationTypePlain = t.Object(
  {
    typeId: t.String({ additionalProperties: true }),
    eventId: t.String({ additionalProperties: true }),
    typeName: t.String({ additionalProperties: true }),
    price: t.Number({ additionalProperties: true }),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const LocationTypeRelations = t.Object(
  {},
  { additionalProperties: true },
);

export const LocationTypePlainInputCreate = t.Object(
  {
    typeName: t.String({ additionalProperties: true }),
    price: t.Number({ additionalProperties: true }),
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const LocationTypePlainInputUpdate = t.Object(
  {
    typeName: t.String({ additionalProperties: true }),
    price: t.Number({ additionalProperties: true }),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const LocationTypeRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const LocationTypeRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const LocationTypeWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        typeId: t.String(),
        eventId: t.String(),
        typeName: t.String(),
        price: t.Number(),
        status: t.String(),
      }),
    { $id: "LocationType" },
  ),
  { additionalProperties: true },
);

export const LocationTypeWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ typeId: t.String() })),
      t.Union([t.Object({ typeId: t.String() })]),
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
            typeId: t.String(),
            eventId: t.String(),
            typeName: t.String(),
            price: t.Number(),
            status: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "LocationType" },
);

export const LocationTypeSelect = t.Partial(
  t.Object(
    {
      typeId: t.Boolean(),
      eventId: t.Boolean(),
      typeName: t.Boolean(),
      price: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const LocationTypeInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const LocationTypeOrderBy = t.Partial(
  t.Object(
    {
      typeId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      typeName: t.Union([t.Literal("asc"), t.Literal("desc")]),
      price: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const LocationType = t.Composite(
  [LocationTypePlain, LocationTypeRelations],
  { additionalProperties: true },
);

export const LocationTypeInputCreate = t.Composite(
  [LocationTypePlainInputCreate, LocationTypeRelationsInputCreate],
  { additionalProperties: true },
);

export const LocationTypeInputUpdate = t.Composite(
  [LocationTypePlainInputUpdate, LocationTypeRelationsInputUpdate],
  { additionalProperties: true },
);
