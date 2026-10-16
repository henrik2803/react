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
  createAdminProductController,
  getAdminProductController,
  listAdminProductsController,
  updateAdminProductController,
  updateAdminProductStatusController,
} from "./admin-products.controller.js";

const adminRoutes:
  FastifyPluginAsync =
    async (app) => {
      app.addHook(
        "preHandler",
        authenticateAdmin
      );

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
       * PROPOSTAS
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
       * TEST RIDES
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

      app.post(
        "/products",
        createAdminProductController
      );

      app.patch(
        "/products/:id",
        updateAdminProductController
      );

      app.patch(
        "/products/:id/status",
        updateAdminProductStatusController
      );
    };

export default adminRoutes;