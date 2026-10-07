import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Container from "../../components/layout/Container/Container";

import SearchBar from "../../components/catalog/SearchBar/SearchBar";
import CategoryChips from "../../components/catalog/CategoryChips/CategoryChips";
import ProductGrid from "../../components/catalog/ProductGrid/ProductGrid";
import ProductQuickView from "../../components/catalog/ProductQuickView/ProductQuickView";

import { getProducts } from "../../services/productService";

import styles from "./Catalog.module.css";

function Catalog() {
  // Todos os produtos carregados
  const [products, setProducts] = useState([]);

  // Estado de carregamento
  const [loading, setLoading] = useState(true);

  // Texto digitado na busca
  const [searchTerm, setSearchTerm] = useState("");

  // Categoria selecionada
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("Todos");

  // Produto selecionado para o Quick View
  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  /*
   * Carrega os produtos quando
   * a página é aberta.
   */
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(
          "Erro ao carregar produtos:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /*
   * Produtos exibidos no catálogo.
   *
   * Combina:
   * - categoria
   * - busca
   */
  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        product.category === selectedCategory;

      const searchableText = [
        product.name,
        product.brand,
        product.category,
        product.shortDescription,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        searchableText.includes(
          normalizedSearch
        );

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    products,
    searchTerm,
    selectedCategory,
  ]);

  return (
    <main className={styles.catalog}>
      <Container>
        {/* Cabeçalho */}
        <section className={styles.header}>
          <span className={styles.eyebrow}>
            TMotos Store
          </span>

          <h1 className={styles.title}>
            Encontre sua próxima experiência.
          </h1>

          <p className={styles.description}>
            Explore motos, equipamentos, peças e
            acessórios.
          </p>
        </section>

        {/* Busca */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {/* Categorias */}
        <CategoryChips
          selectedCategory={
            selectedCategory
          }
          onSelectCategory={
            setSelectedCategory
          }
        />

        {/* Catálogo + Quick View */}
        <div className={styles.catalogContent}>
          <div className={styles.productsArea}>
            {loading ? (
              <div className={styles.loading}>
                Carregando produtos...
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts}
                onSelectProduct={
                  setSelectedProduct
                }
              />
            )}
          </div>

          <div className={styles.quickViewArea}>
            <ProductQuickView
              product={selectedProduct}
              onClose={() =>
                setSelectedProduct(null)
              }
            />
          </div>
        </div>
      </Container>
    </main>
  );
}

export default Catalog;