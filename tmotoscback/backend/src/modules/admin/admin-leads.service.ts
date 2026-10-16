import {
  prisma,
} from "../../lib/prisma.js";

import {
  LeadStatus,
} from "../../generated/prisma/enums.js";

export class AdminLeadError
  extends Error {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number
  ) {
    super(message);

    this.name =
      "AdminLeadError";

    this.statusCode =
      statusCode;
  }
}

export async function listQuoteLeads() {
  return prisma.quoteLead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function listTestRideLeads() {
  return prisma.testRideLead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateQuoteLeadStatus(
  id: number,
  status: LeadStatus
) {
  const lead =
    await prisma.quoteLead.findUnique({
      where: {
        id,
      },
    });

  if (!lead) {
    throw new AdminLeadError(
      "Solicitação de proposta não encontrada.",
      404
    );
  }

  return prisma.quoteLead.update({
    where: {
      id,
    },

    data: {
      status,
    },
  });
}

export async function updateTestRideLeadStatus(
  id: number,
  status: LeadStatus
) {
  const lead =
    await prisma.testRideLead.findUnique({
      where: {
        id,
      },
    });

  if (!lead) {
    throw new AdminLeadError(
      "Solicitação de Test Ride não encontrada.",
      404
    );
  }

  return prisma.testRideLead.update({
    where: {
      id,
    },

    data: {
      status,
    },
  });
}