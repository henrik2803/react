import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Heart,
} from "lucide-react";

import Container from "../../components/layout/Container/Container";
import ProductGrid from "../../components/catalog/ProductGrid/ProductGrid";

import useFavorites from "../../hooks/useFavorites";

import {
  getProductsByIds,
} from "../../services/productService";

import styles from "./Favorites.module.css";

function Favorites() {
  const navigate = useNavigate();

  const {
    favoriteIds,
    favoritesCount,
  } = useFavorites();

  const [
    favoriteProducts,
    setFavoriteProducts,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadFavorites() {
      try {
        setLoading(true);
        setError("");

        const products =
          await getProductsByIds(
            favoriteIds
          );

        setFavoriteProducts(products);
      } catch (error) {
        console.error(
          "Erro ao carregar favoritos:",
          error
        );

        setError(
          "Não foi possível carregar seus favoritos."
        );
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, [favoriteIds]);

  function handleSelectProduct(
    product
  ) {
    navigate(
      `/produto/${product.slug}`
    );
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <Container>
          <div className={styles.status}>
            Carregando favoritos...
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
              seus favoritos
            </h1>

            <p>{error}</p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Container>
        <section className={styles.header}>
          <div>
            <span className={styles.eyebrow}>
              Sua seleção
            </span>

            <h1 className={styles.title}>
              Favoritos
            </h1>

            <p
              className={
                styles.description
              }
            >
              Salve motos, equipamentos e
              acessórios para encontrar tudo
              novamente com facilidade.
            </p>
          </div>

          {favoritesCount > 0 && (
            <span className={styles.count}>
              {favoritesCount}{" "}
              {favoritesCount === 1
                ? "favorito"
                : "favoritos"}
            </span>
          )}
        </section>

        {favoriteProducts.length ===
        0 ? (
          <section
            className={styles.empty}
          >
            <div
              className={
                styles.emptyIcon
              }
            >
              <Heart size={30} />
            </div>

            <h2>
              Nenhum favorito ainda
            </h2>

            <p>
              Explore o catálogo e marque
              os produtos que mais chamarem
              sua atenção.
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
        ) : (
          <ProductGrid
            products={
              favoriteProducts
            }
            onSelectProduct={
              handleSelectProduct
            }
          />
        )}
      </Container>
    </main>
  );
}

export default Favorites;