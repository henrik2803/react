import {
  prisma,
} from "../../lib/prisma.js";

export class AdminProductError
  extends Error {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number
  ) {
    super(message);

    this.name =
      "AdminProductError";

    this.statusCode =
      statusCode;
  }
}

const productInclude = {
  colors: true,
  variants: true,
};

function mapProduct(product: any) {
  const colorKeyById =
    new Map(
      product.colors.map(
        (color: any) => [
          color.id,
          color.key,
        ]
      )
    );

  return {
    id: product.id,

    type: product.type,

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

    active:
      product.active,

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

      count:
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

    colors:
      product.colors.map(
        (color: any) => ({
          id: color.id,
          key: color.key,
          name: color.name,
          hex: color.hex,
        })
      ),

    variants:
      product.variants.map(
        (variant: any) => ({
          id: variant.id,
          key: variant.key,

          colorId:
            variant.colorId,

          colorKey:
            variant.colorId ===
            null
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

    createdAt:
      product.createdAt,

    updatedAt:
      product.updatedAt,
  };
}

export async function listAdminProducts() {
  const products =
    await prisma.product.findMany({
      include:
        productInclude,

      orderBy: {
        id: "asc",
      },
    });

  return products.map(
    mapProduct
  );
}

export async function getAdminProduct(
  id: number
) {
  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },

      include:
        productInclude,
    });

  if (!product) {
    throw new AdminProductError(
      "Produto não encontrado.",
      404
    );
  }

  return mapProduct(product);
}

export async function updateAdminProductStatus(
  id: number,
  active: boolean
) {
  const product =
    await prisma.product.findUnique({
      where: {
        id,
      },
    });

  if (!product) {
    throw new AdminProductError(
      "Produto não encontrado.",
      404
    );
  }

  const updated =
    await prisma.product.update({
      where: {
        id,
      },

      data: {
        active,
      },

      include:
        productInclude,
    });

  return mapProduct(updated);
}