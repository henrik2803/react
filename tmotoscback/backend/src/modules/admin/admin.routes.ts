import type {
  FastifyPluginAsync,
} from "fastify";

import {
  authenticateAdmin,
} from "../auth/auth.middleware.js";

import {
  listQuoteLeadsController,
  listTestRideLeadsController,
  updateQuoteLeadStatusController,
  updateTestRideLeadStatusController,
} from "./admin-leads.controller.js";

import {
  getAdminProductController,
  listAdminProductsController,
  updateAdminProductStatusController,
} from "./admin-products.controller.js";

const adminRoutes:
  FastifyPluginAsync =
    async (app) => {
      /*
       * Todas as rotas deste módulo
       * exigem autenticação administrativa.
       */
      app.addHook(
        "preHandler",
        authenticateAdmin
      );

      /*
       * Teste da área administrativa.
       */
      app.get(
        "/ping",
        async () => {
          return {
            status: "ok",
            message:
              "Área administrativa autenticada.",
          };
        }
      );

      /*
       * LEADS - PROPOSTAS
       */
      app.get(
        "/leads/quotes",
        listQuoteLeadsController
      );

      app.patch(
        "/leads/quotes/:id/status",
        updateQuoteLeadStatusController
      );

      /*
       * LEADS - TEST RIDES
       */
      app.get(
        "/leads/test-rides",
        listTestRideLeadsController
      );

      app.patch(
        "/leads/test-rides/:id/status",
        updateTestRideLeadStatusController
      );

      /*
       * PRODUTOS
       */
      app.get(
        "/products",
        listAdminProductsController
      );

      app.get(
        "/products/:id",
        getAdminProductController
      );

      app.patch(
        "/products/:id/status",
        updateAdminProductStatusController
      );
    };

export default adminRoutes;