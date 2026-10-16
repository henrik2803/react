import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { z } from "zod";

import {
  AdminProductError,
  createAdminProduct,
  getAdminProduct,
  listAdminProducts,
  updateAdminProduct,
  updateAdminProductStatus,
} from "./admin-products.service.js";

/*
 * ID
 */
const idSchema =
  z.coerce
    .number()
    .int()
    .positive();

/*
 * Tipo do produto
 */
const productTypeSchema =
  z.enum([
    "MOTO",
    "ACCESSORY",
    "PART",
  ]);

/*
 * Texto que também pode ser null
 */
const nullableText =
  z.union([
    z
      .string()
      .trim(),

    z.null(),
  ]);

/*
 * Parcelamento
 */
const installmentSchema =
  z.object({
    enabled:
      z.boolean(),

    count: z
      .number()
      .int()
      .positive()
      .nullable()
      .optional(),

    value: z
      .number()
      .nonnegative()
      .nullable()
      .optional(),
  });

/*
 * Mídia
 */
const mediaSchema =
  z.object({
    cover:
      nullableText.optional(),

    images: z
      .array(
        z
          .string()
          .trim()
          .min(1)
      )
      .default([]),

    video:
      nullableText.optional(),
  });

/*
 * Estoque
 */
const stockSchema =
  z.object({
    available:
      z.boolean(),

    quantity: z
      .number()
      .int()
      .nonnegative()
      .nullable()
      .optional(),
  });

/*
 * Opções comerciais
 */
const salesSchema =
  z.object({
    purchasableOnline:
      z.boolean(),

    requestQuote:
      z.boolean(),

    testRide:
      z.boolean(),

    whatsapp:
      z.boolean(),
  });

/*
 * Feed
 */
const feedSchema =
  z.object({
    enabled:
      z.boolean(),

    featured:
      z.boolean(),

    order: z
      .number()
      .int()
      .nonnegative()
      .nullable()
      .optional(),

    text:
      nullableText.optional(),
  });

/*
 * SEO
 */
const seoSchema =
  z.object({
    title:
      nullableText.optional(),

    description:
      nullableText.optional(),
  });

/*
 * Cores
 */
const colorSchema =
  z.object({
    key: z
      .string()
      .trim()
      .min(
        1,
        "Identificador da cor é obrigatório."
      )
      .max(80),

    name: z
      .string()
      .trim()
      .min(
        1,
        "Nome da cor é obrigatório."
      )
      .max(100),

    hex: z
      .string()
      .trim()
      .regex(
        /^#[0-9a-fA-F]{6}$/,
        "Cor hexadecimal inválida."
      ),
  });

/*
 * Variantes
 */
const variantSchema =
  z.object({
    key: z
      .string()
      .trim()
      .min(
        1,
        "Identificador da variante é obrigatório."
      )
      .max(120),

    colorKey: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    size: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .optional(),

    stock: z
      .number()
      .int()
      .nonnegative(),
  });

/*
 * CREATE
 *
 * POST /api/v1/admin/products
 */
const createProductSchema =
  z.object({
    type:
      productTypeSchema,

    category: z
      .string()
      .trim()
      .min(
        1,
        "Categoria é obrigatória."
      )
      .max(100),

    subcategory:
      nullableText.optional(),

    brand: z
      .string()
      .trim()
      .min(
        1,
        "Marca é obrigatória."
      )
      .max(100),

    name: z
      .string()
      .trim()
      .min(
        1,
        "Nome é obrigatório."
      )
      .max(160),

    slug: z
      .string()
      .trim()
      .min(1)
      .max(180)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug deve conter apenas letras minúsculas, números e hífens."
      ),

    active:
      z
        .boolean()
        .default(true),

    condition:
      nullableText.optional(),

    shortDescription:
      nullableText.optional(),

    description:
      nullableText.optional(),

    price: z
      .number()
      .nonnegative(),

    oldPrice: z
      .number()
      .nonnegative()
      .nullable()
      .optional(),

    installment:
      installmentSchema
        .optional(),

    media:
      mediaSchema
        .optional(),

    specs: z
      .record(
        z.string(),
        z.unknown()
      )
      .optional(),

    badges: z
      .array(
        z
          .string()
          .trim()
      )
      .default([]),

    stock:
      stockSchema
        .optional(),

    sales:
      salesSchema
        .optional(),

    feed:
      feedSchema
        .optional(),

    tags: z
      .array(
        z
          .string()
          .trim()
      )
      .default([]),

    seo:
      seoSchema
        .optional(),

    /*
     * Cores e variantes
     */
    colors: z
      .array(
        colorSchema
      )
      .default([]),

    variants: z
      .array(
        variantSchema
      )
      .default([]),
  });

/*
 * UPDATE
 *
 * PATCH /api/v1/admin/products/:id
 *
 * Os campos não possuem defaults aqui,
 * para que um PATCH parcial não apague
 * informações existentes.
 */
const updateProductSchema =
  createProductSchema
    .partial()
    .extend({
      active:
        z
          .boolean()
          .optional(),

      badges: z
        .array(
          z
            .string()
            .trim()
        )
        .optional(),

      tags: z
        .array(
          z
            .string()
            .trim()
        )
        .optional(),

      installment:
        installmentSchema
          .partial()
          .optional(),

      media: z
        .object({
          cover:
            nullableText
              .optional(),

          images: z
            .array(
              z
                .string()
                .trim()
                .min(1)
            )
            .optional(),

          video:
            nullableText
              .optional(),
        })
        .optional(),

      stock:
        stockSchema
          .partial()
          .optional(),

      sales:
        salesSchema
          .partial()
          .optional(),

      feed:
        feedSchema
          .partial()
          .optional(),

      seo:
        seoSchema
          .partial()
          .optional(),

      colors: z
        .array(
          colorSchema
        )
        .optional(),

      variants: z
        .array(
          variantSchema
        )
        .optional(),
    });

/*
 * Ativar/desativar produto
 */
const statusSchema =
  z.object({
    active:
      z.boolean(),
  });

/*
 * Tratamento padrão de erros
 */
function handleAdminProductError(
  error: unknown,
  reply: FastifyReply
) {
  if (
    error instanceof
    AdminProductError
  ) {
    return reply
      .status(
        error.statusCode
      )
      .send({
        message:
          error.message,
      });
  }

  console.error(
    error
  );

  return reply
    .status(500)
    .send({
      message:
        "Erro interno ao processar produto.",
    });
}

/*
 * GET /api/v1/admin/products
 */
export async function listAdminProductsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const products =
      await listAdminProducts();

    return reply
      .status(200)
      .send({
        data:
          products,
      });
  } catch (error) {
    return handleAdminProductError(
      error,
      reply
    );
  }
}

/*
 * GET /api/v1/admin/products/:id
 */
export async function getAdminProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed =
    idSchema.safeParse(
      (
        request.params as {
          id?: string;
        }
      ).id
    );

  if (
    !parsed.success
  ) {
    return reply
      .status(400)
      .send({
        message:
          "ID inválido.",
      });
  }

  try {
    const product =
      await getAdminProduct(
        parsed.data
      );

    return reply
      .status(200)
      .send({
        data:
          product,
      });
  } catch (error) {
    return handleAdminProductError(
      error,
      reply
    );
  }
}

/*
 * POST /api/v1/admin/products
 */
export async function createAdminProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed =
    createProductSchema.safeParse(
      request.body
    );

  if (
    !parsed.success
  ) {
    return reply
      .status(400)
      .send({
        message:
          "Dados inválidos.",

        errors:
          parsed.error
            .flatten(),
      });
  }

  try {
    const product =
      await createAdminProduct(
        parsed.data
      );

    return reply
      .status(201)
      .send({
        data:
          product,
      });
  } catch (error) {
    return handleAdminProductError(
      error,
      reply
    );
  }
}

/*
 * PATCH /api/v1/admin/products/:id
 */
export async function updateAdminProductController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const idResult =
    idSchema.safeParse(
      (
        request.params as {
          id?: string;
        }
      ).id
    );

  if (
    !idResult.success
  ) {
    return reply
      .status(400)
      .send({
        message:
          "ID inválido.",
      });
  }

  const bodyResult =
    updateProductSchema.safeParse(
      request.body
    );

  if (
    !bodyResult.success
  ) {
    return reply
      .status(400)
      .send({
        message:
          "Dados inválidos.",

        errors:
          bodyResult
            .error
            .flatten(),
      });
  }

  try {
    const product =
      await updateAdminProduct(
        idResult.data,
        bodyResult.data
      );

    return reply
      .status(200)
      .send({
        data:
          product,
      });
  } catch (error) {
    return handleAdminProductError(
      error,
      reply
    );
  }
}

/*
 * PATCH /api/v1/admin/products/:id/status
 */
export async function updateAdminProductStatusController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const idResult =
    idSchema.safeParse(
      (
        request.params as {
          id?: string;
        }
      ).id
    );

  if (
    !idResult.success
  ) {
    return reply
      .status(400)
      .send({
        message:
          "ID inválido.",
      });
  }

  const bodyResult =
    statusSchema.safeParse(
      request.body
    );

  if (
    !bodyResult.success
  ) {
    return reply
      .status(400)
      .send({
        message:
          "Status inválido.",
      });
  }

  try {
    const product =
      await updateAdminProductStatus(
        idResult.data,
        bodyResult.data
          .active
      );

    return reply
      .status(200)
      .send({
        data:
          product,
      });
  } catch (error) {
    return handleAdminProductError(
      error,
      reply
    );
  }
}