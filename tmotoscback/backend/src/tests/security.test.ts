import assert from "node:assert/strict";
import { after, before, test } from "node:test";

/*
 * =====================================================
 * AMBIENTE ISOLADO DE TESTE
 * =====================================================
 *
 * Os valores são definidos ANTES de importar a aplicação.
 * Não utiliza as credenciais reais nem consulta o banco.
 */

const FRONTEND_ORIGIN = "http://localhost:5173";
const ATTACKER_ORIGIN = "https://site-malicioso.example";
const TEST_EMAIL = "admin@tmotos.test";

process.env.NODE_ENV = "test";
process.env.FRONTEND_URL = FRONTEND_ORIGIN;
process.env.JWT_SECRET =
  "tmotos-chave-exclusiva-para-testes-automatizados-2026";
process.env.ADMIN_EMAIL = TEST_EMAIL;
process.env.ADMIN_PASSWORD_HASH =
  "$2a$10$7EqJtq98hPqEX7fNZaFWoOHI73UoEan4gHLN7qGrf0A2xZqkO.5yK";
process.env.DATABASE_URL =
  "postgresql://test:test@127.0.0.1:5432/tmotos_test_nao_usado";
process.env.TRUST_PROXY = "false";

// Importação dinâmica: permite carregar as variáveis acima primeiro.
const { default: buildApp } = await import("../app.js");
const { ADMIN_SESSION_COOKIE_NAME } =
  await import("../modules/auth/auth.config.js");

const app = buildApp();

before(async () => {
  await app.ready();
});

after(async () => {
  await app.close();
});

function adminCookie(claims: Record<string, unknown> = {}) {
  const token = app.jwt.sign({
    sub: "admin",
    role: "admin",
    email: TEST_EMAIL,
    ...claims,
  });

  return `${ADMIN_SESSION_COOKIE_NAME}=${token}`;
}

/*
 * =====================================================
 * AUTENTICAÇÃO E AUTORIZAÇÃO
 * =====================================================
 */

test("GET /auth/session sem cookie retorna 401", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/auth/session",
  });

  assert.equal(response.statusCode, 401);
});

test("GET /auth/session com cookie válido retorna 200", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/auth/session",
    headers: { cookie: adminCookie() },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().authenticated, true);
  assert.equal(response.json().user.role, "admin");
});

test("GET /auth/session com cookie expirado retorna 401", async () => {
  const now = Math.floor(Date.now() / 1000);
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/auth/session",
    headers: {
      cookie: adminCookie({ iat: now - 7200, exp: now - 3600 }),
    },
  });

  assert.equal(response.statusCode, 401);
});

test("GET /auth/session com JWT inválido retorna 401", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/auth/session",
    headers: {
      cookie: `${ADMIN_SESSION_COOKIE_NAME}=jwt.invalido.aqui`,
    },
  });

  assert.equal(response.statusCode, 401);
});

test("GET /admin/ping sem cookie retorna 401", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/admin/ping",
  });

  assert.equal(response.statusCode, 401);
});

test("GET /admin/ping com cookie válido retorna 200", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/admin/ping",
    headers: { cookie: adminCookie() },
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.json().status, "ok");
});

test("GET /admin/ping não aceita somente Bearer token", async () => {
  const token = app.jwt.sign({
    sub: "admin",
    role: "admin",
    email: TEST_EMAIL,
  });

  const response = await app.inject({
    method: "GET",
    url: "/api/v1/admin/ping",
    headers: { authorization: `Bearer ${token}` },
  });

  assert.equal(response.statusCode, 401);
});

test("GET /admin/ping com role diferente de admin retorna 403", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/v1/admin/ping",
    headers: { cookie: adminCookie({ role: "customer" }) },
  });

  assert.equal(response.statusCode, 403);
});

/*
 * =====================================================
 * PROTEÇÃO CSRF
 * =====================================================
 */

test("POST /auth/login com Origin externo retorna 403", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/api/v1/auth/login",
    headers: { origin: ATTACKER_ORIGIN },
    payload: { email: TEST_EMAIL, password: "senha-qualquer" },
  });

  assert.equal(response.statusCode, 403);
});

test("POST /auth/logout sem Origin retorna 403", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/api/v1/auth/logout",
  });

  assert.equal(response.statusCode, 403);
});

test("POST /auth/logout com Origin null retorna 403", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/api/v1/auth/logout",
    headers: { origin: "null" },
  });

  assert.equal(response.statusCode, 403);
});

test("POST /auth/logout com porta diferente retorna 403", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/api/v1/auth/logout",
    headers: { origin: "http://localhost:5174" },
  });

  assert.equal(response.statusCode, 403);
});

test("POST /auth/logout com Origin válido retorna 200", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/api/v1/auth/logout",
    headers: { origin: FRONTEND_ORIGIN },
  });

  assert.equal(response.statusCode, 200);
  assert.match(
    String(response.headers["set-cookie"]),
    new RegExp(ADMIN_SESSION_COOKIE_NAME)
  );
});

test("POST /auth/login com Origin válido chega à validação dos dados", async () => {
  // Corpo inválido: retorna 400 sem consultar senha ou banco.
  const response = await app.inject({
    method: "POST",
    url: "/api/v1/auth/login",
    headers: { origin: FRONTEND_ORIGIN },
    payload: {},
  });

  assert.equal(response.statusCode, 400);
});

test("PATCH Admin com cookie válido e Origin externo retorna 403", async () => {
  const response = await app.inject({
    method: "PATCH",
    url: "/api/v1/admin/products/1/status",
    headers: {
      origin: ATTACKER_ORIGIN,
      cookie: adminCookie(),
    },
    payload: { active: true },
  });

  assert.equal(response.statusCode, 403);
});

test("PATCH Admin com cookie válido e sem Origin retorna 403", async () => {
  const response = await app.inject({
    method: "PATCH",
    url: "/api/v1/admin/products/1/status",
    headers: { cookie: adminCookie() },
    payload: { active: true },
  });

  assert.equal(response.statusCode, 403);
});

test("PATCH Admin com Origin válido e sem cookie retorna 401", async () => {
  const response = await app.inject({
    method: "PATCH",
    url: "/api/v1/admin/products/1/status",
    headers: { origin: FRONTEND_ORIGIN },
    payload: { active: true },
  });

  assert.equal(response.statusCode, 401);
});

test("POST público de proposta não exige Origin do Admin", async () => {
  // Corpo inválido: confirmação da rota pública sem tocar no banco.
  const response = await app.inject({
    method: "POST",
    url: "/api/v1/leads/quotes",
    headers: { origin: ATTACKER_ORIGIN },
    payload: {},
  });

  assert.equal(response.statusCode, 400);
});
