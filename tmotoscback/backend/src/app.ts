import Fastify from "fastify";

import cookie from "@fastify/cookie";

import cors from "@fastify/cors";

import helmet from "@fastify/helmet";

import jwt from "@fastify/jwt";

import rateLimit from "@fastify/rate-limit";

import adminRoutes from "./modules/admin/admin.routes.js";

import {
  env,
} from "./config/env.js";

import {
  ADMIN_SESSION_COOKIE_NAME,
} from "./modules/auth/auth.config.js";

import healthRoutes from "./routes/health.routes.js";

import productsRoutes from "./modules/products/products.routes.js";

import leadsRoutes from "./modules/leads/leads.routes.js";

import authRoutes from "./modules/auth/auth.routes.js";

function buildApp() {
  const app =
    Fastify({
      bodyLimit:
        512 * 1024,

      trustProxy:
        env.TRUST_PROXY,

      logger: {
        level:
          env.NODE_ENV ===
          "production"
            ? "info"
            : "debug",

        redact: {
          paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "headers.authorization",
            "headers.cookie",
            "authorization",
            "cookie",
            "password",
            "token",
          ],

          censor:
            "[REDACTED]",
        },
      },
    });

  /*
   * =====================================================
   * COOKIES
   * =====================================================
   *
   * Deve ser registrado antes das
   * rotas que dependem de cookies.
   */

  app.register(
    cookie
  );

  /*
   * =====================================================
   * HEADERS DE SEGURANÇA
   * =====================================================
   */

  app.register(
    helmet,
    {
      global: true,

      contentSecurityPolicy:
        false,

      strictTransportSecurity:
        env.NODE_ENV ===
        "production"
          ? {
              maxAge:
                31536000,

              includeSubDomains:
                true,
            }
          : false,
    }
  );

  /*
   * =====================================================
   * RATE LIMIT GLOBAL
   * =====================================================
   */

  app.register(
    rateLimit,
    {
      global: true,

      max: 300,

      timeWindow:
        "1 minute",
    }
  );

  /*
   * =====================================================
   * CORS
   * =====================================================
   *
   * credentials precisa ser true
   * para o navegador enviar o
   * cookie da sessão.
   */

  app.register(
    cors,
    {
      origin:
        env.FRONTEND_URL,

      methods: [
        "GET",
        "HEAD",
        "POST",
        "PATCH",
        "OPTIONS",
      ],

      allowedHeaders: [
        "Content-Type",
      ],

      credentials:
        true,

      maxAge:
        86400,
    }
  );

  /*
   * =====================================================
   * JWT
   * =====================================================
   */

  app.register(
    jwt,
    {
      secret:
        env.JWT_SECRET,

      cookie: {
        cookieName:
          ADMIN_SESSION_COOKIE_NAME,

        signed: false,
      },
    }
  );

  /*
   * =====================================================
   * ROTAS
   * =====================================================
   */

  app.register(
    healthRoutes
  );

  app.register(
    productsRoutes,
    {
      prefix:
        "/api/v1/products",
    }
  );

  app.register(
    leadsRoutes,
    {
      prefix:
        "/api/v1/leads",
    }
  );

  app.register(
    authRoutes,
    {
      prefix:
        "/api/v1/auth",
    }
  );

  app.register(
    adminRoutes,
    {
      prefix:
        "/api/v1/admin",
    }
  );

  /*
   * =====================================================
   * 404
   * =====================================================
   */

  app.setNotFoundHandler(
    (
      request,
      reply
    ) => {
      request.log.warn(
        {
          method:
            request.method,

          url:
            request.url,
        },
        "Rota não encontrada."
      );

      return reply
        .status(404)
        .send({
          message:
            "Rota não encontrada.",
        });
    }
  );

  /*
   * =====================================================
   * ERROS GERAIS
   * =====================================================
   */

  app.setErrorHandler(
    (
      error,
      request,
      reply
    ) => {
      const originalStatus =
        error.statusCode;

      const isClientError =
        typeof originalStatus ===
          "number" &&
        originalStatus >=
          400 &&
        originalStatus <
          500;

      const statusCode =
        isClientError
          ? originalStatus
          : 500;

      if (
        statusCode >= 500
      ) {
        request.log.error(
          {
            err:
              error,

            method:
              request.method,

            url:
              request.url,
          },
          "Erro interno não tratado."
        );
      }

      const clientMessages:
        Record<
          number,
          string
        > = {
          400:
            "Requisição inválida.",

          401:
            "Não autorizado.",

          403:
            "Acesso não autorizado.",

          404:
            "Recurso não encontrado.",

          413:
            "Dados enviados excedem o limite permitido.",

          415:
            "Tipo de conteúdo não suportado.",

          429:
            "Muitas requisições. Tente novamente em instantes.",
        };

      return reply
        .status(
          statusCode
        )
        .send({
          message:
            clientMessages[
              statusCode
            ] ||
            "Erro interno do servidor.",
        });
    }
  );

  return app;
}

export default buildApp;