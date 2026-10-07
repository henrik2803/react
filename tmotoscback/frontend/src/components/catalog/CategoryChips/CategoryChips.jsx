import { useState } from "react";

import styles from "./CategoryChips.module.css";

const categories = [
  "Todos",
  "Motos",
  "Capacetes",
  "Jaquetas",
  "Luvas",
  "Peças",
  "Acessórios",
];

function CategoryChips() {
  const [selectedCategory, setSelectedCategory] =
    useState("Todos");

  return (
    <div className={styles.wrapper}>
      {categories.map((category) => {
        const isActive =
          selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            className={
              isActive
                ? `${styles.chip} ${styles.active}`
                : styles.chip
            }
            onClick={() =>
              setSelectedCategory(category)
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryChips;