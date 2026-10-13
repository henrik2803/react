import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { z } from "zod";

import {
  createQuoteLead,
  createTestRideLead,
  LeadRequestError,
} from "./leads.service.js";

const emailSchema =
  z.union([
    z
      .string()
      .trim()
      .email(
        "Informe um e-mail válido."
      ),
    z.literal(""),
  ]);

const quoteLeadSchema =
  z.object({
    productId: z
      .number()
      .int()
      .positive(),

    name: z
      .string()
      .trim()
      .min(
        2,
        "Informe seu nome."
      )
      .max(120),

    phone: z
      .string()
      .trim()
      .min(
        8,
        "Informe seu telefone."
      )
      .max(30),

    email:
      emailSchema.optional(),

    tradeIn:
      z.boolean().default(false),

    financing:
      z.boolean().default(false),

    message: z
      .string()
      .trim()
      .max(2000)
      .optional(),
  });

const testRideLeadSchema =
  z.object({
    productId: z
      .number()
      .int()
      .positive(),

    name: z
      .string()
      .trim()
      .min(
        2,
        "Informe seu nome."
      )
      .max(120),

    phone: z
      .string()
      .trim()
      .min(
        8,
        "Informe seu telefone."
      )
      .max(30),

    email:
      emailSchema.optional(),

    preferredDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Data inválida."
      ),

    period: z.enum([
      "morning",
      "afternoon",
    ]),

    message: z
      .string()
      .trim()
      .max(2000)
      .optional(),
  });

function handleLeadError(
  error: unknown,
  reply: FastifyReply
) {
  if (
    error instanceof
    LeadRequestError
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
        "Erro interno ao registrar solicitação.",
    });
}

export async function createQuoteLeadController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed =
    quoteLeadSchema.safeParse(
      request.body
    );

  if (!parsed.success) {
    return reply
      .status(400)
      .send({
        message:
          "Dados inválidos.",

        errors:
          parsed.error.flatten(),
      });
  }

  try {
    const lead =
      await createQuoteLead(
        parsed.data
      );

    return reply
      .status(201)
      .send({
        id: lead.id,
        status:
          lead.status,
        createdAt:
          lead.createdAt,
      });
  } catch (error) {
    return handleLeadError(
      error,
      reply
    );
  }
}

export async function createTestRideLeadController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed =
    testRideLeadSchema.safeParse(
      request.body
    );

  if (!parsed.success) {
    return reply
      .status(400)
      .send({
        message:
          "Dados inválidos.",

        errors:
          parsed.error.flatten(),
      });
  }

  try {
    const lead =
      await createTestRideLead(
        parsed.data
      );

    return reply
      .status(201)
      .send({
        id: lead.id,
        status:
          lead.status,
        createdAt:
          lead.createdAt,
      });
  } catch (error) {
    return handleLeadError(
      error,
      reply
    );
  }
}