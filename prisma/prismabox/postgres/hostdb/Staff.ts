import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const staffPlain = t.Object(
  {
    staffid: t.String({ additionalProperties: true }),
    vendorId: t.String({ additionalProperties: true }),
    userid: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const staffRelations = t.Object(
  {
    account: t.Object(
      {
        id: t.String({ additionalProperties: true }),
        username: t.String({ additionalProperties: true }),
        password: t.String({ additionalProperties: true }),
        role: t.String({ additionalProperties: true }),
        name: t.String({ additionalProperties: true }),
        createdat: __nullable__(t.Date({ additionalProperties: true })),
        updatedat: __nullable__(t.Date({ additionalProperties: true })),
        status: __nullable__(t.Boolean({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
    vendor: t.Object(
      {
        vendorId: t.String({ additionalProperties: true }),
        userid: t.String({ additionalProperties: true }),
        hostid: t.String({ additionalProperties: true }),
        phone: __nullable__(t.String({ additionalProperties: true })),
        email: __nullable__(t.String({ additionalProperties: true })),
        address: __nullable__(t.String({ additionalProperties: true })),
        urlQr: __nullable__(t.String({ additionalProperties: true })),
        status: __nullable__(t.Boolean({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const staffPlainInputCreate = t.Object(
  {},
  { additionalProperties: true },
);

export const staffPlainInputUpdate = t.Object(
  {},
  { additionalProperties: true },
);

export const staffRelationsInputCreate = t.Object(
  {
    account: t.Object(
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
    vendor: t.Object(
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

export const staffRelationsInputUpdate = t.Partial(
  t.Object(
    {
      account: t.Object(
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
      vendor: t.Object(
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

export const staffWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        staffid: t.String(),
        vendorId: t.String(),
        userid: t.String(),
      }),
    { $id: "staff" },
  ),
  { additionalProperties: true },
);

export const staffWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(
        t.Object({
          staffid: t.String(),
          userid: t.String(),
          userid_vendorId: t.Object({
            userid: t.String(),
            vendorId: t.String(),
          }),
        }),
      ),
      t.Union([
        t.Object({ staffid: t.String() }),
        t.Object({ userid: t.String() }),
        t.Object({
          userid_vendorId: t.Object({
            userid: t.String(),
            vendorId: t.String(),
          }),
        }),
      ]),
      t.Partial(
        t.Object({
          AND: t.Union([Self, t.Array(Self)]),
          NOT: t.Union([Self, t.Array(Self)]),
          OR: t.Array(Self),
        }),
      ),
      t.Partial(
        t.Object(
          { staffid: t.String(), vendorId: t.String(), userid: t.String() },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "staff" },
);

export const staffSelect = t.Partial(
  t.Object(
    {
      staffid: t.Boolean(),
      vendorId: t.Boolean(),
      userid: t.Boolean(),
      account: t.Boolean(),
      vendor: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const staffInclude = t.Partial(
  t.Object(
    { account: t.Boolean(), vendor: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const staffOrderBy = t.Partial(
  t.Object(
    {
      staffid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      userid: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const staff = t.Composite([staffPlain, staffRelations], {
  additionalProperties: true,
});

export const staffInputCreate = t.Composite(
  [staffPlainInputCreate, staffRelationsInputCreate],
  { additionalProperties: true },
);

export const staffInputUpdate = t.Composite(
  [staffPlainInputUpdate, staffRelationsInputUpdate],
  { additionalProperties: true },
);
