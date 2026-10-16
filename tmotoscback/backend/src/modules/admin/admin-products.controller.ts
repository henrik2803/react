import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { z } from "zod";

import {
  AdminProductError,
  getAdminProduct,
  listAdminProducts,
  updateAdminProductStatus,
} from "./admin-products.service.js";

const idSchema =
  z.coerce
    .number()
    .int()
    .positive();

const statusSchema =
  z.object({
    active:
      z.boolean(),
  });

function handleAdminProductError(
  error: unknown,
  reply: FastifyReply
) {
  if (
    error instanceof
    AdminProductError
  ) {
    return reply
      .status(error.statusCode)
      .send({
        message:
          error.message,
      });
  }

  console.error(error);

  return reply
    .status(500)
    .send({
      message:
        "Erro interno ao processar produto.",
    });
}

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
        data: products,
      });
  } catch (error) {
    return handleAdminProductError(
      error,
      reply
    );
  }
}

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

  if (!parsed.success) {
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
        data: product,
      });
  } catch (error) {
    return handleAdminProductError(
      error,
      reply
    );
  }
}

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

  if (!idResult.success) {
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

  if (!bodyResult.success) {
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
        bodyResult.data.active
      );

    return reply
      .status(200)
      .send({
        data: product,
      });
  } catch (error) {
    return handleAdminProductError(
      error,
      reply
    );
  }
}