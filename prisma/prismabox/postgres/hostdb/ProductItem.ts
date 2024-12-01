import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProductItemPlain = t.Object(
  {
    productItemId: t.String({ additionalProperties: true }),
    name: t.String({ additionalProperties: true }),
    description: t.String({ additionalProperties: true }),
    price: t.Number({ additionalProperties: true }),
    createAt: __nullable__(t.Date({ additionalProperties: true })),
    updatedAt: __nullable__(t.Date({ additionalProperties: true })),
    status: t.Boolean({ additionalProperties: true }),
    vendorId: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const ProductItemRelations = t.Object(
  {
    orderDetails: t.Array(
      t.Object(
        {
          orderDetailId: t.String({ additionalProperties: true }),
          productitemId: t.String({ additionalProperties: true }),
          orderId: t.String({ additionalProperties: true }),
          quantity: __nullable__(t.Integer({ additionalProperties: true })),
          unitPrice: t.Number({ additionalProperties: true }),
          totalPrice: t.Number({ additionalProperties: true }),
        },
        { additionalProperties: true },
      ),
    ),
    vendor: t.Object(
      {
        vendorId: t.String({ additionalProperties: true }),
        userid: t.String({ additionalProperties: true }),
        hostid: t.String({ additionalProperties: true }),
        address: __nullable__(t.String({ additionalProperties: true })),
        urlQr: __nullable__(t.String({ additionalProperties: true })),
      },
      { additionalProperties: true },
    ),
    ProductInProductItem: t.Array(
      t.Object(
        {
          productInProductItemId: t.String({ additionalProperties: true }),
          productItemId: t.String({ additionalProperties: true }),
          productId: t.String({ additionalProperties: true }),
          unit: t.String({ additionalProperties: true }),
          quantity: __nullable__(t.Integer({ additionalProperties: true })),
        },
        { additionalProperties: true },
      ),
    ),
    menus: t.Array(
      t.Object(
        {
          productItemInMenuId: t.String({ additionalProperties: true }),
          productItemId: t.String({ additionalProperties: true }),
          menuId: t.String({ additionalProperties: true }),
          status: t.Boolean({ additionalProperties: true }),
        },
        { additionalProperties: true },
      ),
    ),
  },
  { additionalProperties: true },
);

export const ProductItemPlainInputCreate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    description: t.String({ additionalProperties: true }),
    price: t.Number({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(t.Boolean({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const ProductItemPlainInputUpdate = t.Object(
  {
    name: t.String({ additionalProperties: true }),
    description: t.String({ additionalProperties: true }),
    price: t.Number({ additionalProperties: true }),
    createAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    updatedAt: t.Optional(__nullable__(t.Date({ additionalProperties: true }))),
    status: t.Optional(t.Boolean({ additionalProperties: true })),
  },
  { additionalProperties: true },
);

export const ProductItemRelationsInputCreate = t.Object(
  {
    orderDetails: t.Optional(
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
    ProductInProductItem: t.Optional(
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
    menus: t.Optional(
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

export const ProductItemRelationsInputUpdate = t.Partial(
  t.Object(
    {
      orderDetails: t.Partial(
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
      ProductInProductItem: t.Partial(
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
      menus: t.Partial(
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

export const ProductItemWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        productItemId: t.String(),
        name: t.String(),
        description: t.String(),
        price: t.Number(),
        createAt: t.Date(),
        updatedAt: t.Date(),
        status: t.Boolean(),
        vendorId: t.String(),
      }),
    { $id: "ProductItem" },
  ),
  { additionalProperties: true },
);

export const ProductItemWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ productItemId: t.String() })),
      t.Union([t.Object({ productItemId: t.String() })]),
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
            productItemId: t.String(),
            name: t.String(),
            description: t.String(),
            price: t.Number(),
            createAt: t.Date(),
            updatedAt: t.Date(),
            status: t.Boolean(),
            vendorId: t.String(),
          },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "ProductItem" },
);

export const ProductItemSelect = t.Partial(
  t.Object(
    {
      productItemId: t.Boolean(),
      name: t.Boolean(),
      description: t.Boolean(),
      price: t.Boolean(),
      createAt: t.Boolean(),
      updatedAt: t.Boolean(),
      status: t.Boolean(),
      vendorId: t.Boolean(),
      orderDetails: t.Boolean(),
      vendor: t.Boolean(),
      ProductInProductItem: t.Boolean(),
      menus: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductItemInclude = t.Partial(
  t.Object(
    {
      orderDetails: t.Boolean(),
      vendor: t.Boolean(),
      ProductInProductItem: t.Boolean(),
      menus: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductItemOrderBy = t.Partial(
  t.Object(
    {
      productItemId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      name: t.Union([t.Literal("asc"), t.Literal("desc")]),
      description: t.Union([t.Literal("asc"), t.Literal("desc")]),
      price: t.Union([t.Literal("asc"), t.Literal("desc")]),
      createAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
      status: t.Union([t.Literal("asc"), t.Literal("desc")]),
      vendorId: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const ProductItem = t.Composite(
  [ProductItemPlain, ProductItemRelations],
  { additionalProperties: true },
);

export const ProductItemInputCreate = t.Composite(
  [ProductItemPlainInputCreate, ProductItemRelationsInputCreate],
  { additionalProperties: true },
);

export const ProductItemInputUpdate = t.Composite(
  [ProductItemPlainInputUpdate, ProductItemRelationsInputUpdate],
  { additionalProperties: true },
);
