import { Routes, Route } from "react-router-dom";

import Feed from "../pages/Feed/Feed";
import Catalog from "../pages/Catalog/Catalog";
import Product from "../pages/Product/Product";
import Favorites from "../pages/Favorites/Favorites";
import Cart from "../pages/Cart/Cart";
import Contact from "../pages/Contact/Contact";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Feed />} />

      <Route
        path="/catalogo"
        element={<Catalog />}
      />

      <Route
        path="/produto/:slug"
        element={<Product />}
      />

      <Route
        path="/favoritos"
        element={<Favorites />}
      />

      <Route
        path="/carrinho"
        element={<Cart />}
      />

      <Route
        path="/contato"
        element={<Contact />}
      />
    </Routes>
  );
}

export default AppRoutes;