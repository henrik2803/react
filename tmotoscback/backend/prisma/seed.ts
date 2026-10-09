import { prisma } from "../src/lib/prisma";
import { ProductType } from "../src/generated/prisma/enums";

async function main() {
  await prisma.product.upsert({
    where: {
      slug: "yamaha-mt-07",
    },

    update: {},

    create: {
      slug: "yamaha-mt-07",
      name: "MT-07",
      brand: "Yamaha",
      type: ProductType.MOTO,
      category: "Motos",
      price: 52990,
    },
  });

  await prisma.product.upsert({
    where: {
      slug: "honda-cb-500f",
    },

    update: {},

    create: {
      slug: "honda-cb-500f",
      name: "CB 500F",
      brand: "Honda",
      type: ProductType.MOTO,
      category: "Motos",
      price: 41900,
    },
  });

  await prisma.product.upsert({
    where: {
      slug: "ls2-vector-ii",
    },

    update: {},

    create: {
      slug: "ls2-vector-ii",
      name: "Vector II",
      brand: "LS2",
      type: ProductType.ACCESSORY,
      category: "Capacetes",
      price: 1899.9,
    },
  });

  console.log("Seed executado com sucesso.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });