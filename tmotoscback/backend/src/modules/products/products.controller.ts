import {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { z } from "zod";

import {
  findProductBySlug,
  listProducts,
} from "./products.service.js";

const productSlugParamsSchema =
  z.object({
    slug: z
      .string()
      .trim()
      .min(1),
  });

export async function listProductsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const products =
    await listProducts();

  return reply
    .status(200)
    .send(products);
}

export async function getProductBySlugController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsedParams =
    productSlugParamsSchema.safeParse(
      request.params
    );

  if (!parsedParams.success) {
    return reply
      .status(400)
      .send({
        message:
          "Parâmetros inválidos.",
      });
  }

  const { slug } =
    parsedParams.data;

  const product =
    await findProductBySlug(
      slug
    );

  if (!product) {
    return reply
      .status(404)
      .send({
        message:
          "Produto não encontrado.",
      });
  }

  return reply
    .status(200)
    .send(product);
}