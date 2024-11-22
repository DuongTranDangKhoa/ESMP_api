import { PrismaClient } from '../../prisma/clients/postgres/hostdb'


export const hostDb: HostDbClient = new PrismaClient({
  datasources: {
    db: {
      url: (Bun.env.DEFAULT_HOST_DB_CONNECTION_STRING as string),
    },
  },
});
export type HostDbClient = PrismaClient
