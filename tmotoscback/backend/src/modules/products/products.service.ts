import {
  prisma,
} from "../../lib/prisma.js";

import {
  toPublicProduct,
} from "./products.mapper.js";

export async function listProducts() {
  const products =
    await prisma.product.findMany({
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
    await prisma.product.findUnique({
      where: {
        slug,
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