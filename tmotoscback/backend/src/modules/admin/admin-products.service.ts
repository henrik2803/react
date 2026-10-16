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

type ProductColorInput = {
  key: string;
  name: string;
  hex: string;
};

type ProductVariantInput = {
  key: string;
  colorKey: string | null;
  size?: string | null;
  stock: number;
};

type ProductData = {
  type?:
    | "MOTO"
    | "ACCESSORY"
    | "PART";

  category?: string;
  subcategory?:
    | string
    | null;

  brand?: string;
  name?: string;
  slug?: string;

  active?: boolean;

  condition?:
    | string
    | null;

  shortDescription?:
    | string
    | null;

  description?:
    | string
    | null;

  price?: number;

  oldPrice?:
    | number
    | null;

  installment?: {
    enabled?: boolean;

    count?:
      | number
      | null;

    value?:
      | number
      | null;
  };

  media?: {
    cover?:
      | string
      | null;

    images?: string[];

    video?:
      | string
      | null;
  };

  specs?: Record<
    string,
    unknown
  >;

  badges?: string[];

  stock?: {
    available?: boolean;

    quantity?:
      | number
      | null;
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

    order?:
      | number
      | null;

    text?:
      | string
      | null;
  };

  tags?: string[];

  seo?: {
    title?:
      | string
      | null;

    description?:
      | string
      | null;
  };

  colors?: ProductColorInput[];

  variants?: ProductVariantInput[];
};

function mapProduct(
  product: any
) {
  const colorKeyById =
    new Map<
      number,
      string
    >(
      product.colors.map(
        (color: any) => [
          color.id,
          color.key,
        ]
      )
    );

  return {
    id:
      product.id,

    type:
      product.type,

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
      Number(
        product.price
      ),

    oldPrice:
      product.oldPrice ===
      null
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
      product.specs ??
      {},

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
          id:
            color.id,

          key:
            color.key,

          name:
            color.name,

          hex:
            color.hex,
        })
      ),

    variants:
      product.variants.map(
        (variant: any) => ({
          id:
            variant.id,

          key:
            variant.key,

          colorId:
            variant.colorId,

          colorKey:
            variant.colorId ===
            null
              ? null
              : colorKeyById.get(
                  variant.colorId
                ) ??
                null,

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
    ...(data.type !==
      undefined && {
      type:
        data.type,
    }),

    ...(data.category !==
      undefined && {
      category:
        data.category.trim(),
    }),

    ...(data.subcategory !==
      undefined && {
      subcategory:
        data.subcategory ===
        null
          ? null
          : data.subcategory.trim(),
    }),

    ...(data.brand !==
      undefined && {
      brand:
        data.brand.trim(),
    }),

    ...(data.name !==
      undefined && {
      name:
        data.name.trim(),
    }),

    ...(data.slug !==
      undefined && {
      slug:
        data.slug.trim(),
    }),

    ...(data.active !==
      undefined && {
      active:
        data.active,
    }),

    ...(data.condition !==
      undefined && {
      condition:
        data.condition ===
        null
          ? null
          : data.condition.trim(),
    }),

    ...(data.shortDescription !==
      undefined && {
      shortDescription:
        data.shortDescription ===
        null
          ? null
          : data.shortDescription.trim(),
    }),

    ...(data.description !==
      undefined && {
      description:
        data.description ===
        null
          ? null
          : data.description.trim(),
    }),

    ...(data.price !==
      undefined && {
      price:
        data.price,
    }),

    ...(data.oldPrice !==
      undefined && {
      oldPrice:
        data.oldPrice,
    }),

    ...(data.installment
      ?.enabled !==
      undefined && {
      installmentEnabled:
        data.installment.enabled,
    }),

    ...(data.installment
      ?.count !==
      undefined && {
      installmentCount:
        data.installment.count,
    }),

    ...(data.installment
      ?.value !==
      undefined && {
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

    ...(data.specs !==
      undefined && {
      specs:
        data.specs,
    }),

    ...(data.badges !==
      undefined && {
      badges:
        data.badges,
    }),

    ...(data.stock
      ?.available !==
      undefined && {
      stockAvailable:
        data.stock.available,
    }),

    ...(data.stock
      ?.quantity !==
      undefined && {
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
        data.sales
          .requestQuote,
    }),

    ...(data.sales
      ?.testRide !==
      undefined && {
      testRide:
        data.sales
          .testRide,
    }),

    ...(data.sales
      ?.whatsapp !==
      undefined && {
      whatsapp:
        data.sales
          .whatsapp,
    }),

    ...(data.feed
      ?.enabled !==
      undefined && {
      feedEnabled:
        data.feed.enabled,
    }),

    ...(data.feed
      ?.featured !==
      undefined && {
      feedFeatured:
        data.feed.featured,
    }),

    ...(data.feed
      ?.order !==
      undefined && {
      feedOrder:
        data.feed.order,
    }),

    ...(data.feed
      ?.text !==
      undefined && {
      feedText:
        data.feed.text,
    }),

    ...(data.tags !==
      undefined && {
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

function validateProductRelations(
  colors:
    | ProductColorInput[]
    | undefined,

  variants:
    | ProductVariantInput[]
    | undefined
) {
  const colorList =
    colors ?? [];

  const variantList =
    variants ?? [];

  /*
   * Impede duas cores com a
   * mesma key.
   */
  const colorKeys =
    new Set<string>();

  for (
    const color of
    colorList
  ) {
    if (
      colorKeys.has(
        color.key
      )
    ) {
      throw new AdminProductError(
        `Cor duplicada: "${color.key}".`,
        400
      );
    }

    colorKeys.add(
      color.key
    );
  }

  /*
   * Impede duas variantes com
   * a mesma key.
   */
  const variantKeys =
    new Set<string>();

  for (
    const variant of
    variantList
  ) {
    if (
      variantKeys.has(
        variant.key
      )
    ) {
      throw new AdminProductError(
        `Variante duplicada: "${variant.key}".`,
        400
      );
    }

    variantKeys.add(
      variant.key
    );

    /*
     * Se a variante possui cor,
     * ela precisa existir na lista.
     */
    if (
      variant.colorKey !==
        null &&
      !colorKeys.has(
        variant.colorKey
      )
    ) {
      throw new AdminProductError(
        `A variante "${variant.key}" referencia uma cor inexistente: "${variant.colorKey}".`,
        400
      );
    }
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

  return mapProduct(
    product
  );
}

/*
 * CREATE
 *
 * Produto + cores + variantes
 * são gravados na mesma transação.
 */
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

  const colors =
    data.colors ?? [];

  const variants =
    data.variants ?? [];

  validateProductRelations(
    colors,
    variants
  );

  const {
    colors:
      _colors,

    variants:
      _variants,

    ...baseData
  } = data;

  return prisma.$transaction(
    async (tx) => {
      const product =
        await tx.product.create({
          data:
            buildProductData(
              baseData
            ) as any,
        });

      const colorIds =
        new Map<
          string,
          number
        >();

      /*
       * Cria cores.
       */
      for (
        const color of
        colors
      ) {
        const createdColor =
          await tx.productColor.create({
            data: {
              productId:
                product.id,

              key:
                color.key,

              name:
                color.name,

              hex:
                color.hex,
            },
          });

        colorIds.set(
          color.key,
          createdColor.id
        );
      }

      /*
       * Cria variantes.
       */
      for (
        const variant of
        variants
      ) {
        const colorId =
          variant.colorKey ===
          null
            ? null
            : colorIds.get(
                variant.colorKey
              ) ??
              null;

        await tx.productVariant.create({
          data: {
            productId:
              product.id,

            colorId,

            key:
              variant.key,

            size:
              variant.size ??
              null,

            stock:
              variant.stock,
          },
        });
      }

      /*
       * Quando existem variantes,
       * o estoque total passa a ser
       * calculado automaticamente.
       */
      if (
        variants.length >
        0
      ) {
        const totalStock =
          variants.reduce(
            (
              total,
              variant
            ) =>
              total +
              variant.stock,
            0
          );

        await tx.product.update({
          where: {
            id:
              product.id,
          },

          data: {
            stockQuantity:
              totalStock,

            stockAvailable:
              totalStock >
              0,
          },
        });
      }

      const savedProduct =
        await tx.product.findUnique({
          where: {
            id:
              product.id,
          },

          include:
            productInclude,
        });

      if (
        !savedProduct
      ) {
        throw new AdminProductError(
          "Erro ao carregar produto criado.",
          500
        );
      }

      return mapProduct(
        savedProduct
      );
    }
  );
}

/*
 * UPDATE
 *
 * Campos básicos podem ser
 * alterados isoladamente.
 *
 * Para alterar cores/variantes,
 * as duas listas devem ser enviadas.
 */
export async function updateAdminProduct(
  id: number,
  data: ProductData
) {
  const existing =
    await prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        colors: true,
        variants: true,
      },
    });

  if (!existing) {
    throw new AdminProductError(
      "Produto não encontrado.",
      404
    );
  }

  if (
    data.slug !==
      undefined &&
    data.slug !==
      existing.slug
  ) {
    await ensureSlugAvailable(
      data.slug,
      id
    );
  }

  const changingRelations =
    data.colors !==
      undefined ||
    data.variants !==
      undefined;

  /*
   * Evita substituir somente cores
   * ou somente variantes.
   */
  if (
    changingRelations &&
    (
      data.colors ===
        undefined ||
      data.variants ===
        undefined
    )
  ) {
    throw new AdminProductError(
      "Para alterar cores ou variantes, envie colors e variants juntos.",
      400
    );
  }

  if (
    changingRelations
  ) {
    validateProductRelations(
      data.colors,
      data.variants
    );
  }

  const {
    colors,
    variants,
    ...baseData
  } = data;

  return prisma.$transaction(
    async (tx) => {
      /*
       * Atualiza dados principais.
       */
      await tx.product.update({
        where: {
          id,
        },

        data:
          buildProductData(
            baseData
          ) as any,
      });

      /*
       * Se colors/variants foram
       * enviados, substituímos toda
       * a estrutura.
       */
      if (
        changingRelations
      ) {
        /*
         * Primeiro remove variantes
         * porque elas referenciam cores.
         */
        await tx.productVariant.deleteMany({
          where: {
            productId:
              id,
          },
        });

        await tx.productColor.deleteMany({
          where: {
            productId:
              id,
          },
        });

        const colorIds =
          new Map<
            string,
            number
          >();

        /*
         * Recria cores.
         */
        for (
          const color of
          colors ?? []
        ) {
          const createdColor =
            await tx.productColor.create({
              data: {
                productId:
                  id,

                key:
                  color.key,

                name:
                  color.name,

                hex:
                  color.hex,
              },
            });

          colorIds.set(
            color.key,
            createdColor.id
          );
        }

        /*
         * Recria variantes.
         */
        for (
          const variant of
          variants ?? []
        ) {
          const colorId =
            variant.colorKey ===
            null
              ? null
              : colorIds.get(
                  variant.colorKey
                ) ??
                null;

          await tx.productVariant.create({
            data: {
              productId:
                id,

              colorId,

              key:
                variant.key,

              size:
                variant.size ??
                null,

              stock:
                variant.stock,
            },
          });
        }

        /*
         * Se existem variantes,
         * o estoque total é a soma
         * dos estoques das variantes.
         */
        if (
          (
            variants ??
            []
          ).length >
          0
        ) {
          const totalStock =
            (
              variants ??
              []
            ).reduce(
              (
                total,
                variant
              ) =>
                total +
                variant.stock,
              0
            );

          await tx.product.update({
            where: {
              id,
            },

            data: {
              stockQuantity:
                totalStock,

              stockAvailable:
                totalStock >
                0,
            },
          });
        }
      }

      const savedProduct =
        await tx.product.findUnique({
          where: {
            id,
          },

          include:
            productInclude,
        });

      if (
        !savedProduct
      ) {
        throw new AdminProductError(
          "Produto não encontrado.",
          404
        );
      }

      return mapProduct(
        savedProduct
      );
    }
  );
}

/*
 * ATIVAR / DESATIVAR
 */
export async function updateAdminProductStatus(
  id: number,
  active: boolean
) {
  const existing =
    await prisma.product.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
      },
    });

  if (!existing) {
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

  return mapProduct(
    updated
  );
}