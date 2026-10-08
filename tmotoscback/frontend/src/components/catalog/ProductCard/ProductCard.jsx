import { Heart } from "lucide-react";

import { formatBRL } from "../../../utils/currency";

import styles from "./ProductCard.module.css";

function ProductCard({
  product,
  onSelect,
}) {
  return (
    <article
      className={styles.card}
      onClick={onSelect}
    >
      <div className={styles.media}>
        <img
          src={product.media.cover}
          alt={product.name}
          className={styles.image}
        />

        <button
          type="button"
          className={styles.favorite}
          aria-label={`Favoritar ${product.name}`}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Heart size={20} />
        </button>

        {product.badges?.length > 0 && (
          <div className={styles.badges}>
            {product.badges.map((badge) => (
              <span
                key={badge}
                className={styles.badge}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.brand}>
          {product.brand}
        </span>

        <h2 className={styles.name}>
          {product.name}
        </h2>

        <p className={styles.description}>
          {product.shortDescription}
        </p>

        <div className={styles.priceArea}>
          {product.oldPrice && (
            <span className={styles.oldPrice}>
              {formatBRL(product.oldPrice)}
            </span>
          )}

          <strong className={styles.price}>
            {formatBRL(product.price)}
          </strong>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;