import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

import { z } from "zod";

import {
  LeadStatus,
} from "../../generated/prisma/enums.js";

import {
  AdminLeadError,
  listQuoteLeads,
  listTestRideLeads,
  updateQuoteLeadStatus,
  updateTestRideLeadStatus,
} from "./admin-leads.service.js";

const idSchema =
  z.coerce
    .number()
    .int()
    .positive();

const statusSchema =
  z.object({
    status: z.enum([
      "NEW",
      "CONTACTED",
      "CLOSED",
      "CANCELLED",
    ]),
  });

function handleAdminLeadError(
  error: unknown,
  reply: FastifyReply
) {
  if (
    error instanceof
    AdminLeadError
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
        "Erro interno ao processar solicitação.",
    });
}

export async function listQuoteLeadsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const leads =
      await listQuoteLeads();

    return reply.send({
      data: leads,
    });
  } catch (error) {
    return handleAdminLeadError(
      error,
      reply
    );
  }
}

export async function listTestRideLeadsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const leads =
      await listTestRideLeads();

    return reply.send({
      data: leads,
    });
  } catch (error) {
    return handleAdminLeadError(
      error,
      reply
    );
  }
}

export async function updateQuoteLeadStatusController(
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

        allowedStatuses: [
          "NEW",
          "CONTACTED",
          "CLOSED",
          "CANCELLED",
        ],
      });
  }

  try {
    const lead =
      await updateQuoteLeadStatus(
        idResult.data,
        bodyResult.data.status as LeadStatus
      );

    return reply.send({
      data: lead,
    });
  } catch (error) {
    return handleAdminLeadError(
      error,
      reply
    );
  }
}

export async function updateTestRideLeadStatusController(
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

        allowedStatuses: [
          "NEW",
          "CONTACTED",
          "CLOSED",
          "CANCELLED",
        ],
      });
  }

  try {
    const lead =
      await updateTestRideLeadStatus(
        idResult.data,
        bodyResult.data.status as LeadStatus
      );

    return reply.send({
      data: lead,
    });
  } catch (error) {
    return handleAdminLeadError(
      error,
      reply
    );
  }
}