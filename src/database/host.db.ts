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

export type HostDbClient = PrismaClient
