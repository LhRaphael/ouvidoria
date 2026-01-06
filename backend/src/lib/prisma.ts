import { PrismaClient } from '@prisma/client'

// Evita múltiplas instâncias no hot-reload do desenvolvimento
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()
