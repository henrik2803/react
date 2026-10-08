import styles from "./ProductColors.module.css";

function ProductColors({
  colors = [],
  selectedColorId,
  onSelectColor,
}) {
  if (!colors.length) {
    return null;
  }

  const selectedColor = colors.find(
    (color) =>
      color.id === selectedColorId
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>
          Cor
        </span>

        {selectedColor && (
          <strong
            className={styles.selectedName}
          >
            {selectedColor.name}
          </strong>
        )}
      </div>

      <div
        className={styles.colors}
        role="radiogroup"
        aria-label="Cores disponíveis"
      >
        {colors.map((color) => {
          const isSelected =
            selectedColorId === color.id;

          return (
            <button
              key={color.id}
              type="button"
              className={
                isSelected
                  ? `${styles.colorButton} ${styles.active}`
                  : styles.colorButton
              }
              onClick={() =>
                onSelectColor(color.id)
              }
              aria-label={`Selecionar cor ${color.name}`}
              aria-pressed={isSelected}
              title={color.name}
            >
              <span
                className={styles.swatch}
                style={{
                  backgroundColor:
                    color.hex,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProductColors;