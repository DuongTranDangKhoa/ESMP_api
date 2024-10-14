import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const LocationPlain = t.Object(
  {
    locationId: t.String({ additionalProperties: true }),
    eventId: t.String({ additionalProperties: true }),
    typeId: t.String({ additionalProperties: true }),
    vendorId: t.String({ additionalProperties: true }),
    shape: t.String({ additionalProperties: true }),
    direction: t.String({ additionalProperties: true }),
    x: __nullable__(t.Integer({ additionalProperties: true })),
    y: __nullable__(t.Integer({ additionalProperties: true })),
    length: __nullable__(t.Integer({ additionalProperties: true })),
    width: __nullable__(t.Integer({ additionalProperties: true })),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const LocationRelations = t.Object({}, { additionalProperties: true });

export const LocationPlainInputCreate = t.Object(
  {
    shape: t.String({ additionalProperties: true }),
    direction: t.String({ additionalProperties: true }),
    x: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    y: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    length: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    width: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const LocationPlainInputUpdate = t.Object(
  {
    shape: t.String({ additionalProperties: true }),
    direction: t.String({ additionalProperties: true }),
    x: __nullable__(t.Integer({ additionalProperties: true })),
    y: __nullable__(t.Integer({ additionalProperties: true })),
    length: __nullable__(t.Integer({ additionalProperties: true })),
    width: __nullable__(t.Integer({ additionalProperties: true })),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const LocationRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const LocationRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const LocationWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        locationId: t.String(),
        eventId: t.String(),
        typeId: t.String(),
        vendorId: t.String(),
        shape: t.String(),
        direction: t.String(),
        x: t.Integer(),
        y: t.Integer(),
        length: t.Integer(),
        width: t.Integer(),
        status: t.String(),
      }),
    { $id: "Location" },
  ),
  { additionalProperties: true },
);

export const LocationWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ locationId: t.String() })),
      t.Union([t.Object({ locationId: t.String() })]),
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
            locationId: t.String(),
            eventId: t.String(),
            typeId: t.String(),
            vendorId: t.String(),
            shape: t.String(),
            direction: t.String(),
            x: t.Integer(),
            y: t.Integer(),
            length: t.Integer(),
            width: t.Integer(),
            status: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Location" },
);

export const LocationSelect = t.Partial(
  t.Object(
    {
      locationId: t.Boolean(),
      eventId: t.Boolean(),
      typeId: t.Boolean(),
      vendorId: t.Boolean(),
      shape: t.Boolean(),
      direction: t.Boolean(),
      x: t.Boolean(),
      y: t.Boolean(),
      length: t.Boolean(),
      width: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const LocationInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const LocationOrderBy = t.Partial(
  t.Object(
    {
      locationId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      typeId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      shape: t.Union([t.Literal("asc"), t.Literal("desc")]),
      direction: t.Union([t.Literal("asc"), t.Literal("desc")]),
      x: t.Union([t.Literal("asc"), t.Literal("desc")]),
      y: t.Union([t.Literal("asc"), t.Literal("desc")]),
      length: t.Union([t.Literal("asc"), t.Literal("desc")]),
      width: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Location = t.Composite([LocationPlain, LocationRelations], {
  additionalProperties: true,
});

export const LocationInputCreate = t.Composite(
  [LocationPlainInputCreate, LocationRelationsInputCreate],
  { additionalProperties: true },
);

export const LocationInputUpdate = t.Composite(
  [LocationPlainInputUpdate, LocationRelationsInputUpdate],
  { additionalProperties: true },
);
