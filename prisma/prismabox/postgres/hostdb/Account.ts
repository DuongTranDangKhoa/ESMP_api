import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const AccountPlain = t.Object(
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
);

export const AccountRelations = t.Object(
  {
    host: __nullable__(
      t.Object(
        {
          userid: t.String({ additionalProperties: true }),
          expiretime: __nullable__(t.Date({ additionalProperties: true })),
          bankingaccount: __nullable__(
            t.String({ additionalProperties: true }),
          ),
          phone: __nullable__(t.String({ additionalProperties: true })),
          email: __nullable__(t.String({ additionalProperties: true })),
          eventstoragetime: __nullable__(
            t.Date({ additionalProperties: true }),
          ),
          hostid: t.String({ additionalProperties: true }),
          apibanking: __nullable__(t.String({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
    notification: t.Array(
      t.Object(
        {
          id: t.String({ additionalProperties: true }),
          userid: t.String({ additionalProperties: true }),
          source: __nullable__(t.String({ additionalProperties: true })),
          create_at: __nullable__(t.Date({ additionalProperties: true })),
          status: __nullable__(t.Boolean({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
    staff: __nullable__(
      t.Object(
        {
          staffid: t.String({ additionalProperties: true }),
          vendorId: t.String({ additionalProperties: true }),
          userid: t.String({ additionalProperties: true }),
        },
        { additionalProperties: true },
      ),
    ),
    vendor: __nullable__(
      t.Object(
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
    ),
  },
  { additionalProperties: true },
);

export const AccountPlainInputCreate = t.Object(
  {
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    role: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    createdat: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedat: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const AccountPlainInputUpdate = t.Object(
  {
    username: t.String({ additionalProperties: true }),
    password: t.String({ additionalProperties: true }),
    role: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    createdat: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedat: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(__nullable__(t.Boolean({ additionalProperties: true }))),
  },
  { additionalProperties: true },
);

export const AccountRelationsInputCreate = t.Object(
  {
    host: t.Optional(
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
    notification: t.Optional(
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
    staff: t.Optional(
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
    vendor: t.Optional(
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

export const AccountRelationsInputUpdate = t.Partial(
  t.Object(
    {
      host: t.Partial(
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
      notification: t.Partial(
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
      staff: t.Partial(
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
      vendor: t.Partial(
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

export const AccountWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.String(),
        username: t.String(),
        password: t.String(),
        role: t.String(),
        name: t.String(),
        createdat: t.Date(),
        updatedat: t.Date(),
        status: t.Boolean(),
      }),
    { $id: "Account" },
  ),
  { additionalProperties: true },
);

export const AccountWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ id: t.String(), username: t.String() })),
      t.Union([
        t.Object({ id: t.String() }),
        t.Object({ username: t.String() }),
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
          {
            id: t.String(),
            username: t.String(),
            password: t.String(),
            role: t.String(),
            name: t.String(),
            createdat: t.Date(),
            updatedat: t.Date(),
            status: t.Boolean(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Account" },
);

export const AccountSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      username: t.Boolean(),
      password: t.Boolean(),
      role: t.Boolean(),
      name: t.Boolean(),
      createdat: t.Boolean(),
      updatedat: t.Boolean(),
      status: t.Boolean(),
      host: t.Boolean(),
      notification: t.Boolean(),
      staff: t.Boolean(),
      vendor: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const AccountInclude = t.Partial(
  t.Object(
    {
      host: t.Boolean(),
      notification: t.Boolean(),
      staff: t.Boolean(),
      vendor: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const AccountOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      username: t.Union([t.Literal("asc"), t.Literal("desc")]),
      password: t.Union([t.Literal("asc"), t.Literal("desc")]),
      role: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createdat: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedat: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Account = t.Composite([AccountPlain, AccountRelations], {
  additionalProperties: true,
});

export const AccountInputCreate = t.Composite(
  [AccountPlainInputCreate, AccountRelationsInputCreate],
  { additionalProperties: true },
);

export const AccountInputUpdate = t.Composite(
  [AccountPlainInputUpdate, AccountRelationsInputUpdate],
  { additionalProperties: true },
);
