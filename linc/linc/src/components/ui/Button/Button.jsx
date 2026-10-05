import styles from "./Button.module.css";

function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}) {
  const classes = `
    ${styles.button}
    ${styles[variant]}
    ${className}
  `;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;