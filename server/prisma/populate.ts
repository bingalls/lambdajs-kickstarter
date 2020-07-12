import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// A `main` function so that you can use async/await
async function main() {
  let promo = await prisma.promo.create({
    data: {
      organizer: 'Plugin America',
      venue: 'NY Auto Show',
      date: new Date('2020-06-01T00:00:00.000Z')
    }});
  console.log(promo);

  promo = await prisma.promo.create({
    data: {
      organizer: "Tesla",
      venue:     "CES",
      date:      new Date('2021-03-20')
    }});
  console.log(promo);
}

main()
.catch(e => {
  throw e;
})
.finally(async () => {
  await prisma.disconnect();
});
