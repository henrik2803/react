import { useEffect, useState } from "react";
import { formatBRL } from "../../utils/currency";
import { getProducts } from "../../services/productService";

function Catalog() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (err) {
        console.error(err);

        setError("Não foi possível carregar os produtos.");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (isLoading) {
    return <p>Carregando produtos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Catálogo</h1>

      <p>
        {products.length} produtos encontrados
      </p>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>

          <p>{product.category}</p>

                <strong>
                {formatBRL(product.price)}
                </strong>
        </div>
      ))}
    </main>
  );
}

export default Catalog;