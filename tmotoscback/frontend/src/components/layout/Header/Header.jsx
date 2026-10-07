import {
  Heart,
  Search,
  ShoppingBag,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import Container from "../Container/Container";

import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.content}>
        <NavLink
          to="/"
          className={styles.logo}
        >
          T<span>MOTOS</span>
        </NavLink>

        <nav className={styles.navigation}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Feed
          </NavLink>

          <NavLink
            to="/catalogo"
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Catálogo
          </NavLink>

          <NavLink
            to="/contato"
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            Contato
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/catalogo"
            className={styles.iconButton}
            aria-label="Buscar"
          >
            <Search size={21} />
          </NavLink>

          <NavLink
            to="/favoritos"
            className={styles.iconButton}
            aria-label="Favoritos"
          >
            <Heart size={21} />
          </NavLink>

          <NavLink
            to="/carrinho"
            className={styles.iconButton}
            aria-label="Carrinho"
          >
            <ShoppingBag size={21} />
          </NavLink>
        </div>
      </Container>
    </header>
  );
}

export default Header;