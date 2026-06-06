import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prismaInstance: PrismaClient | undefined
}

const getPrisma = (): PrismaClient => {
  if (!globalForPrisma.prismaInstance) {
    globalForPrisma.prismaInstance = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    })
  }
  return globalForPrisma.prismaInstance
}

export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const instance = getPrisma()
    const value = Reflect.get(instance, prop)
    if (typeof value === 'function') {
      return value.bind(instance)
    }
    return value
  },
})

