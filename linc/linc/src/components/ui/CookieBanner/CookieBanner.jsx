import {
  Cookie,
  ShieldCheck,
  X,
} from "lucide-react";

import { useState } from "react";

import styles from "./CookieBanner.module.css";

const STORAGE_KEY = "linc_cookie_consent";

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    const savedConsent =
      localStorage.getItem(STORAGE_KEY);

    return !savedConsent;
  });

  const handleAccept = () => {
    localStorage.setItem(
      STORAGE_KEY,
      "accepted"
    );

    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(
      STORAGE_KEY,
      "rejected"
    );

    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <div className={styles.banner}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleReject}
          aria-label="Fechar aviso de cookies"
        >
          <X size={20} />
        </button>

        <div className={styles.icon}>
          <Cookie size={28} />
        </div>

        <div className={styles.content}>
          <span className={styles.label}>
            <ShieldCheck size={15} />
            SUA PRIVACIDADE
          </span>

          <h2 id="cookie-title">
            Utilizamos tecnologias para melhorar
            sua experiência.
          </h2>

          <p id="cookie-description">
            A LINC utiliza armazenamento local e
            tecnologias essenciais para garantir
            o funcionamento do site e melhorar sua
            experiência de navegação.
          </p>

          <p className={styles.note}>
            Você pode aceitar ou recusar tecnologias
            não essenciais. Sua escolha ficará salva
            neste dispositivo.
          </p>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.rejectButton}
            onClick={handleReject}
          >
            Recusar
          </button>

          <button
            type="button"
            className={styles.acceptButton}
            onClick={handleAccept}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
//sssteste
export default CookieBanner;