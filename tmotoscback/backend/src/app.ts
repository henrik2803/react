import Fastify from "fastify";
import leadsRoutes from "./modules/leads/leads.routes.js";
import cors from "@fastify/cors";

import { env } from "./config/env.js";

import healthRoutes from "./routes/health.routes.js";

import productsRoutes from "./modules/products/products.routes.js";

function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin:
      env.FRONTEND_URL,
  });

  app.register(
    healthRoutes
  );

  app.register(
  leadsRoutes,
  {
    prefix:
      "/api/v1/leads",
  }
);

  app.register(
    productsRoutes,
    {
      prefix:
        "/api/v1/products",
    }
  );

  return app;
}

export default buildApp;