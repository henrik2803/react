import {
  StrictMode,
} from "react";
import {
  AdminAuthProvider,
} from "./context/AdminAuthContext";
import {
  createRoot,
} from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import App from "./App";

import {
  FavoritesProvider,
} from "./context/FavoritesContext";

import {
  CartProvider,
} from "./context/CartContext";

import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/globals.css";

createRoot(
  document.getElementById(
    "root"
  )
).render(
  <BrowserRouter>
  <AdminAuthProvider>
    <FavoritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoritesProvider>
  </AdminAuthProvider>
</BrowserRouter>
);