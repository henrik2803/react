import { useEffect, useState } from "react";
import {
  Menu,
  MessageCircle,
  X,
} from "lucide-react";

import Container from "../../ui/Container/Container";
import Button from "../../ui/Button/Button";
import Logo from "../../ui/Logo/Logo";

import { navigation } from "../../../constants/navigation";
import { getWhatsAppLink } from "../../../constants/contact";

import styles from "./Navbar.module.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((currentState) => !currentState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles.scrolled : ""
      }`}
    >
      <Container className={styles.container}>
        <div className={styles.logoArea}>
          <Logo />
        </div>

        <nav
          className={styles.desktopNav}
          aria-label="Navegação principal"
        >
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.navLink}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button
            href={getWhatsAppLink(
              "Olá! Gostaria de conhecer as soluções da LINC."
            )}
            className={styles.whatsapp}
          >
            <MessageCircle size={18} />

            <span>Fale no WhatsApp</span>
          </Button>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={
              menuOpen
                ? "Fechar menu de navegação"
                : "Abrir menu de navegação"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            className={styles.mobileNav}
            aria-label="Navegação mobile"
          >
            <div className={styles.mobileLinks}>
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.mobileLink}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <Button
              href={getWhatsAppLink(
                "Olá! Gostaria de conhecer as soluções da LINC."
              )}
              className={styles.mobileWhatsapp}
            >
              <MessageCircle size={18} />

              <span>Fale no WhatsApp</span>
            </Button>
          </nav>
        )}
      </Container>
    </header>
  );
}

export default Navbar;
