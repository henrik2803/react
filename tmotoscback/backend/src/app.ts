import Fastify from "fastify";

import cors from "@fastify/cors";

import helmet from "@fastify/helmet";

import jwt from "@fastify/jwt";

import rateLimit from "@fastify/rate-limit";

import adminRoutes from "./modules/admin/admin.routes.js";

import {
  env,
} from "./config/env.js";

import healthRoutes from "./routes/health.routes.js";

import productsRoutes from "./modules/products/products.routes.js";

import leadsRoutes from "./modules/leads/leads.routes.js";

import authRoutes from "./modules/auth/auth.routes.js";

function buildApp() {
  const app =
    Fastify({
      bodyLimit:
        512 * 1024,

      /*
       * Importante para o rate limit
       * identificar corretamente o IP
       * quando houver proxy reverso.
       */
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
            "headers.authorization",
            "authorization",
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
   * HEADERS DE SEGURANÇA
   * =====================================================
   */

  app.register(
    helmet,
    {
      global: true,

      /*
       * O backend entrega JSON.
       * A CSP será mais importante
       * posteriormente no frontend.
       */
      contentSecurityPolicy:
        false,

      /*
       * HSTS apenas em produção,
       * quando estivermos com HTTPS.
       */
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
      /*
       * Todas as rotas conhecidas
       * recebem uma proteção básica.
       */
      global: true,

      /*
       * 300 requisições por IP
       * a cada minuto.
       *
       * Rotas sensíveis terão
       * limites muito menores.
       */
      max: 300,

      timeWindow:
        "1 minute",
    }
  );

  /*
   * =====================================================
   * CORS
   * =====================================================
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
        "Authorization",
      ],

      credentials:
        false,

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