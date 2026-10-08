import {
  Heart,
  MessageCircle,
} from "lucide-react";

import Button from "../../ui/Button/Button";

import useFavorites from "../../../hooks/useFavorites";

import styles from "./ProductActions.module.css";

function ProductActions({
  product,
  selectedVariantId,
}) {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  const isMoto =
    product.type === "moto";

  const hasVariants =
    product.variants?.length > 0;

  const canAddToCart =
    !hasVariants ||
    Boolean(selectedVariantId);

  const favorite =
    isFavorite(product.id);

  function handleFavorite() {
    toggleFavorite(product.id);
  }

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
              title={
                canAddToCart
                  ? "Adicionar ao carrinho"
                  : "Selecione uma opção antes de adicionar ao carrinho"
              }
            >
              Adicionar ao carrinho
            </Button>

            {!canAddToCart && (
              <span
                className={
                  styles.helper
                }
              >
                Selecione o tamanho antes
                de adicionar ao carrinho.
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