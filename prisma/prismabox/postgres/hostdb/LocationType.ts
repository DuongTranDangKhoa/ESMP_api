import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const LocationTypePlain = t.Object(
  {
    typeId: t.String({ additionalProperties: true }),
    eventId: t.String({ additionalProperties: true }),
    typeName: __nullable__(t.String({ additionalProperties: true })),
    price: t.Number({ additionalProperties: true }),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const LocationTypeRelations = t.Object(
  {
    location: t.Array(
      t.Object(
        {
          locationId: t.String({ additionalProperties: true }),
          typeId: t.String({ additionalProperties: true }),
          shape: t.String({ additionalProperties: true }),
          x: __nullable__(t.Integer({ additionalProperties: true })),
          y: __nullable__(t.Integer({ additionalProperties: true })),
          width: __nullable__(t.Integer({ additionalProperties: true })),
          status: __nullable__(t.String({ additionalProperties: true })),
          height: __nullable__(t.Integer({ additionalProperties: true })),
          rotation: __nullable__(t.Integer({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
    Event: t.Object(
      {
        eventId: t.String({ additionalProperties: true }),
        name: t.String({ additionalProperties: true }),
        description: __nullable__(t.String({ additionalProperties: true })),
        startDate: __nullable__(t.Date({ additionalProperties: true })),
        endDate: __nullable__(t.Date({ additionalProperties: true })),
        venue: __nullable__(t.String({ additionalProperties: true })),
        createAt: __nullable__(t.Date({ additionalProperties: true })),
        updatedAt: __nullable__(t.Date({ additionalProperties: true })),
        x: __nullable__(t.Integer({ additionalProperties: true })),
        y: __nullable__(t.Integer({ additionalProperties: true })),
        profit: t.Number({ additionalProperties: true }),
        status: __nullable__(t.String({ additionalProperties: true })),
        height: __nullable__(t.Integer({ additionalProperties: true })),
        hostId: __nullable__(t.String({ additionalProperties: true })),
        stageValue: __nullable__(t.String({ additionalProperties: true })),
        themeId: __nullable__(t.String({ additionalProperties: true })),
        thumbnail: __nullable__(t.String({ additionalProperties: true })),
        width: __nullable__(t.Integer({ additionalProperties: true })),
        onWeb: __nullable__(t.Boolean({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const LocationTypePlainInputCreate = t.Object(
  {
    typeName: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    price: t.Number({ additionalProperties: true }),
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const LocationTypePlainInputUpdate = t.Object(
  {
    typeName: __nullable__(t.String({ additionalProperties: true })),
    price: t.Number({ additionalProperties: true }),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const LocationTypeRelationsInputCreate = t.Object(
  {
    location: t.Optional(
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
    Event: t.Object(
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

export const LocationTypeRelationsInputUpdate = t.Partial(
  t.Object(
    {
      location: t.Partial(
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
      Event: t.Object(
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
      location: t.Boolean(),
      Event: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const LocationTypeInclude = t.Partial(
  t.Object(
    { location: t.Boolean(), Event: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
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
