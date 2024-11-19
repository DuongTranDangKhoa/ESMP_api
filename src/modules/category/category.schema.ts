import { Category } from "../../../prisma/clients/postgres/hostdb";
import { t } from 'elysia';
export type CategoryType = Category
export class CategoryObject {
    categoryId?: string
    name: string
    description: string
    status?: boolean
    hostId?: string
    constructor(data: any) {
        this.categoryId = data.categoryId
        this.name = data.name
        this.description = data.description
        this.status = data.status
        this.hostId = data.hostId
    }
}

export const CreateCategorySchema = t.Object({
  categoryName: t.String({ minLength: 1, error: 'Category Name is required' }),
  hostid: t.String({ format: 'uuid', error: 'Invalid Host ID' }),
  status: t.Optional(t.Boolean({ error: 'Status must be true or false' })),
});


export const UpdateCategorySchema = t.Object({
  categoryName: t.String({ minLength: 1, error: 'Category Name is required' }),
  status: t.Optional(t.Boolean({ error: 'Status must be true or false' })),
});

export const CategoryParamsSchema = t.Required(
  t.Object({
    categoryId: t.String({ format: 'uuid', error: 'Invalid Category ID' }),
  }),
   {
      error: 'Category ID not provived',
    },
);


export const HostParamsSchema = t.Required(
  t.Object({
    hostId: t.String({ format: 'uuid', error: 'Invalid Host ID' }),
  }),
   {
      error: 'Host ID not provived',
    },
);