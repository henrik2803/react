import {
  createContext,
  useEffect,
  useState,
} from "react";

const CartContext =
  createContext(null);

const STORAGE_KEY = "tmotos_cart";

const CART_EXPIRATION_DAYS = 5;

const CART_EXPIRATION_TIME =
  CART_EXPIRATION_DAYS *
  24 *
  60 *
  60 *
  1000;

function getStoredCart() {
  try {
    const stored =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!stored) {
      return [];
    }

    const parsed =
      JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    const now = Date.now();

    return parsed.filter(
      (item) => {
        if (!item.updatedAt) {
          return false;
        }

        return (
          now - item.updatedAt <
          CART_EXPIRATION_TIME
        );
      }
    );
  } catch (error) {
    console.error(
      "Erro ao carregar carrinho:",
      error
    );

    return [];
  }
}

function CartProvider({
  children,
}) {
  const [cartItems, setCartItems] =
    useState(getStoredCart);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  function addItem({
    productId,
    variantId = null,
    quantity = 1,
  }) {
    setCartItems(
      (currentItems) => {
        const existingItem =
          currentItems.find(
            (item) =>
              item.productId ===
                productId &&
              item.variantId ===
                variantId
          );

        if (existingItem) {
          return currentItems.map(
            (item) => {
              const isSameItem =
                item.productId ===
                  productId &&
                item.variantId ===
                  variantId;

              if (!isSameItem) {
                return item;
              }

              return {
                ...item,

                quantity:
                  item.quantity +
                  quantity,

                updatedAt:
                  Date.now(),
              };
            }
          );
        }

        return [
          ...currentItems,
          {
            productId,
            variantId,
            quantity,
            updatedAt:
              Date.now(),
          },
        ];
      }
    );
  }

  function removeItem(
    productId,
    variantId = null
  ) {
    setCartItems(
      (currentItems) =>
        currentItems.filter(
          (item) =>
            !(
              item.productId ===
                productId &&
              item.variantId ===
                variantId
            )
        )
    );
  }

  function updateQuantity(
    productId,
    variantId,
    quantity
  ) {
    if (quantity <= 0) {
      removeItem(
        productId,
        variantId
      );

      return;
    }

    setCartItems(
      (currentItems) =>
        currentItems.map(
          (item) => {
            const isSameItem =
              item.productId ===
                productId &&
              item.variantId ===
                variantId;

            if (!isSameItem) {
              return item;
            }

            return {
              ...item,

              quantity,

              updatedAt:
                Date.now(),
            };
          }
        )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const cartCount =
    cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  const value = {
    cartItems,
    cartCount,

    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

export {
  CartContext,
  CartProvider,
};