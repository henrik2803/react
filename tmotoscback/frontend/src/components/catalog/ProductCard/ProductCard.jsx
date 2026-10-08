import { Heart } from "lucide-react";

import { formatBRL } from "../../../utils/currency";

import useFavorites from "../../../hooks/useFavorites";

import styles from "./ProductCard.module.css";

function ProductCard({
  product,
  onSelect,
}) {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const favorite =
    isFavorite(product.id);

  function handleFavorite(event) {
    event.stopPropagation();

    toggleFavorite(product.id);
  }

  return (
    <article
      className={styles.card}
      onClick={() =>
        onSelect?.(product)
      }
    >
      <div className={styles.media}>
        <img
          src={product.media.cover}
          alt={product.name}
          className={styles.image}
        />

        <button
          type="button"
          className={`${styles.favorite} ${
            favorite
              ? styles.favoriteActive
              : ""
          }`}
          aria-label={
            favorite
              ? `Remover ${product.name} dos favoritos`
              : `Favoritar ${product.name}`
          }
          aria-pressed={favorite}
          onClick={handleFavorite}
        >
          <Heart
            size={20}
            fill={
              favorite
                ? "currentColor"
                : "none"
            }
          />
        </button>

        {product.badges?.length >
          0 && (
          <div className={styles.badges}>
            {product.badges.map(
              (badge) => (
                <span
                  key={badge}
                  className={
                    styles.badge
                  }
                >
                  {badge}
                </span>
              )
            )}
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

        <p
          className={styles.description}
        >
          {product.shortDescription}
        </p>

        <div
          className={styles.priceArea}
        >
          {product.oldPrice && (
            <span
              className={
                styles.oldPrice
              }
            >
              {formatBRL(
                product.oldPrice
              )}
            </span>
          )}

          <strong
            className={styles.price}
          >
            {formatBRL(
              product.price
            )}
          </strong>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;