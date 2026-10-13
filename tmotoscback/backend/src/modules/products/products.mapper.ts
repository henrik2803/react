import type {
  Prisma,
} from "../../generated/prisma/client.js";

type ProductWithRelations =
  Prisma.ProductGetPayload<{
    include: {
      colors: true;
      variants: true;
    };
  }>;

export function toPublicProduct(
  product: ProductWithRelations
) {
  const colorKeyById =
    new Map(
      product.colors.map(
        (color) => [
          color.id,
          color.key,
        ]
      )
    );

  return {
    id: product.id,

    type:
      product.type === "MOTO"
        ? "moto"
        : "accessory",

    category:
      product.category,

    subcategory:
      product.subcategory,

    brand:
      product.brand,

    name:
      product.name,

    slug:
      product.slug,

    condition:
      product.condition,

    shortDescription:
      product.shortDescription,

    description:
      product.description,

    price:
      Number(product.price),

    oldPrice:
      product.oldPrice === null
        ? null
        : Number(
            product.oldPrice
          ),

    installment: {
      enabled:
        product.installmentEnabled,

      installments:
        product.installmentCount,

      value:
        product.installmentValue ===
        null
          ? null
          : Number(
              product.installmentValue
            ),
    },

    media: {
      cover:
        product.coverUrl,

      images:
        product.images,

      video:
        product.videoUrl,
    },

    colors:
      product.colors.map(
        (color) => ({
          id: color.key,
          name: color.name,
          hex: color.hex,
        })
      ),

    variants:
      product.variants.map(
        (variant) => ({
          id: variant.key,

          colorId:
            variant.colorId === null
              ? null
              : colorKeyById.get(
                  variant.colorId
                ) ?? null,

          size:
            variant.size,

          stock:
            variant.stock,
        })
      ),

    specs:
      product.specs ?? {},

    badges:
      product.badges,

    stock: {
      available:
        product.stockAvailable,

      quantity:
        product.stockQuantity,
    },

    sales: {
      purchasableOnline:
        product.purchasableOnline,

      requestQuote:
        product.requestQuote,

      testRide:
        product.testRide,

      whatsapp:
        product.whatsapp,
    },

    feed: {
      enabled:
        product.feedEnabled,

      featured:
        product.feedFeatured,

      order:
        product.feedOrder,

      text:
        product.feedText,
    },

    tags:
      product.tags,

    seo: {
      title:
        product.seoTitle,

      description:
        product.seoDescription,
    },
  };
}