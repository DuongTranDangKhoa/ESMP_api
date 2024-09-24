import { PrismaClient } from '../../prisma/clients/postgres/masterdb'

export type MasterDbClient = PrismaClient

export const masterDb = new PrismaClient()
