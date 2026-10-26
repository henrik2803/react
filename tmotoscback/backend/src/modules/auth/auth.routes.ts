import type {
  FastifyPluginAsync,
} from "fastify";

import {
  authenticateAdmin,
} from "./auth.middleware.js";

import {
  loginController,
  logoutController,
  sessionController,
} from "./auth.controller.js";

const authRoutes:
  FastifyPluginAsync =
    async (app) => {
      /*
       * ===================================================
       * LOGIN
       * ===================================================
       */

      app.post(
        "/login",
        {
          config: {
            rateLimit: {
              max: 5,

              timeWindow:
                "15 minutes",
            },
          },
        },
        loginController
      );

      /*
       * ===================================================
       * SESSÃO ATUAL
       * ===================================================
       */

      app.get(
        "/session",
        {
          preHandler:
            authenticateAdmin,
        },
        sessionController
      );

      /*
       * ===================================================
       * LOGOUT
       * ===================================================
       *
       * Não precisa exigir uma sessão
       * válida.
       *
       * Mesmo uma sessão expirada
       * deve conseguir limpar o cookie.
       */

      app.post(
        "/logout",
        logoutController
      );
    };

export default authRoutes;