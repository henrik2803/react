import Container from "../../components/layout/Container/Container";
import SearchBar from "../../components/catalog/SearchBar/SearchBar";

import styles from "./Catalog.module.css";

function Catalog() {
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
      </Container>
    </main>
  );
}

export default Catalog;