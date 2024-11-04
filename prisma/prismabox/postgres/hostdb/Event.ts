import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const EventPlain = t.Object(
  {
    eventId: t.String({ additionalProperties: true }),
    hostId: __nullable__(t.String({ additionalProperties: true })),
    themeId: __nullable__(t.String({ additionalProperties: true })),
    name: t.String({ additionalProperties: true }),
    description: __nullable__(t.String({ additionalProperties: true })),
    thumbnail: __nullable__(t.String({ additionalProperties: true })),
    stageValue: __nullable__(t.String({ additionalProperties: true })),
    startDate: __nullable__(t.Date({ additionalProperties: true })),
    endDate: __nullable__(t.Date({ additionalProperties: true })),
    venue: __nullable__(t.String({ additionalProperties: true })),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
    height: __nullable__(t.Integer({ additionalProperties: true })),
    width: __nullable__(t.Integer({ additionalProperties: true })),
    x: __nullable__(t.Integer({ additionalProperties: true })),
    y: __nullable__(t.Integer({ additionalProperties: true })),
    onWeb: __nullable__(t.Boolean({ additionalProperties: true })),
    profit: t.Number({ additionalProperties: true }),
    status: __nullable__(t.String({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const EventRelations = t.Object(
  {
    VendorInEvent: t.Array(
      t.Object(
        {
          vendorinEventId: t.String({ additionalProperties: true }),
          eventId: t.String({ additionalProperties: true }),
          vendorId: t.String({ additionalProperties: true }),
          status: __nullable__(t.Boolean({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
    LocationType: t.Array(
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

export const EventPlainInputCreate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    description: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    thumbnail: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    stageValue: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    startDate: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    endDate: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    venue: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    height: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    width: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    x: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    y: t.Optional(__nullable__(t.Integer({ additionalProperties: true }))),
    onWeb: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
    profit: t.Number({ additionalProperties: true }),
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const EventPlainInputUpdate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    description: __nullable__(t.String({ additionalProperties: true })),
    thumbnail: __nullable__(t.String({ additionalProperties: true })),
    stageValue: __nullable__(t.String({ additionalProperties: true })),
    startDate: __nullable__(t.Date({ additionalProperties: true })),
    endDate: __nullable__(t.Date({ additionalProperties: true })),
    venue: __nullable__(t.String({ additionalProperties: true })),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    height: __nullable__(t.Integer({ additionalProperties: true })),
    width: __nullable__(t.Integer({ additionalProperties: true })),
    x: __nullable__(t.Integer({ additionalProperties: true })),
    y: __nullable__(t.Integer({ additionalProperties: true })),
    onWeb: __nullable__(t.Boolean({ additionalProperties: true })),
    profit: t.Number({ additionalProperties: true }),
    status: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const EventRelationsInputCreate = t.Object(
  {
    VendorInEvent: t.Optional(
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
  { additionalProperties: true },
);

export const EventRelationsInputUpdate = t.Partial(
  t.Object(
    {
      VendorInEvent: t.Partial(
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
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const EventWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        eventId: t.String(),
        hostId: t.String(),
        themeId: t.String(),
        name: t.String(),
        description: t.String(),
        thumbnail: t.String(),
        stageValue: t.String(),
        startDate: t.Date(),
        endDate: t.Date(),
        venue: t.String(),
        createAt: t.Date(),
        updatedAt: t.Date(),
        height: t.Integer(),
        width: t.Integer(),
        x: t.Integer(),
        y: t.Integer(),
        onWeb: t.Boolean(),
        profit: t.Number(),
        status: t.String(),
      }),
    { $id: "Event" },
  ),
  { additionalProperties: true },
);

export const EventWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ eventId: t.String() })),
      t.Union([t.Object({ eventId: t.String() })]),
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
            eventId: t.String(),
            hostId: t.String(),
            themeId: t.String(),
            name: t.String(),
            description: t.String(),
            thumbnail: t.String(),
            stageValue: t.String(),
            startDate: t.Date(),
            endDate: t.Date(),
            venue: t.String(),
            createAt: t.Date(),
            updatedAt: t.Date(),
            height: t.Integer(),
            width: t.Integer(),
            x: t.Integer(),
            y: t.Integer(),
            onWeb: t.Boolean(),
            profit: t.Number(),
            status: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Event" },
);

export const EventSelect = t.Partial(
  t.Object(
    {
      eventId: t.Boolean(),
      hostId: t.Boolean(),
      themeId: t.Boolean(),
      name: t.Boolean(),
      description: t.Boolean(),
      thumbnail: t.Boolean(),
      stageValue: t.Boolean(),
      startDate: t.Boolean(),
      endDate: t.Boolean(),
      venue: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      height: t.Boolean(),
      width: t.Boolean(),
      x: t.Boolean(),
      y: t.Boolean(),
      onWeb: t.Boolean(),
      profit: t.Boolean(),
      status: t.Boolean(),
      VendorInEvent: t.Boolean(),
      LocationType: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const EventInclude = t.Partial(
  t.Object(
    {
      VendorInEvent: t.Boolean(),
      LocationType: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const EventOrderBy = t.Partial(
  t.Object(
    {
      eventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      hostId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      themeId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      description: t.Union([t.Literal("asc"), t.Literal("desc")]),
      thumbnail: t.Union([t.Literal("asc"), t.Literal("desc")]),
      stageValue: t.Union([t.Literal("asc"), t.Literal("desc")]),
      startDate: t.Union([t.Literal("asc"), t.Literal("desc")]),
      endDate: t.Union([t.Literal("asc"), t.Literal("desc")]),
      venue: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      height: t.Union([t.Literal("asc"), t.Literal("desc")]),
      width: t.Union([t.Literal("asc"), t.Literal("desc")]),
      x: t.Union([t.Literal("asc"), t.Literal("desc")]),
      y: t.Union([t.Literal("asc"), t.Literal("desc")]),
      onWeb: t.Union([t.Literal("asc"), t.Literal("desc")]),
      profit: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Event = t.Composite([EventPlain, EventRelations], {
  additionalProperties: true,
});

export const EventInputCreate = t.Composite(
  [EventPlainInputCreate, EventRelationsInputCreate],
  { additionalProperties: true },
);

export const EventInputUpdate = t.Composite(
  [EventPlainInputUpdate, EventRelationsInputUpdate],
  { additionalProperties: true },
);
