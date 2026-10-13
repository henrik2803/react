import type {
  FastifyPluginAsync,
} from "fastify";

import {
  createQuoteLeadController,
  createTestRideLeadController,
} from "./leads.controller.js";

const leadsRoutes:
  FastifyPluginAsync =
    async (app) => {
      app.post(
        "/quotes",
        createQuoteLeadController
      );

      app.post(
        "/test-rides",
        createTestRideLeadController
      );
    };

export default leadsRoutes;