import { PrismaClient } from '../../prisma/clients/postgres/hostdb'

export function getHostDbClient(hostCode: string) {
  const hostDbClient = new PrismaClient({
    datasources: {
      db: {
        url: (Bun.env.HOST_DB_CONNECTION_PREFIX as string) + `_${hostCode}`,
      },
    },
  })
  return hostDbClient
}
export const hostDb: HostDbClient = new PrismaClient({
  datasources: {
    db: {
      url: (Bun.env.HOST_DB_CONNECTION_PREFIX as string) + `_default`,
    },
  },
});
export type HostDbClient = PrismaClient
