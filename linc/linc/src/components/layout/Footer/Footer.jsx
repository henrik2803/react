import {
  Mail,
  MessageCircle,
} from "lucide-react";

import Container from "../../ui/Container/Container";
import Logo from "../../ui/Logo/Logo";

import {
  CONTACT,
  getWhatsAppLink,
} from "../../../constants/contact";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Logo />

            <p>
              Soluções tecnológicas para empresas que
              querem crescer com mais eficiência,
              inovação e presença digital.
            </p>
          </div>

          <div>
            <h3>Soluções</h3>

            <nav aria-label="Soluções">
              <a href="#nfc">
                Automação NFC
              </a>

              <a href="#landing-pages">
                Landing Pages
              </a>
            </nav>
          </div>

          <div>
            <h3>Navegação</h3>

            <nav aria-label="Navegação do rodapé">
              <a href="#solucoes">
                Soluções
              </a>

              <a href="#processo">
                Processo
              </a>

              <a href="#contato">
                Contato
              </a>
            </nav>
          </div>

          <div>
            <h3>Contato</h3>

            <nav aria-label="Contatos">
              <a
                href={getWhatsAppLink(
                  "Olá! Gostaria de saber mais sobre as soluções da LINC."
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>

              {CONTACT.email && (
                <a
                  href={`mailto:${CONTACT.email}`}
                >
                  <Mail size={16} />

                  {CONTACT.email}
                </a>
              )}

            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © 2026 LINC. Todos os direitos reservados.
          </span>

          <span>
            Tecnologia para gerar resultados.
          </span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;