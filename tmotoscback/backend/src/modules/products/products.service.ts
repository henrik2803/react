import {
  prisma,
} from "../../lib/prisma.js";

export async function listProducts() {
  return prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

export async function findProductBySlug(
  slug: string
) {
  return prisma.product.findUnique({
    where: {
      slug,
    },
  });
}