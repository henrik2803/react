import {
  Heart,
  Search,
  ShoppingBag,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import Container from "../Container/Container";

import useFavorites from "../../../hooks/useFavorites";
import useCart from "../../../hooks/useCart";

import styles from "./Header.module.css";

function Header() {
  const {
    favoritesCount,
  } = useFavorites();

  const {
    cartCount,
  } = useCart();

  return (
    <header className={styles.header}>
      <Container
        className={styles.content}
      >
        <NavLink
          to="/"
          className={styles.logo}
        >
          T<span>MOTOS</span>
        </NavLink>

        <nav
          className={
            styles.navigation
          }
        >
          <NavLink
            to="/"
            className={({
              isActive,
            }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Feed
          </NavLink>

          <NavLink
            to="/catalogo"
            className={({
              isActive,
            }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Catálogo
          </NavLink>

          <NavLink
            to="/contato"
            className={({
              isActive,
            }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Contato
          </NavLink>
        </nav>

        <div
          className={styles.actions}
        >
          <NavLink
            to="/catalogo"
            className={
              styles.iconButton
            }
            aria-label="Buscar"
          >
            <Search size={21} />
          </NavLink>

          <NavLink
            to="/favoritos"
            className={
              styles.iconButton
            }
            aria-label={`Favoritos: ${favoritesCount}`}
          >
            <Heart size={21} />

            {favoritesCount > 0 && (
              <span
                className={
                  styles.badge
                }
              >
                {favoritesCount > 99
                  ? "99+"
                  : favoritesCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/carrinho"
            className={
              styles.iconButton
            }
            aria-label={`Carrinho: ${cartCount} itens`}
          >
            <ShoppingBag
              size={21}
            />

            {cartCount > 0 && (
              <span
                className={
                  styles.badge
                }
              >
                {cartCount > 99
                  ? "99+"
                  : cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </Container>
    </header>
  );
}

export default Header;