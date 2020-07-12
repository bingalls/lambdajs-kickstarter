require('dotenv').config();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const rows = async () => {
  await prisma.connect();
  try {
    const promos = await prisma.promo.findMany({
      // take: 2
    });
    console.dir(promos);
    return promos;
  } catch (error) {
    console.error(error);
    return error;
  } finally {
    prisma.disconnect();
  }
};
rows();
