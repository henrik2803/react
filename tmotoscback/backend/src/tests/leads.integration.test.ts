import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { test } from "node:test";
import pg from "pg";

/**
 * Integração de propostas e Test Ride com PostgreSQL.
 * Executar SOMENTE com o arquivo .env.test:
 * env -u DATABASE_URL node --env-file=.env.test --import tsx --test src/tests/leads.integration.test.ts
 */
const databaseUrl = process.env.DATABASE_URL;
const frontendUrl = process.env.FRONTEND_URL;

if (!databaseUrl || !frontendUrl || process.env.NODE_ENV !== "test") {
  throw new Error("ABORTADO: use o arquivo .env.test com NODE_ENV=test.");
}

const url = new URL(databaseUrl);
if (
  url.pathname !== "/tmotos_test" ||
  !["localhost", "127.0.0.1"].includes(url.hostname) ||
  url.port !== "5433" ||
  (url.searchParams.has("schema") && url.searchParams.get("schema") !== "public")
) {
  throw new Error("ABORTADO: DATABASE_URL deve apontar para tmotos_test local, porta 5433.");
}

const trustedOrigin = new URL(frontendUrl).origin;
const runId = randomUUID();
const slug = `tmotos-leads-integration-${runId}`;

// Não carregue app/Prisma nem grave dados antes de confirmar o banco real.
test("Integração de propostas e Test Ride (tmotos_test)", { timeout: 60000 }, async (t) => {
  const connection = new pg.Client({ connectionString: databaseUrl });
  await connection.connect();
  try {
    const result = await connection.query("SELECT current_database() AS banco");
    assert.equal(result.rows[0]?.banco, "tmotos_test", "Banco conectado não é tmotos_test!");
  } finally {
    await connection.end();
  }

  const { default: buildApp } = await import("../app.js");
  const { prisma } = await import("../lib/prisma.js");
  const { ADMIN_SESSION_COOKIE_NAME } = await import("../modules/auth/auth.config.js");
  const app = buildApp();
  let productId: number | undefined;
  let quoteId: number | undefined;
  let rideId: number | undefined;

  try {
    await app.ready();
    const product = await prisma.product.create({
      data: {
        type: "MOTO",
        category: "Motos",
        brand: "TMotos Integração",
        name: "Moto fictícia para teste de leads",
        slug,
        price: "10000.00",
        active: true,
        requestQuote: true,
        testRide: true,
      },
    });
    productId = product.id;

    const token = app.jwt.sign({ sub: "admin", role: "admin", email: "admin@tmotos.test" });
    const adminHeaders = {
      origin: trustedOrigin,
      cookie: `${ADMIN_SESSION_COOKIE_NAME}=${token}`,
    };

    await t.test("GET Admin propostas sem sessão retorna 401", async () => {
      const response = await app.inject({ method: "GET", url: "/api/v1/admin/leads/quotes" });
      assert.equal(response.statusCode, 401);
    });

    await t.test("POST proposta com dados inválidos retorna 400", async () => {
      const response = await app.inject({
        method: "POST", url: "/api/v1/leads/quotes", payload: { productId },
      });
      assert.equal(response.statusCode, 400);
    });

    await t.test("POST registra proposta comercial", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/v1/leads/quotes",
        payload: {
          productId, name: "Cliente Integração", phone: "21999999999",
          email: "cliente@exemplo.test", tradeIn: true, financing: false,
          message: `Teste automatizado ${runId}`,
        },
      });
      assert.equal(response.statusCode, 201, response.body);
      quoteId = response.json().id;
      assert.ok(Number.isInteger(quoteId));
      assert.equal(response.json().status, "NEW");
    });

    await t.test("Proposta foi gravada no PostgreSQL", async () => {
      assert.ok(quoteId);
      const lead = await prisma.quoteLead.findUnique({ where: { id: quoteId } });
      assert.ok(lead);
      assert.equal(lead.productId, productId);
      assert.equal(lead.productSlug, slug);
      assert.equal(lead.tradeIn, true);
      assert.equal(lead.financing, false);
    });

    await t.test("Admin consulta a proposta criada", async () => {
      const response = await app.inject({
        method: "GET", url: "/api/v1/admin/leads/quotes", headers: adminHeaders,
      });
      assert.equal(response.statusCode, 200, response.body);
      assert.ok(response.json().data.some((item: { id: number }) => item.id === quoteId));
    });

    await t.test("Admin atualiza status da proposta para CONTACTED", async () => {
      assert.ok(quoteId);
      const response = await app.inject({
        method: "PATCH", url: `/api/v1/admin/leads/quotes/${quoteId}/status`,
        headers: adminHeaders, payload: { status: "CONTACTED" },
      });
      assert.equal(response.statusCode, 200, response.body);
      assert.equal(response.json().data.status, "CONTACTED");
      const lead = await prisma.quoteLead.findUnique({ where: { id: quoteId } });
      assert.equal(lead?.status, "CONTACTED");
    });

    await t.test("Admin rejeita status inválido na proposta", async () => {
      assert.ok(quoteId);
      const response = await app.inject({
        method: "PATCH", url: `/api/v1/admin/leads/quotes/${quoteId}/status`,
        headers: adminHeaders, payload: { status: "INVALIDO" },
      });
      assert.equal(response.statusCode, 400);
    });

    await t.test("POST Test Ride com período inválido retorna 400", async () => {
      const response = await app.inject({
        method: "POST", url: "/api/v1/leads/test-rides",
        payload: {
          productId, name: "Cliente Integração", phone: "21999999999",
          preferredDate: "2030-05-21", period: "night",
        },
      });
      assert.equal(response.statusCode, 400);
    });

    await t.test("POST registra agendamento de Test Ride", async () => {
      const response = await app.inject({
        method: "POST", url: "/api/v1/leads/test-rides",
        payload: {
          productId, name: "Cliente Integração", phone: "21999999999",
          email: "cliente@exemplo.test", preferredDate: "2030-05-21",
          period: "afternoon", message: `Teste automatizado ${runId}`,
        },
      });
      assert.equal(response.statusCode, 201, response.body);
      rideId = response.json().id;
      assert.ok(Number.isInteger(rideId));
      assert.equal(response.json().status, "NEW");
    });

    await t.test("Test Ride foi gravado com data e período corretos", async () => {
      assert.ok(rideId);
      const lead = await prisma.testRideLead.findUnique({ where: { id: rideId } });
      assert.ok(lead);
      assert.equal(lead.productId, productId);
      assert.equal(lead.productSlug, slug);
      assert.equal(lead.preferredDate.toISOString().slice(0, 10), "2030-05-21");
      assert.equal(lead.period, "AFTERNOON");
    });

    await t.test("Admin consulta o Test Ride criado", async () => {
      const response = await app.inject({
        method: "GET", url: "/api/v1/admin/leads/test-rides", headers: adminHeaders,
      });
      assert.equal(response.statusCode, 200, response.body);
      assert.ok(response.json().data.some((item: { id: number }) => item.id === rideId));
    });

    await t.test("Admin altera status do Test Ride para CLOSED", async () => {
      assert.ok(rideId);
      const response = await app.inject({
        method: "PATCH", url: `/api/v1/admin/leads/test-rides/${rideId}/status`,
        headers: adminHeaders, payload: { status: "CLOSED" },
      });
      assert.equal(response.statusCode, 200, response.body);
      assert.equal(response.json().data.status, "CLOSED");
      const lead = await prisma.testRideLead.findUnique({ where: { id: rideId } });
      assert.equal(lead?.status, "CLOSED");
    });

    await t.test("PATCH Admin com origem externa é bloqueado com 403", async () => {
      assert.ok(rideId);
      const response = await app.inject({
        method: "PATCH", url: `/api/v1/admin/leads/test-rides/${rideId}/status`,
        headers: { ...adminHeaders, origin: "https://atacante.example" },
        payload: { status: "CANCELLED" },
      });
      assert.equal(response.statusCode, 403);
    });
  } finally {
    try {
      if (productId !== undefined) {
        // Remove somente registros ligados ao produto exclusivo deste teste.
        await prisma.quoteLead.deleteMany({ where: { productId } });
        await prisma.testRideLead.deleteMany({ where: { productId } });
        await prisma.product.deleteMany({ where: { id: productId, slug } });
      }
    } finally {
      await app.close();
      await prisma.$disconnect();
    }
  }
});
