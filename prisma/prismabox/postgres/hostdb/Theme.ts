import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const ThemePlain = t.Object(
  {
    themeId: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    status: __nullable__(t.Boolean({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const ThemeRelations = t.Object({}, { additionalProperties: true });

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
  {},
  { additionalProperties: true },
);

export const ThemeRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
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
          { themeId: t.String(), name: t.String(), status: t.Boolean() },
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
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ThemeInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const ThemeOrderBy = t.Partial(
  t.Object(
    {
      themeId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
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
