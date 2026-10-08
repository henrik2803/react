import {
  ArrowUpRight,
  ShoppingBag,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import useCart from "../../../hooks/useCart";

import styles from "./FeedActions.module.css";

function FeedActions({
  product,
}) {
  const {
    cartItems,
    addItem,
  } = useCart();

  const isMoto =
    product.type === "moto";

  const hasVariants =
    product.variants?.length > 0;

  const productAvailable =
    product.stock?.available !==
    false;

  const maxStock =
    product.stock?.quantity;

  const currentCartItem =
    cartItems.find(
      (item) =>
        item.productId ===
          product.id &&
        item.variantId === null
    );

  const quantityInCart =
    currentCartItem?.quantity ?? 0;

  const reachedStockLimit =
    typeof maxStock ===
      "number" &&
    quantityInCart >= maxStock;

  const canQuickAdd =
    !isMoto &&
    !hasVariants &&
    productAvailable &&
    !reachedStockLimit;

  function handleAddToCart() {
    if (!canQuickAdd) {
      return;
    }

    addItem({
      productId:
        product.id,

      variantId: null,

      quantity: 1,

      maxQuantity:
        typeof maxStock ===
        "number"
          ? maxStock
          : null,
    });
  }

  /*
   * Motos:
   * não entram no carrinho.
   */
  if (isMoto) {
    return (
      <div
        className={styles.actions}
      >
        <Link
          to={`/produto/${product.slug}`}
          className={
            styles.primary
          }
        >
          Conhecer a moto

          <ArrowUpRight
            size={18}
          />
        </Link>
      </div>
    );
  }

  /*
   * Produto com variantes:
   * precisa escolher cor/tamanho
   * na página do produto.
   */
  if (hasVariants) {
    return (
      <div
        className={styles.actions}
      >
        <Link
          to={`/produto/${product.slug}`}
          className={
            styles.primary
          }
        >
          Escolher opções

          <ArrowUpRight
            size={18}
          />
        </Link>
      </div>
    );
  }

  /*
   * Produto sem variantes:
   * pode ser adicionado
   * diretamente pelo Feed.
   */
  return (
    <div
      className={styles.actions}
    >
      {product.sales
        ?.purchasableOnline && (
        <button
          type="button"
          className={
            styles.primary
          }
          disabled={
            !canQuickAdd
          }
          onClick={
            handleAddToCart
          }
        >
          <ShoppingBag
            size={18}
          />

          {reachedStockLimit
            ? "Estoque máximo atingido"
            : !productAvailable
              ? "Indisponível"
              : "Adicionar ao carrinho"}
        </button>
      )}

      <Link
        to={`/produto/${product.slug}`}
        className={
          styles.secondary
        }
      >
        Ver produto

        <ArrowUpRight
          size={17}
        />
      </Link>

      {quantityInCart > 0 && (
        <span
          className={
            styles.cartInfo
          }
        >
          {quantityInCart}{" "}
          {quantityInCart === 1
            ? "unidade no carrinho"
            : "unidades no carrinho"}
        </span>
      )}
    </div>
  );
}

export default FeedActions;