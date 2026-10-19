import {
  Route,
  Routes,
} from "react-router-dom";

import PublicLayout from "../components/layout/PublicLayout/PublicLayout";

import AdminLayout from "../components/admin/AdminLayout/AdminLayout";

import AdminProtectedRoute from "./AdminProtectedRoute";

import Feed from "../pages/Feed/Feed";
import Catalog from "../pages/Catalog/Catalog";
import Product from "../pages/Product/Product";
import Favorites from "../pages/Favorites/Favorites";
import Cart from "../pages/Cart/Cart";
import Contact from "../pages/Contact/Contact";

import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import AdminQuotes from "../pages/AdminQuotes/AdminQuotes";
import AdminTestRides from "../pages/AdminTestRides/AdminTestRides";
import AdminProducts from "../pages/AdminProducts/AdminProducts";
import AdminProductForm from "../pages/AdminProductForm/AdminProductForm";

function AppRoutes() {
  return (
    <Routes>
      <Route
        element={
          <PublicLayout />
        }
      >
        <Route
          path="/"
          element={<Feed />}
        />

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
      </Route>

      <Route
        path="/admin/login"
        element={
          <AdminLogin />
        }
      />

      <Route
        element={
          <AdminProtectedRoute />
        }
      >
        <Route
          path="/admin"
          element={
            <AdminLayout />
          }
        >
          <Route
            index
            element={
              <AdminDashboard />
            }
          />

          <Route
            path="propostas"
            element={
              <AdminQuotes />
            }
          />

          <Route
            path="test-rides"
            element={
              <AdminTestRides />
            }
          />

          <Route
            path="produtos"
            element={
              <AdminProducts />
            }
          />

          <Route
            path="produtos/novo"
            element={
              <AdminProductForm />
            }
          />

          <Route
            path="produtos/:id/editar"
            element={
              <AdminProductForm />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;