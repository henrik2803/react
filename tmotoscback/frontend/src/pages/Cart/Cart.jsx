import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import Container from "../../components/layout/Container/Container";
import Button from "../../components/ui/Button/Button";

import useCart from "../../hooks/useCart";

import {
  getProductsByIds,
} from "../../services/productService";

import {
  formatBRL,
} from "../../utils/currency";

import styles from "./Cart.module.css";

function Cart() {
  const {
    cartItems,
    cartCount,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [
    products,
    setProducts,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const productIds = [
          ...new Set(
            cartItems.map(
              (item) =>
                item.productId
            )
          ),
        ];

        const data =
          await getProductsByIds(
            productIds
          );

        setProducts(data);
      } catch (error) {
        console.error(
          "Erro ao carregar carrinho:",
          error
        );

        setError(
          "Não foi possível carregar o carrinho."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [cartItems]);

  const detailedItems =
    useMemo(() => {
      return cartItems
        .map((cartItem) => {
          const product =
            products.find(
              (product) =>
                product.id ===
                cartItem.productId
            );

          if (!product) {
            return null;
          }

          const variant =
            product.variants?.find(
              (variant) =>
                variant.id ===
                cartItem.variantId
            ) ?? null;

          const color =
            variant
              ? product.colors?.find(
                  (color) =>
                    color.id ===
                    variant.colorId
                ) ?? null
              : null;

          const availableStock =
            variant
              ? variant.stock
              : product.stock
                  ?.quantity;

          return {
            ...cartItem,

            product,
            variant,
            color,
            availableStock,
          };
        })
        .filter(Boolean);
    }, [
      cartItems,
      products,
    ]);

  const subtotal =
    detailedItems.reduce(
      (total, item) =>
        total +
        item.product.price *
          item.quantity,
      0
    );

  function handleDecrease(item) {
    updateQuantity(
      item.productId,
      item.variantId,
      item.quantity - 1
    );
  }

  function handleIncrease(item) {
    if (
      typeof item.availableStock ===
        "number" &&
      item.quantity >=
        item.availableStock
    ) {
      return;
    }

    updateQuantity(
      item.productId,
      item.variantId,
      item.quantity + 1
    );
  }

  function handleRemove(item) {
    removeItem(
      item.productId,
      item.variantId
    );
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <Container>
          <div className={styles.status}>
            Carregando carrinho...
          </div>
        </Container>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <Container>
          <div className={styles.status}>
            <h1>
              Não foi possível carregar
              o carrinho
            </h1>

            <p>{error}</p>
          </div>
        </Container>
      </main>
    );
  }

  if (!detailedItems.length) {
    return (
      <main className={styles.page}>
        <Container>
          <section
            className={styles.empty}
          >
            <div
              className={
                styles.emptyIcon
              }
            >
              <ShoppingBag
                size={30}
              />
            </div>

            <h1>
              Seu carrinho está vazio
            </h1>

            <p>
              Explore equipamentos,
              acessórios e peças para
              encontrar o que precisa.
            </p>

            <Link
              to="/catalogo"
              className={
                styles.catalogLink
              }
            >
              Explorar catálogo
            </Link>
          </section>
        </Container>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Container>
        <section
          className={styles.header}
        >
          <div>
            <span
              className={
                styles.eyebrow
              }
            >
              Seu pedido
            </span>

            <h1
              className={
                styles.title
              }
            >
              Carrinho
            </h1>

            <p
              className={
                styles.description
              }
            >
              Revise os produtos,
              variantes e quantidades
              antes de continuar.
            </p>
          </div>

          <div
            className={
              styles.headerActions
            }
          >
            <span
              className={styles.count}
            >
              {cartCount}{" "}
              {cartCount === 1
                ? "item"
                : "itens"}
            </span>

            <button
              type="button"
              className={
                styles.clearButton
              }
              onClick={clearCart}
            >
              Limpar carrinho
            </button>
          </div>
        </section>

        <div className={styles.layout}>
          <section
            className={styles.items}
          >
            {detailedItems.map(
              (item) => {
                const {
                  product,
                  variant,
                  color,
                } = item;

                const reachedStockLimit =
                  typeof item.availableStock ===
                    "number" &&
                  item.quantity >=
                    item.availableStock;

                return (
                  <article
                    key={`${item.productId}-${item.variantId ?? "default"}`}
                    className={
                      styles.item
                    }
                  >
                    <Link
                      to={`/produto/${product.slug}`}
                      className={
                        styles.imageLink
                      }
                    >
                      <img
                        src={
                          product.media
                            .cover
                        }
                        alt={
                          product.name
                        }
                        className={
                          styles.image
                        }
                      />
                    </Link>

                    <div
                      className={
                        styles.itemContent
                      }
                    >
                      <div
                        className={
                          styles.itemTop
                        }
                      >
                        <div>
                          <span
                            className={
                              styles.brand
                            }
                          >
                            {
                              product.brand
                            }
                          </span>

                          <Link
                            to={`/produto/${product.slug}`}
                            className={
                              styles.name
                            }
                          >
                            {
                              product.name
                            }
                          </Link>
                        </div>

                        <button
                          type="button"
                          className={
                            styles.removeButton
                          }
                          onClick={() =>
                            handleRemove(
                              item
                            )
                          }
                          aria-label={`Remover ${product.name} do carrinho`}
                        >
                          <Trash2
                            size={18}
                          />
                        </button>
                      </div>

                      {(color ||
                        variant) && (
                        <div
                          className={
                            styles.variantInfo
                          }
                        >
                          {color && (
                            <span>
                              Cor:{" "}
                              <strong>
                                {
                                  color.name
                                }
                              </strong>
                            </span>
                          )}

                          {variant?.size && (
                            <span>
                              Tamanho:{" "}
                              <strong>
                                {
                                  variant.size
                                }
                              </strong>
                            </span>
                          )}
                        </div>
                      )}

                      <div
                        className={
                          styles.itemBottom
                        }
                      >
                        <div
                          className={
                            styles.quantity
                          }
                        >
                          <button
                            type="button"
                            onClick={() =>
                              handleDecrease(
                                item
                              )
                            }
                            aria-label="Diminuir quantidade"
                          >
                            <Minus
                              size={16}
                            />
                          </button>

                          <span>
                            {
                              item.quantity
                            }
                          </span>

                          <button
                            type="button"
                            disabled={
                              reachedStockLimit
                            }
                            onClick={() =>
                              handleIncrease(
                                item
                              )
                            }
                            aria-label="Aumentar quantidade"
                          >
                            <Plus
                              size={16}
                            />
                          </button>
                        </div>

                        <div
                          className={
                            styles.itemPrice
                          }
                        >
                          <span>
                            {formatBRL(
                              product.price
                            )}{" "}
                            cada
                          </span>

                          <strong>
                            {formatBRL(
                              product.price *
                                item.quantity
                            )}
                          </strong>
                        </div>
                      </div>

                      {reachedStockLimit && (
                        <span
                          className={
                            styles.stockMessage
                          }
                        >
                          Quantidade máxima
                          disponível em
                          estoque.
                        </span>
                      )}
                    </div>
                  </article>
                );
              }
            )}
          </section>

          <aside
            className={styles.summary}
          >
            <h2>
              Resumo do pedido
            </h2>

            <div
              className={
                styles.summaryRows
              }
            >
              <div
                className={
                  styles.summaryRow
                }
              >
                <span>
                  Produtos
                </span>

                <strong>
                  {formatBRL(
                    subtotal
                  )}
                </strong>
              </div>

              <div
                className={
                  styles.summaryRow
                }
              >
                <span>
                  Entrega
                </span>

                <strong>
                  A combinar
                </strong>
              </div>
            </div>

            <div
              className={
                styles.total
              }
            >
              <span>Total</span>

              <strong>
                {formatBRL(
                  subtotal
                )}
              </strong>
            </div>

            <Button disabled>
              Continuar pedido
            </Button>

            <p
              className={
                styles.summaryNote
              }
            >
              A finalização pelo
              WhatsApp será conectada na
              próxima etapa.
            </p>

            <Link
              to="/catalogo"
              className={
                styles.continueShopping
              }
            >
              Continuar comprando
            </Link>
          </aside>
        </div>
      </Container>
    </main>
  );
}

export default Cart;