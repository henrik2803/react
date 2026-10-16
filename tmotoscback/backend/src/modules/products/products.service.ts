import {
  prisma,
} from "../../lib/prisma.js";

import {
  toPublicProduct,
} from "./products.mapper.js";

export async function listProducts() {
  const products =
    await prisma.product.findMany({
      where: {
        active: true,
      },

      include: {
        colors: true,
        variants: true,
      },

      orderBy: {
        id: "asc",
      },
    });

  return products.map(
    toPublicProduct
  );
}

export async function findProductBySlug(
  slug: string
) {
  const product =
    await prisma.product.findFirst({
      where: {
        slug,
        active: true,
      },

      include: {
        colors: true,
        variants: true,
      },
    });

  if (!product) {
    return null;
  }

  return toPublicProduct(
    product
  );
}