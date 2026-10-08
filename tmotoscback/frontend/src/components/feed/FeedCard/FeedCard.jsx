import {
  ArrowUpRight,
  Heart,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import FeedMedia from "../FeedMedia/FeedMedia";

import useFavorites from "../../../hooks/useFavorites";

import {
  formatBRL,
} from "../../../utils/currency";

import styles from "./FeedCard.module.css";

function FeedCard({
  product,
  index,
  total,
  isActive,
}) {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const favorite =
    isFavorite(product.id);

  const isMoto =
    product.type === "moto";

  function handleFavorite() {
    toggleFavorite(product.id);
  }

  return (
    <article
      className={styles.card}
      data-feed-id={product.id}
    >
      <FeedMedia
        product={product}
        isActive={isActive}
        index={index}
      />

      <div
        className={styles.overlay}
      />

      <div
        className={styles.topBar}
      >
        <div
          className={styles.badges}
        >
          {product.feed
            ?.featured && (
            <span
              className={
                styles.featured
              }
            >
              Destaque
            </span>
          )}

          {product.badges?.map(
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

        <span
          className={
            styles.counter
          }
        >
          {index + 1} / {total}
        </span>
      </div>

      <div
        className={styles.actions}
      >
        <button
          type="button"
          className={`${styles.actionButton} ${
            favorite
              ? styles.favoriteActive
              : ""
          }`}
          onClick={
            handleFavorite
          }
          aria-label={
            favorite
              ? `Remover ${product.name} dos favoritos`
              : `Favoritar ${product.name}`
          }
          aria-pressed={
            favorite
          }
        >
          <Heart
            size={24}
            fill={
              favorite
                ? "currentColor"
                : "none"
            }
          />
        </button>

        <Link
          to={`/produto/${product.slug}`}
          className={
            styles.actionButton
          }
          aria-label={`Abrir ${product.name}`}
        >
          <ArrowUpRight
            size={24}
          />
        </Link>
      </div>

      <div
        className={styles.content}
      >
        <span
          className={styles.brand}
        >
          {product.brand}
        </span>

        <h2
          className={styles.name}
        >
          {product.name}
        </h2>

        <p
          className={
            styles.feedText
          }
        >
          {product.feed?.text ||
            product.shortDescription}
        </p>

        <div
          className={
            styles.priceArea
          }
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
            className={
              styles.price
            }
          >
            {formatBRL(
              product.price
            )}
          </strong>
        </div>

        <Link
          to={`/produto/${product.slug}`}
          className={
            styles.productLink
          }
        >
          {isMoto
            ? "Conhecer a moto"
            : "Ver produto"}

          <ArrowUpRight
            size={18}
          />
        </Link>
      </div>

      {index < total - 1 && (
        <div
          className={
            styles.scrollHint
          }
          aria-hidden="true"
        >
          <span>
            Arraste para descobrir
          </span>

          <div
            className={
              styles.scrollLine
            }
          />
        </div>
      )}
    </article>
  );
}

export default FeedCard;