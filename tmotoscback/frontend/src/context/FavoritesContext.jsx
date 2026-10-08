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

    return Array.isArray(parsed)
      ? parsed
      : [];
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

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds]);

  function isFavorite(productId) {
    return favoriteIds.includes(
      productId
    );
  }

  function addFavorite(productId) {
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
    setFavoriteIds(
      (currentFavorites) => {
        const alreadyFavorite =
          currentFavorites.includes(
            productId
          );

        if (alreadyFavorite) {
          return currentFavorites.filter(
            (id) =>
              id !== productId
          );
        }

        return [
          ...currentFavorites,
          productId,
        ];
      }
    );
  }

  const value = {
    favoriteIds,

    favoritesCount:
      favoriteIds.length,

    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
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