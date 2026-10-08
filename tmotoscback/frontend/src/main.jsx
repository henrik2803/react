import {
  StrictMode,
} from "react";

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

import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/globals.css";

createRoot(
  document.getElementById(
    "root"
  )
).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>
);