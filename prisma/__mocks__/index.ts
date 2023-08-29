import { PrismaClient } from '@prisma/client'; 
import { URL } from 'url'; 

if (!process.env.DATABASE_URL) {
  throw new Error('please provide a database url');
}

const url = new URL(process.env.DATABASE_URL).toString();
export const prisma = new PrismaClient({
  datasources: { db: { url } },
}); 
 
const schemaId = url.split('=')[1] 

// eslint-disable-next-line no-undef
afterEach(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
  await prisma.$disconnect();
});