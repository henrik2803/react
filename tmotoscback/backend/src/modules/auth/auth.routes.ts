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
        loginController
      );
    };

export default authRoutes;