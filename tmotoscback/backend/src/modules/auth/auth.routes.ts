import type {
  FastifyPluginAsync,
} from "fastify";

import {
  authenticateAdmin,
} from "./auth.middleware.js";

import {
  requireTrustedOrigin,
} from "./csrf.middleware.js";

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
       * PROTEÇÃO CSRF
       * ===================================================
       *
       * Aplica a verificação de
       * origem aos métodos que
       * modificam dados.
       *
       * GET /session continua
       * funcionando normalmente.
       */

      app.addHook(
        "onRequest",
        requireTrustedOrigin
      );

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
       * Permite limpar o cookie
       * mesmo quando a sessão
       * já estiver expirada.
       */

      app.post(
        "/logout",
        logoutController
      );
    };

export default authRoutes;