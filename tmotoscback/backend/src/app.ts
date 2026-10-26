import Fastify from "fastify";

import cors from "@fastify/cors";

import jwt from "@fastify/jwt";

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
      /*
       * Limite máximo do JSON recebido.
       *
       * Evita payloads gigantes sendo
       * enviados desnecessariamente
       * para a API.
       */
      bodyLimit:
        512 * 1024,

      /*
       * Logs estruturados.
       *
       * Informações sensíveis são
       * removidas antes de chegarem
       * aos logs.
       */
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
   * CORS
   * =====================================================
   */

  app.register(
    cors,
    {
      /*
       * Apenas o frontend configurado
       * poderá acessar a API através
       * do navegador.
       */
      origin:
        env.FRONTEND_URL,

      /*
       * Somente métodos realmente
       * utilizados atualmente.
       */
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

      /*
       * Ainda estamos usando
       * Authorization Bearer.
       *
       * Quando migrarmos para
       * HttpOnly Cookie isso será
       * alterado para true.
       */
      credentials:
        false,

      /*
       * Permite ao navegador guardar
       * o resultado do preflight.
       */
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
   * ERROS NÃO TRATADOS
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

      /*
       * Erros internos ficam apenas
       * nos logs.
       *
       * Nunca enviamos stack trace
       * para o navegador.
       */
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