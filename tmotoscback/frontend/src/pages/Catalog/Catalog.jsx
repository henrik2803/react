import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Container from "../../components/layout/Container/Container";
import SearchBar from "../../components/catalog/SearchBar/SearchBar";
import CategoryChips from "../../components/catalog/CategoryChips/CategoryChips";
import ProductGrid from "../../components/catalog/ProductGrid/ProductGrid";

import { getProducts } from "../../services/productService";

import styles from "./Catalog.module.css";

function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("Todos");

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

  const filteredProducts = useMemo(() => {
    const normalizedSearch =
      searchTerm
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
        <section className={styles.header}>
          <span className={styles.eyebrow}>
            TMotos Store
          </span>

          <h1 className={styles.title}>
            Encontre sua próxima experiência.
          </h1>

          <p className={styles.description}>
            Explore motos, equipamentos, peças e acessórios.
          </p>
        </section>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <CategoryChips
          selectedCategory={
            selectedCategory
          }
          onSelectCategory={
            setSelectedCategory
          }
        />

        {loading ? (
          <div className={styles.loading}>
            Carregando produtos...
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
          />
        )}
      </Container>
    </main>
  );
}

export default Catalog;