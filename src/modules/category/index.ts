import { t } from "elysia";
import { HostDbClient } from "../../database/dbClient.db";
import * as categorySchema from "./category.schema";
import categoryService from "./category.service";

export const categoryGroup = (app: any) =>
  app

    .group('/:categoryId', (app: any) =>
      app
        .guard({
          params: categorySchema.CategoryParamsSchema,
        })
        .get('/', async ({ params, hostDb }: { params: any; hostDb: HostDbClient }) => {
          const { categoryId } = params;
          return await categoryService.getCategoryById(categoryId, hostDb);
        })
        .put('/', async ({ params, body, hostDb }: { params: any; body: any; hostDb: HostDbClient }) => {
          const { categoryId } = params;
          await categoryService.updateCategory(categoryId, body, hostDb);
          return { message: 'Update successfully Category' };
        },{
            body: categorySchema.UpdateCategorySchema,
        })
        .delete('/', async ({ params, hostDb }: { params: any; hostDb: HostDbClient }) => {
          const { categoryId } = params;
          await categoryService.deleteCategory(categoryId, hostDb);
          return { message: 'Delete successfully Category' };
        }),
    )

    .group('/host/:hostId', (app: any) =>
      app
        .guard({
          params: categorySchema.HostParamsSchema,
        })
        .get('/', async ({ params, hostDb }: { params: any; hostDb: HostDbClient }) => {
          const { hostId } = params;
          return await categoryService.getCategory(hostId, hostDb);
        }),
    )

    .post('/', async ({ body, hostDb }: { body: any; hostDb: HostDbClient }) => {
      await categoryService.createCategory(body, hostDb);
      return { message: 'Create successfully Category' };
    },
    {
      body: categorySchema.CreateCategorySchema,
    }
);