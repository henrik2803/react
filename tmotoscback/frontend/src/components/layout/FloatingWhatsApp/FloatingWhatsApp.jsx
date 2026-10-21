import {
  MessageCircle,
} from "lucide-react";

import styles from "./FloatingWhatsApp.module.css";

function FloatingWhatsApp() {
  function handleWhatsApp() {
    const phone =
      String(
        import.meta.env
          .VITE_WHATSAPP_NUMBER ||
          ""
      ).replace(
        /\D/g,
        ""
      );

    if (!phone) {
      console.error(
        "VITE_WHATSAPP_NUMBER não configurado."
      );

      alert(
        "Número do WhatsApp não configurado."
      );

      return;
    }

    const message = [
      "Olá!",
      "",
      "Vim pelo site da TMotos e gostaria de atendimento.",
      "",
      window.location.href,
    ].join("\n");

    const url =
      `https://wa.me/${phone}?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      url,
      "_blank"
    );
  }

  return (
    <button
      type="button"
      className={
        styles.whatsapp
      }
      onClick={
        handleWhatsApp
      }
      aria-label="Falar pelo WhatsApp"
      title="Falar pelo WhatsApp"
    >
      <MessageCircle
        size={30}
        strokeWidth={2.3}
      />
    </button>
  );
}

export default FloatingWhatsApp;