import {
  Heart,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

import Button from "../../ui/Button/Button";

import useFavorites from "../../../hooks/useFavorites";
import useCart from "../../../hooks/useCart";

import styles from "./ProductActions.module.css";

function ProductActions({
  product,
  selectedVariantId,
}) {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const {
    cartItems,
    addItem,
  } = useCart();

  const isMoto =
    product.type === "moto";

  const hasVariants =
    product.variants?.length > 0;

  const selectedVariant =
    hasVariants
      ? product.variants.find(
          (variant) =>
            variant.id ===
            selectedVariantId
        )
      : null;

  const maxStock =
    hasVariants
      ? selectedVariant?.stock
      : product.stock?.quantity;

  const currentCartItem =
    cartItems.find(
      (item) =>
        item.productId ===
          product.id &&
        item.variantId ===
          (selectedVariantId ||
            null)
    );

  const quantityInCart =
    currentCartItem?.quantity ?? 0;

  const productAvailable =
    product.stock?.available !==
    false;

  const hasRequiredSelection =
    !hasVariants ||
    Boolean(selectedVariant);

  const reachedStockLimit =
    typeof maxStock ===
      "number" &&
    quantityInCart >= maxStock;

  const canAddToCart =
    productAvailable &&
    hasRequiredSelection &&
    !reachedStockLimit;

  const favorite =
    isFavorite(product.id);

  function handleFavorite() {
    toggleFavorite(product.id);
  }

  function handleAddToCart() {
    if (!canAddToCart) {
      return;
    }

    addItem({
      productId:
        product.id,

      variantId:
        selectedVariantId ||
        null,

      quantity: 1,

      maxQuantity:
        typeof maxStock ===
        "number"
          ? maxStock
          : null,
    });
  }

  function getHelperMessage() {
    if (!productAvailable) {
      return "Produto indisponível.";
    }

    if (
      hasVariants &&
      !selectedVariant
    ) {
      return "Selecione o tamanho antes de adicionar ao carrinho.";
    }

    if (reachedStockLimit) {
      return "Quantidade máxima disponível em estoque atingida.";
    }

    return "";
  }

  const helperMessage =
    getHelperMessage();

  return (
    <div className={styles.actions}>
      {isMoto ? (
        <>
          {product.sales
            ?.requestQuote && (
            <Button>
              Solicitar proposta
            </Button>
          )}

          {product.sales
            ?.testRide && (
            <Button variant="secondary">
              Agendar Test Ride
            </Button>
          )}
        </>
      ) : (
        product.sales
          ?.purchasableOnline && (
          <>
            <Button
              disabled={
                !canAddToCart
              }
              onClick={
                handleAddToCart
              }
              title={
                canAddToCart
                  ? "Adicionar ao carrinho"
                  : helperMessage
              }
            >
              <ShoppingBag
                size={18}
              />

              {reachedStockLimit
                ? "Estoque máximo atingido"
                : "Adicionar ao carrinho"}
            </Button>

            {helperMessage && (
              <span
                className={
                  styles.helper
                }
              >
                {helperMessage}
              </span>
            )}
          </>
        )
      )}

      <div
        className={
          styles.secondaryActions
        }
      >
        <Button
          variant="ghost"
          className={
            favorite
              ? styles.favoriteActive
              : ""
          }
          onClick={
            handleFavorite
          }
          aria-pressed={
            favorite
          }
        >
          <Heart
            size={18}
            fill={
              favorite
                ? "currentColor"
                : "none"
            }
          />

          {favorite
            ? "Favoritado"
            : "Favoritar"}
        </Button>

        {product.sales
          ?.whatsapp && (
          <Button variant="ghost">
            <MessageCircle
              size={18}
            />

            WhatsApp
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductActions;