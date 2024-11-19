import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const hostPlain = t.Object(
  {
    userid: t.String({ additionalProperties: true }),
    expiretime: __nullable__(t.Date({ additionalProperties: true })),
    bankingaccount: __nullable__(t.String({ additionalProperties: true })),
    phone: __nullable__(t.String({ additionalProperties: true })),
    email: __nullable__(t.String({ additionalProperties: true })),
    eventstoragetime: __nullable__(t.Date({ additionalProperties: true })),
    hostid: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const hostRelations = t.Object(
  {
    category: t.Array(
      t.Object(
        {
          categoryId: t.String({ additionalProperties: true }),
          categoryName: t.String({ additionalProperties: true }),
          createAt: __nullable__(t.Date({ additionalProperties: true })),
          updatedAt: __nullable__(t.Date({ additionalProperties: true })),
          status: t.Boolean({ additionalProperties: true }),
          hostid: t.String({ additionalProperties: true }),
        },
        { additionalProperties: true },
      ),
    ),
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
    account: t.Object(
      {
        id: t.String({ additionalProperties: true }),
        username: t.String({ additionalProperties: true }),
        password: t.String({ additionalProperties: true }),
        role: __nullable__(t.String({ additionalProperties: true })),
        name: __nullable__(t.String({ additionalProperties: true })),
        createdat: __nullable__(t.Date({ additionalProperties: true })),
        updatedat: __nullable__(t.Date({ additionalProperties: true })),
        status: __nullable__(t.Boolean({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
    theme: t.Array(
      t.Object(
        {
          themeId: t.String({ additionalProperties: true }),
          name: t.String({ additionalProperties: true }),
          status: __nullable__(t.Boolean({ additionalProperties: true })),
          hostid: t.String({ additionalProperties: true }),
        },
        { additionalProperties: true },
      ),
    ),
    transaction: t.Array(
      t.Object(
        {
          id: t.String({ additionalProperties: true }),
          hostid: t.String({ additionalProperties: true }),
          packageid: t.String({ additionalProperties: true }),
          createdat: __nullable__(t.Date({ additionalProperties: true })),
          status: __nullable__(t.String({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
    vendor: t.Array(
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

export const hostPlainInputCreate = t.Object(
  {
    expiretime: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
    bankingaccount: t.Optional(
      __nullable__(t.String({ additionalProperties: true })),
    ),
    phone: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
    email: t.Optional(__nullable__(t.String({ additionalProperties: true }))),
    eventstoragetime: t.Optional(
      __nullable__(t.Date({ additionalProperties: true })),
    ),
  },
  { additionalProperties: true },
);

export const hostPlainInputUpdate = t.Object(
  {
    expiretime: __nullable__(t.Date({ additionalProperties: true })),
    bankingaccount: __nullable__(t.String({ additionalProperties: true })),
    phone: __nullable__(t.String({ additionalProperties: true })),
    email: __nullable__(t.String({ additionalProperties: true })),
    eventstoragetime: __nullable__(t.Date({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const hostRelationsInputCreate = t.Object(
  {
    category: t.Optional(
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
    theme: t.Optional(
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
    transaction: t.Optional(
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
    vendor: t.Optional(
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

export const hostRelationsInputUpdate = t.Partial(
  t.Object(
    {
      category: t.Partial(
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
      theme: t.Partial(
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
      transaction: t.Partial(
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
      vendor: t.Partial(
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

export const hostWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        userid: t.String(),
        expiretime: t.Date(),
        bankingaccount: t.String(),
        phone: t.String(),
        email: t.String(),
        eventstoragetime: t.Date(),
        hostid: t.String(),
      }),
    { $id: "host" },
  ),
  { additionalProperties: true },
);

export const hostWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ userid: t.String(), hostid: t.String() })),
      t.Union([
        t.Object({ userid: t.String() }),
        t.Object({ hostid: t.String() }),
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
            userid: t.String(),
            expiretime: t.Date(),
            bankingaccount: t.String(),
            phone: t.String(),
            email: t.String(),
            eventstoragetime: t.Date(),
            hostid: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "host" },
);

export const hostSelect = t.Partial(
  t.Object(
    {
      userid: t.Boolean(),
      expiretime: t.Boolean(),
      bankingaccount: t.Boolean(),
      phone: t.Boolean(),
      email: t.Boolean(),
      eventstoragetime: t.Boolean(),
      hostid: t.Boolean(),
      category: t.Boolean(),
      event: t.Boolean(),
      account: t.Boolean(),
      theme: t.Boolean(),
      transaction: t.Boolean(),
      vendor: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const hostInclude = t.Partial(
  t.Object(
    {
      category: t.Boolean(),
      event: t.Boolean(),
      account: t.Boolean(),
      theme: t.Boolean(),
      transaction: t.Boolean(),
      vendor: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const hostOrderBy = t.Partial(
  t.Object(
    {
      userid: t.Union([t.Literal("asc"), t.Literal("desc")]),
      expiretime: t.Union([t.Literal("asc"), t.Literal("desc")]),
      bankingaccount: t.Union([t.Literal("asc"), t.Literal("desc")]),
      phone: t.Union([t.Literal("asc"), t.Literal("desc")]),
      email: t.Union([t.Literal("asc"), t.Literal("desc")]),
      eventstoragetime: t.Union([t.Literal("asc"), t.Literal("desc")]),
      hostid: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const host = t.Composite([hostPlain, hostRelations], {
  additionalProperties: true,
});

export const hostInputCreate = t.Composite(
  [hostPlainInputCreate, hostRelationsInputCreate],
  { additionalProperties: true },
);

export const hostInputUpdate = t.Composite(
  [hostPlainInputUpdate, hostRelationsInputUpdate],
  { additionalProperties: true },
);
