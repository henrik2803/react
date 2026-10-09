import {
  Product,
} from "../../generated/prisma/client.js";

export function toPublicProduct(
  product: Product
) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    type: product.type,
    category: product.category,

    price:
      Number(product.price),
  };
}