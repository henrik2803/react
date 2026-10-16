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
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
  origin:
    env.FRONTEND_URL,

  methods: [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
});

  app.register(jwt, {
    secret:
      env.JWT_SECRET,
  });

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

  return app;
}

export default buildApp;