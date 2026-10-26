import type {
  FastifyPluginAsync,
} from "fastify";

import {
  loginController,
} from "./auth.controller.js";

const authRoutes:
  FastifyPluginAsync =
    async (app) => {
      app.post(
        "/login",
        {
          config: {
            rateLimit: {
              /*
               * No máximo 5 tentativas
               * de login pelo mesmo IP
               * em 15 minutos.
               */
              max: 5,

              timeWindow:
                "15 minutes",
            },
          },
        },
        loginController
      );
    };

export default authRoutes;