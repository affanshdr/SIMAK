// lib/prisma.js
import { PrismaClient } from '@prisma/client';

// Cek apakah sudah di production
const globalForPrisma = global;

// Menggunakan instance PrismaClient yang sama untuk seluruh aplikasi
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}