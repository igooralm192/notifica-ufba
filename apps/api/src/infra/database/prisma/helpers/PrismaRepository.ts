import { PrismaDBClient } from '@/infra/database/prisma/helpers'

export class PrismaRepository {
  get client() {
    return PrismaDBClient.getInstance().client
  }
}
