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
      /*
       * ===================================================
       * PROPOSTAS
       * ===================================================
       */

      app.post(
        "/quotes",
        {
          config: {
            rateLimit: {
              /*
               * Um usuário normal não
               * deveria precisar enviar
               * dezenas de propostas em
               * poucos minutos.
               */
              max: 10,

              timeWindow:
                "10 minutes",
            },
          },
        },
        createQuoteLeadController
      );

      /*
       * ===================================================
       * TEST RIDES
       * ===================================================
       */

      app.post(
        "/test-rides",
        {
          config: {
            rateLimit: {
              max: 10,

              timeWindow:
                "10 minutes",
            },
          },
        },
        createTestRideLeadController
      );
    };

export default leadsRoutes;