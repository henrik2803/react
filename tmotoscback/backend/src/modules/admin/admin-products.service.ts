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

type ProductData = {
  type?:
    | "MOTO"
    | "ACCESSORY"
    | "PART";

  category?: string;
  subcategory?: string | null;

  brand?: string;
  name?: string;
  slug?: string;

  active?: boolean;

  condition?: string | null;

  shortDescription?:
    | string
    | null;

  description?:
    | string
    | null;

  price?: number;
  oldPrice?: number | null;

  installment?: {
    enabled?: boolean;
    count?: number | null;
    value?: number | null;
  };

  media?: {
    cover?: string | null;
    images?: string[];
    video?: string | null;
  };

  specs?: Record<
    string,
    unknown
  >;

  badges?: string[];

  stock?: {
    available?: boolean;
    quantity?: number | null;
  };

  sales?: {
    purchasableOnline?: boolean;
    requestQuote?: boolean;
    testRide?: boolean;
    whatsapp?: boolean;
  };

  feed?: {
    enabled?: boolean;
    featured?: boolean;
    order?: number | null;
    text?: string | null;
  };

  tags?: string[];

  seo?: {
    title?: string | null;
    description?:
      | string
      | null;
  };
};

function mapProduct(
  product: any
) {
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

function buildProductData(
  data: ProductData
) {
  return {
    ...(data.type !== undefined && {
      type: data.type,
    }),

    ...(data.category !==
      undefined && {
      category:
        data.category.trim(),
    }),

    ...(data.subcategory !==
      undefined && {
      subcategory:
        data.subcategory,
    }),

    ...(data.brand !== undefined && {
      brand:
        data.brand.trim(),
    }),

    ...(data.name !== undefined && {
      name:
        data.name.trim(),
    }),

    ...(data.slug !== undefined && {
      slug:
        data.slug.trim(),
    }),

    ...(data.active !== undefined && {
      active:
        data.active,
    }),

    ...(data.condition !==
      undefined && {
      condition:
        data.condition,
    }),

    ...(data.shortDescription !==
      undefined && {
      shortDescription:
        data.shortDescription,
    }),

    ...(data.description !==
      undefined && {
      description:
        data.description,
    }),

    ...(data.price !== undefined && {
      price:
        data.price,
    }),

    ...(data.oldPrice !==
      undefined && {
      oldPrice:
        data.oldPrice,
    }),

    ...(data.installment
      ?.enabled !== undefined && {
      installmentEnabled:
        data.installment.enabled,
    }),

    ...(data.installment
      ?.count !== undefined && {
      installmentCount:
        data.installment.count,
    }),

    ...(data.installment
      ?.value !== undefined && {
      installmentValue:
        data.installment.value,
    }),

    ...(data.media?.cover !==
      undefined && {
      coverUrl:
        data.media.cover,
    }),

    ...(data.media?.images !==
      undefined && {
      images:
        data.media.images,
    }),

    ...(data.media?.video !==
      undefined && {
      videoUrl:
        data.media.video,
    }),

    ...(data.specs !== undefined && {
      specs:
        data.specs,
    }),

    ...(data.badges !== undefined && {
      badges:
        data.badges,
    }),

    ...(data.stock
      ?.available !== undefined && {
      stockAvailable:
        data.stock.available,
    }),

    ...(data.stock
      ?.quantity !== undefined && {
      stockQuantity:
        data.stock.quantity,
    }),

    ...(data.sales
      ?.purchasableOnline !==
      undefined && {
      purchasableOnline:
        data.sales
          .purchasableOnline,
    }),

    ...(data.sales
      ?.requestQuote !==
      undefined && {
      requestQuote:
        data.sales.requestQuote,
    }),

    ...(data.sales
      ?.testRide !== undefined && {
      testRide:
        data.sales.testRide,
    }),

    ...(data.sales
      ?.whatsapp !== undefined && {
      whatsapp:
        data.sales.whatsapp,
    }),

    ...(data.feed
      ?.enabled !== undefined && {
      feedEnabled:
        data.feed.enabled,
    }),

    ...(data.feed
      ?.featured !== undefined && {
      feedFeatured:
        data.feed.featured,
    }),

    ...(data.feed
      ?.order !== undefined && {
      feedOrder:
        data.feed.order,
    }),

    ...(data.feed
      ?.text !== undefined && {
      feedText:
        data.feed.text,
    }),

    ...(data.tags !== undefined && {
      tags:
        data.tags,
    }),

    ...(data.seo?.title !==
      undefined && {
      seoTitle:
        data.seo.title,
    }),

    ...(data.seo
      ?.description !==
      undefined && {
      seoDescription:
        data.seo.description,
    }),
  };
}

async function ensureSlugAvailable(
  slug: string,
  ignoreId?: number
) {
  const product =
    await prisma.product.findUnique({
      where: {
        slug,
      },

      select: {
        id: true,
      },
    });

  if (
    product &&
    product.id !== ignoreId
  ) {
    throw new AdminProductError(
      "Já existe um produto com este slug.",
      409
    );
  }
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

export async function createAdminProduct(
  data: ProductData
) {
  if (!data.slug) {
    throw new AdminProductError(
      "Slug é obrigatório.",
      400
    );
  }

  await ensureSlugAvailable(
    data.slug
  );

  const product =
    await prisma.product.create({
      data:
        buildProductData(
          data
        ) as any,

      include:
        productInclude,
    });

  return mapProduct(product);
}

export async function updateAdminProduct(
  id: number,
  data: ProductData
) {
  const existing =
    await prisma.product.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        slug: true,
      },
    });

  if (!existing) {
    throw new AdminProductError(
      "Produto não encontrado.",
      404
    );
  }

  if (
    data.slug !== undefined &&
    data.slug !== existing.slug
  ) {
    await ensureSlugAvailable(
      data.slug,
      id
    );
  }

  const product =
    await prisma.product.update({
      where: {
        id,
      },

      data:
        buildProductData(
          data
        ) as any,

      include:
        productInclude,
    });

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