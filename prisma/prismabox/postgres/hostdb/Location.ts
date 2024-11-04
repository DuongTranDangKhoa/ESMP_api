import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const LocationPlain = t.Object(
  {
    locationId: t.String({ additionalProperties: true }),
    typeId: t.String({ additionalProperties: true }),
    shape: t.String({ additionalProperties: true }),
    rotation: __nullable__(t.Integer({ additionalProperties: true })),
    x: __nullable__(t.Integer({ additionalProperties: true })),
    y: __nullable__(t.Integer({ additionalProperties: true })),
    heigth: __nullable__(t.Integer({ additionalProperties: true })),
    width: __nullable__(t.Integer({ additionalProperties: true })),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const LocationRelations = t.Object(
  {
    EventPayment: t.Array(
      t.Object(
        {
          eventPaymentid: t.String({ additionalProperties: true }),
          locationId: t.String({ additionalProperties: true }),
          deposit: t.Number({ additionalProperties: true }),
          depositPaymentDate: __nullable__(
            t.Date({ additionalProperties: true }),
          ),
          total: t.Number({ additionalProperties: true }),
          totalPaymentDate: __nullable__(
            t.Date({ additionalProperties: true }),
          ),
          createDate: __nullable__(t.Date({ additionalProperties: true })),
          status: __nullable__(t.String({ additionalProperties: true })),
          vendorinEventId: t.String({ additionalProperties: true }),
        },
        { additionalProperties: true },
      ),
    ),
    LocationType: __nullable__(
      t.Object(
        {
          typeId: t.String({ additionalProperties: true }),
          eventId: t.String({ additionalProperties: true }),
          typeName: __nullable__(t.String({ additionalProperties: true })),
          price: t.Number({ additionalProperties: true }),
          status: __nullable__(t.String({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
  },
  { additionalProperties: true },
);

export const LocationPlainInputCreate = t.Object(
  {
    shape: t.Optional(t.String({ additionalProperties: true })),
    rotation: t.Optional(
      __nullable__(t.Integer({ additionalProperties: true })),
    ),
    x: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    y: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    heigth: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    width: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const LocationPlainInputUpdate = t.Object(
  {
    shape: t.Optional(t.String({ additionalProperties: true })),
    rotation: __nullable__(t.Integer({ additionalProperties: true })),
    x: __nullable__(t.Integer({ additionalProperties: true })),
    y: __nullable__(t.Integer({ additionalProperties: true })),
    heigth: __nullable__(t.Integer({ additionalProperties: true })),
    width: __nullable__(t.Integer({ additionalProperties: true })),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const LocationRelationsInputCreate = t.Object(
  {
    EventPayment: t.Optional(
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
    LocationType: t.Optional(
      t.Object(
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
    ),
  },
  { additionalProperties: true },
);

export const LocationRelationsInputUpdate = t.Partial(
  t.Object(
    {
      EventPayment: t.Partial(
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
      LocationType: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: true }),
              },
              { additionalProperties: true },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    },
    { additionalProperties: true },
  ),
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
        typeId: t.String(),
        shape: t.String(),
        rotation: t.Integer(),
        x: t.Integer(),
        y: t.Integer(),
        heigth: t.Integer(),
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
            typeId: t.String(),
            shape: t.String(),
            rotation: t.Integer(),
            x: t.Integer(),
            y: t.Integer(),
            heigth: t.Integer(),
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
      typeId: t.Boolean(),
      shape: t.Boolean(),
      rotation: t.Boolean(),
      x: t.Boolean(),
      y: t.Boolean(),
      heigth: t.Boolean(),
      width: t.Boolean(),
      status: t.Boolean(),
      EventPayment: t.Boolean(),
      LocationType: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const LocationInclude = t.Partial(
  t.Object(
    {
      EventPayment: t.Boolean(),
      LocationType: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const LocationOrderBy = t.Partial(
  t.Object(
    {
      locationId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      typeId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      shape: t.Union([t.Literal("asc"), t.Literal("desc")]),
      rotation: t.Union([t.Literal("asc"), t.Literal("desc")]),
      x: t.Union([t.Literal("asc"), t.Literal("desc")]),
      y: t.Union([t.Literal("asc"), t.Literal("desc")]),
      heigth: t.Union([t.Literal("asc"), t.Literal("desc")]),
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
