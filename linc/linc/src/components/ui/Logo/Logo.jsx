import styles from "./Logo.module.css";

function Logo() {
  return (
    <a
      href="#inicio"
      className={styles.logo}
      aria-label="LINC - Página inicial"
    >
      <span className={styles.word}>LIN</span>

      <span className={styles.placeholder}>
        C
      </span>
    </a>
  );
}

export default Logo;