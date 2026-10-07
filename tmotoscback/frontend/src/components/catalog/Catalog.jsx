import { useEffect, useState } from "react";

import Container from "../../components/layout/Container/Container";
import SearchBar from "../../components/catalog/SearchBar/SearchBar";
import CategoryChips from "../../components/catalog/CategoryChips/CategoryChips";
import ProductGrid from "../../components/catalog/ProductGrid/ProductGrid";

import { getProducts } from "../../services/productService";

import styles from "./Catalog.module.css";

function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        console.log("PRODUTOS:", data);


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

        <SearchBar />

        <CategoryChips />

        {loading ? (
          <div className={styles.loading}>
            Carregando produtos...
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </Container>
    </main>
  );
}

export default Catalog;