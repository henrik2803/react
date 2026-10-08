import { formatBRL } from "../../../utils/currency";

import styles from "./ProductPrice.module.css";

function ProductPrice({
  price,
  oldPrice,
  installment,
}) {
  return (
    <div className={styles.priceArea}>
      {oldPrice && (
        <span className={styles.oldPrice}>
          {formatBRL(oldPrice)}
        </span>
      )}

      <strong className={styles.price}>
        {formatBRL(price)}
      </strong>

      {installment?.enabled &&
        installment.installments &&
        installment.value && (
          <span
            className={styles.installment}
          >
            {installment.installments}x de{" "}
            {formatBRL(
              installment.value
            )}
          </span>
        )}
    </div>
  );
}

export default ProductPrice;