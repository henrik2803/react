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

      app.get(
        "/leads/quotes",
        listQuoteLeadsController
      );

      app.get(
        "/leads/test-rides",
        listTestRideLeadsController
      );

      app.patch(
        "/leads/quotes/:id/status",
        updateQuoteLeadStatusController
      );

      app.patch(
        "/leads/test-rides/:id/status",
        updateTestRideLeadStatusController
      );
    };

export default adminRoutes;