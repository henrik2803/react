import {
  createContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext =
  createContext(null);

const STORAGE_KEY =
  "tmotos_favorites";

function getStoredFavorites() {
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

    /*
     * Remove valores inválidos
     * e IDs duplicados.
     */
    return [
      ...new Set(
        parsed.filter(
          (id) =>
            typeof id ===
              "number" ||
            typeof id ===
              "string"
        )
      ),
    ];
  } catch (error) {
    console.error(
      "Erro ao carregar favoritos:",
      error
    );

    return [];
  }
}

function FavoritesProvider({
  children,
}) {
  const [
    favoriteIds,
    setFavoriteIds,
  ] = useState(
    getStoredFavorites
  );

  /*
   * Persiste favoritos
   * automaticamente.
   */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        favoriteIds
      )
    );
  }, [favoriteIds]);

  function isFavorite(
    productId
  ) {
    return favoriteIds.includes(
      productId
    );
  }

  function addFavorite(
    productId
  ) {
    if (
      productId ===
        undefined ||
      productId === null
    ) {
      return;
    }

    setFavoriteIds(
      (currentFavorites) => {
        if (
          currentFavorites.includes(
            productId
          )
        ) {
          return currentFavorites;
        }

        return [
          ...currentFavorites,
          productId,
        ];
      }
    );
  }

  function removeFavorite(
    productId
  ) {
    setFavoriteIds(
      (currentFavorites) =>
        currentFavorites.filter(
          (id) =>
            id !== productId
        )
    );
  }

  function toggleFavorite(
    productId
  ) {
    if (
      productId ===
        undefined ||
      productId === null
    ) {
      return;
    }

    setFavoriteIds(
      (currentFavorites) => {
        const alreadyFavorite =
          currentFavorites.includes(
            productId
          );

        if (
          alreadyFavorite
        ) {
          return currentFavorites.filter(
            (id) =>
              id !==
              productId
          );
        }

        return [
          ...currentFavorites,
          productId,
        ];
      }
    );
  }

  /*
   * Remove favoritos que
   * não existem mais na API
   * pública.
   *
   * Isso cobre produtos:
   * - desativados
   * - removidos
   * - IDs antigos
   */
  function syncFavorites(
    validProductIds
  ) {
    if (
      !Array.isArray(
        validProductIds
      )
    ) {
      return;
    }

    const validIds =
      new Set(
        validProductIds
      );

    setFavoriteIds(
      (currentFavorites) => {
        const nextFavorites =
          currentFavorites.filter(
            (id) =>
              validIds.has(id)
          );

        if (
          nextFavorites.length ===
          currentFavorites.length
        ) {
          return currentFavorites;
        }

        return nextFavorites;
      }
    );
  }

  function clearFavorites() {
    setFavoriteIds([]);
  }

  const favoritesCount =
    favoriteIds.length;

  const value = {
    favoriteIds,
    favoritesCount,

    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    syncFavorites,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider
      value={value}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export {
  FavoritesContext,
  FavoritesProvider,
};