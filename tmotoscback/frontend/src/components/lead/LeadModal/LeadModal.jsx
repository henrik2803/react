import {
  useEffect,
} from "react";

import {
  X,
} from "lucide-react";

import styles from "./LeadModal.module.css";

function LeadModal({
  open,
  title,
  children,
  onClose,
}) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        "";
    };
  }, [
    open,
    onClose,
  ]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Fechar formulário"
      />

      <div
        className={styles.panel}
      >
        <div
          className={styles.header}
        >
          <div>
            <span
              className={
                styles.eyebrow
              }
            >
              TMotos
            </span>

            <h2>
              {title}
            </h2>
          </div>

          <button
            type="button"
            className={
              styles.closeButton
            }
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className={styles.content}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default LeadModal;