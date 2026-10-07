import { Search, SlidersHorizontal } from "lucide-react";

import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Search
          size={20}
          className={styles.searchIcon}
        />

        <input
          type="search"
          placeholder="Buscar motos, capacetes, acessórios..."
          className={styles.input}
          aria-label="Buscar produtos"
        />
      </div>

      <button
        type="button"
        className={styles.filterButton}
        aria-label="Abrir filtros"
      >
        <SlidersHorizontal size={20} />

        <span>Filtros</span>
      </button>
    </div>
  );
}

export default SearchBar;