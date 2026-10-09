import {
  prisma,
} from "../../lib/prisma.js";

import {
  toPublicProduct,
} from "./products.mapper.js";

export async function listProducts() {
  const products =
    await prisma.product.findMany({
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
    });

  if (!product) {
    return null;
  }

  return toPublicProduct(
    product
  );
}