import {
  FastifyPluginAsync,
} from "fastify";

import {
  getProductBySlugController,
  listProductsController,
} from "./products.controller.js";

const productsRoutes:
  FastifyPluginAsync =
    async (app) => {
      app.get(
        "/",
        listProductsController
      );

      app.get(
        "/:slug",
        getProductBySlugController
      );
    };

export default productsRoutes;