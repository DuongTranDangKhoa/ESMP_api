import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ThemePlain = t.Object(
  {
    themeId: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    status: __nullable__(t.Boolean({ additionalProperties: true })),
    hostid: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const ThemeRelations = t.Object(
  {
    event: t.Array(
      t.Object(
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
    ),
    host: t.Object(
      {
        userid: t.String({ additionalProperties: true }),
        expiretime: __nullable__(t.Date({ additionalProperties: true })),
        bankingaccount: __nullable__(t.String({ additionalProperties: true })),
        phone: __nullable__(t.String({ additionalProperties: true })),
        email: __nullable__(t.String({ additionalProperties: true })),
        eventstoragetime: __nullable__(t.Date({ additionalProperties: true })),
        hostid: t.String({ additionalProperties: true }),
        apibanking: __nullable__(t.String({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const ThemePlainInputCreate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const ThemePlainInputUpdate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const ThemeRelationsInputCreate = t.Object(
  {
    event: t.Optional(
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
    host: t.Object(
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

export const ThemeRelationsInputUpdate = t.Partial(
  t.Object(
    {
      event: t.Partial(
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
      host: t.Object(
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

export const ThemeWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        themeId: t.String(),
        name: t.String(),
        status: t.Boolean(),
        hostid: t.String(),
      }),
    { $id: "Theme" },
  ),
  { additionalProperties: true },
);

export const ThemeWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ themeId: t.String() })),
      t.Union([t.Object({ themeId: t.String() })]),
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
            themeId: t.String(),
            name: t.String(),
            status: t.Boolean(),
            hostid: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Theme" },
);

export const ThemeSelect = t.Partial(
  t.Object(
    {
      themeId: t.Boolean(),
      name: t.Boolean(),
      status: t.Boolean(),
      hostid: t.Boolean(),
      event: t.Boolean(),
      host: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ThemeInclude = t.Partial(
  t.Object(
    { event: t.Boolean(), host: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ThemeOrderBy = t.Partial(
  t.Object(
    {
      themeId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
      hostid: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Theme = t.Composite([ThemePlain, ThemeRelations], {
  additionalProperties: true,
});

export const ThemeInputCreate = t.Composite(
  [ThemePlainInputCreate, ThemeRelationsInputCreate],
  { additionalProperties: true },
);

export const ThemeInputUpdate = t.Composite(
  [ThemePlainInputUpdate, ThemeRelationsInputUpdate],
  { additionalProperties: true },
);
