import {
  prisma,
} from "../../lib/prisma.js";

import {
  ProductType,
  TestRidePeriod,
} from "../../generated/prisma/enums.js";

export class LeadRequestError
  extends Error {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number
  ) {
    super(message);

    this.name =
      "LeadRequestError";

    this.statusCode =
      statusCode;
  }
}

type CreateQuoteLeadInput = {
  productId: number;
  name: string;
  phone: string;
  email?: string;
  tradeIn: boolean;
  financing: boolean;
  message?: string;
};

type CreateTestRideLeadInput = {
  productId: number;
  name: string;
  phone: string;
  email?: string;
  preferredDate: string;
  period:
    | "morning"
    | "afternoon";
  message?: string;
};

export async function createQuoteLead(
  data: CreateQuoteLeadInput
) {
  const product =
    await prisma.product.findUnique({
      where: {
        id: data.productId,
      },

      select: {
        id: true,
        slug: true,
        brand: true,
        name: true,
        type: true,
        requestQuote: true,
      },
    });

  if (!product) {
    throw new LeadRequestError(
      "Produto não encontrado.",
      404
    );
  }

  if (
    product.type !==
      ProductType.MOTO ||
    !product.requestQuote
  ) {
    throw new LeadRequestError(
      "Este produto não aceita solicitação de proposta.",
      422
    );
  }

  return prisma.quoteLead.create({
    data: {
      productId:
        product.id,

      productSlug:
        product.slug,

      productBrand:
        product.brand,

      productName:
        product.name,

      name:
        data.name.trim(),

      phone:
        data.phone.trim(),

      email:
        data.email?.trim() ||
        null,

      tradeIn:
        data.tradeIn,

      financing:
        data.financing,

      message:
        data.message?.trim() ||
        null,
    },
  });
}

export async function createTestRideLead(
  data: CreateTestRideLeadInput
) {
  const product =
    await prisma.product.findUnique({
      where: {
        id: data.productId,
      },

      select: {
        id: true,
        slug: true,
        brand: true,
        name: true,
        type: true,
        testRide: true,
      },
    });

  if (!product) {
    throw new LeadRequestError(
      "Produto não encontrado.",
      404
    );
  }

  if (
    product.type !==
      ProductType.MOTO ||
    !product.testRide
  ) {
    throw new LeadRequestError(
      "Este produto não aceita solicitação de Test Ride.",
      422
    );
  }

  const period =
    data.period === "morning"
      ? TestRidePeriod.MORNING
      : TestRidePeriod.AFTERNOON;

  return prisma.testRideLead.create({
    data: {
      productId:
        product.id,

      productSlug:
        product.slug,

      productBrand:
        product.brand,

      productName:
        product.name,

      name:
        data.name.trim(),

      phone:
        data.phone.trim(),

      email:
        data.email?.trim() ||
        null,

      preferredDate:
        new Date(
          `${data.preferredDate}T00:00:00.000Z`
        ),

      period,

      message:
        data.message?.trim() ||
        null,
    },
  });
}