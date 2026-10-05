import { MessageCircle } from "lucide-react";

import { getWhatsAppLink } from "../../../constants/contact";

import styles from "./FloatingWhatsApp.module.css";

function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppLink(
        "Olá! Gostaria de conhecer as soluções da LINC."
      )}
      className={styles.button}
      aria-label="Falar com a LINC pelo WhatsApp"
    >
      <MessageCircle size={27} />

      <span>Fale conosco</span>
    </a>
  );
}

export default FloatingWhatsApp;