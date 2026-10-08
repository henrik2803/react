import styles from "./ProductVariants.module.css";

function ProductVariants({
  variants = [],
  selectedColorId,
  selectedVariantId,
  onSelectVariant,
}) {
  const filteredVariants =
    selectedColorId
      ? variants.filter(
          (variant) =>
            !variant.colorId ||
            variant.colorId ===
              selectedColorId
        )
      : variants;

  if (!filteredVariants.length) {
    return null;
  }

  const selectedVariant =
    filteredVariants.find(
      (variant) =>
        variant.id ===
        selectedVariantId
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>
          Tamanho
        </span>

        {selectedVariant && (
          <span className={styles.stock}>
            {selectedVariant.stock > 0
              ? `${selectedVariant.stock} em estoque`
              : "Indisponível"}
          </span>
        )}
      </div>

      <div className={styles.variants}>
        {filteredVariants.map(
          (variant) => {
            const isSelected =
              variant.id ===
              selectedVariantId;

            const isUnavailable =
              variant.stock <= 0;

            return (
              <button
                key={variant.id}
                type="button"
                disabled={isUnavailable}
                className={
                  isSelected
                    ? `${styles.variant} ${styles.active}`
                    : styles.variant
                }
                onClick={() =>
                  onSelectVariant(
                    variant.id
                  )
                }
              >
                {variant.size ??
                  "Único"}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}

export default ProductVariants;