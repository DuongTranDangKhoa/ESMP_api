import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const StaffPlain = t.Object(
  {
    staffId: t.String({ additionalProperties: true }),
    eventId: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const StaffRelations = t.Object({}, { additionalProperties: true });

export const StaffPlainInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const StaffPlainInputUpdate = t.Object(
  {},
  { additionalProperties: true },
);

export const StaffRelationsInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const StaffRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: true }),
  { additionalProperties: true },
);

export const StaffWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        staffId: t.String(),
        eventId: t.String(),
      }),
    { $id: "Staff" },
  ),
  { additionalProperties: true },
);

export const StaffWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ staffId: t.String() })),
      t.Union([t.Object({ staffId: t.String() })]),
      t.Partial(
        t.Object({
          AND: t.Union([Self, t.Array(Self)]),
          NOT: t.Union([Self, t.Array(Self)]),
          OR: t.Array(Self),
        }),
      ),
      t.Partial(
        t.Object(
          { staffId: t.String(), eventId: t.String() },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Staff" },
);

export const StaffSelect = t.Partial(
  t.Object(
    { staffId: t.Boolean(), eventId: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const StaffInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: true }),
  { additionalProperties: true },
);

export const StaffOrderBy = t.Partial(
  t.Object(
    {
      staffId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventId: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Staff = t.Composite([StaffPlain, StaffRelations], {
  additionalProperties: true,
});

export const StaffInputCreate = t.Composite(
  [StaffPlainInputCreate, StaffRelationsInputCreate],
  { additionalProperties: true },
);

export const StaffInputUpdate = t.Composite(
  [StaffPlainInputUpdate, StaffRelationsInputUpdate],
  { additionalProperties: true },
);
