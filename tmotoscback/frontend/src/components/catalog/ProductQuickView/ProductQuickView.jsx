import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Heart,
  MessageCircle,
  ShoppingBag,
  X,
} from "lucide-react";

import Button from "../../ui/Button/Button";

import LeadModal from "../../lead/LeadModal/LeadModal";
import QuoteForm from "../../lead/QuoteForm/QuoteForm";
import TestRideForm from "../../lead/TestRideForm/TestRideForm";

import useCart from "../../../hooks/useCart";
import useFavorites from "../../../hooks/useFavorites";

import {
  formatBRL,
} from "../../../utils/currency";

import styles from "./ProductQuickView.module.css";

function ProductQuickView({
  product,
  onClose,
}) {
  const navigate =
    useNavigate();

  const [
    quoteOpen,
    setQuoteOpen,
  ] = useState(false);

  const [
    testRideOpen,
    setTestRideOpen,
  ] = useState(false);

  const {
    cartItems,
    addItem,
  } = useCart();

  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  if (!product) {
    return (
      <aside className={styles.empty}>
        <span>
          Selecione um produto
        </span>

        <p>
          Clique em um item do
          catálogo para visualizar
          os detalhes rápidos.
        </p>
      </aside>
    );
  }

  const isMoto =
    product.type === "moto";

  const hasVariants =
    product.variants?.length > 0;

  const favorite =
    isFavorite(product.id);

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

  const productAvailable =
    product.stock?.available !==
    false;

  const reachedStockLimit =
    typeof maxStock ===
      "number" &&
    quantityInCart >= maxStock;

  const canQuickAdd =
    !hasVariants &&
    productAvailable &&
    !reachedStockLimit;

  function goToProduct() {
    navigate(
      `/produto/${product.slug}`
    );
  }

  function handleQuickAdd() {
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

  function handleFavorite() {
    toggleFavorite(product.id);
  }

  function handleOpenQuote() {
    setQuoteOpen(true);
  }

  function handleCloseQuote() {
    setQuoteOpen(false);
  }

  function handleOpenTestRide() {
    setTestRideOpen(true);
  }

  function handleCloseTestRide() {
    setTestRideOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className={
          styles.backdrop
        }
        onClick={onClose}
        aria-label="Fechar detalhes do produto"
      />

      <aside
        className={
          styles.quickView
        }
      >
        <button
          type="button"
          className={
            styles.close
          }
          onClick={onClose}
          aria-label="Fechar detalhes"
        >
          <X size={20} />
        </button>

        <div
          className={
            styles.mobileHandle
          }
        />

        <div
          className={styles.media}
        >
          <img
            src={
              product.media.cover
            }
            alt={product.name}
            className={
              styles.image
            }
          />
        </div>

        <div
          className={
            styles.content
          }
        >
          <span
            className={
              styles.brand
            }
          >
            {product.brand}
          </span>

          <h2
            className={
              styles.name
            }
          >
            {product.name}
          </h2>

          <p
            className={
              styles.description
            }
          >
            {
              product.shortDescription
            }
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

          <div
            className={
              styles.actions
            }
          >
            {isMoto ? (
              <>
                <Button
                  onClick={
                    goToProduct
                  }
                >
                  Ver detalhes
                </Button>

                {product.sales
                  ?.requestQuote && (
                  <Button
                    variant="secondary"
                    onClick={
                      handleOpenQuote
                    }
                  >
                    Solicitar proposta
                  </Button>
                )}

                {product.sales
                  ?.testRide && (
                  <Button
                    variant="secondary"
                    onClick={
                      handleOpenTestRide
                    }
                  >
                    Agendar Test Ride
                  </Button>
                )}
              </>
            ) : hasVariants ? (
              <Button
                onClick={
                  goToProduct
                }
              >
                Escolher opções
              </Button>
            ) : (
              <>
                <Button
                  onClick={
                    goToProduct
                  }
                >
                  Ver detalhes
                </Button>

                {product.sales
                  ?.purchasableOnline && (
                  <Button
                    variant="secondary"
                    disabled={
                      !canQuickAdd
                    }
                    onClick={
                      handleQuickAdd
                    }
                  >
                    <ShoppingBag
                      size={18}
                    />

                    {reachedStockLimit
                      ? "Estoque máximo atingido"
                      : productAvailable
                        ? "Adicionar ao carrinho"
                        : "Indisponível"}
                  </Button>
                )}
              </>
            )}

            <div
              className={
                styles.secondaryActions
              }
            >
              <Button
                variant="ghost"
                onClick={
                  handleFavorite
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
        </div>
      </aside>

      <LeadModal
        open={quoteOpen}
        title="Solicitar proposta"
        onClose={
          handleCloseQuote
        }
      >
        <QuoteForm
          product={product}
          onClose={
            handleCloseQuote
          }
        />
      </LeadModal>

      <LeadModal
        open={testRideOpen}
        title="Agendar Test Ride"
        onClose={
          handleCloseTestRide
        }
      >
        <TestRideForm
          product={product}
          onClose={
            handleCloseTestRide
          }
        />
      </LeadModal>
    </>
  );
}

export default ProductQuickView;