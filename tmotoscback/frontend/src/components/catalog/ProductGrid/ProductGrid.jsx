import ProductCard from "../ProductCard/ProductCard";

import styles from "./ProductGrid.module.css";

function ProductGrid({
  products,
  onSelectProduct,
}) {
  if (!products.length) {
    return (
      <div className={styles.empty}>
        <h2>Nenhum produto encontrado.</h2>

        <p>
          Tente alterar a categoria ou os filtros.
        </p>
      </div>
    );
  }

  return (
    <section className={styles.grid}>
      {products.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            onSelect={() => onSelectProduct(product)}
          />
                ))}
    </section>
  );
}

export default ProductGrid;