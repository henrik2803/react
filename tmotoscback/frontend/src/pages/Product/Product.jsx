import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import Container from "../../components/layout/Container/Container";

import ProductGallery from "../../components/product/ProductGallery/ProductGallery";
import ProductPrice from "../../components/product/ProductPrice/ProductPrice";
import ProductColors from "../../components/product/ProductColors/ProductColors";
import ProductVariants from "../../components/product/ProductVariants/ProductVariants";
import ProductSpecs from "../../components/product/ProductSpecs/ProductSpecs";
import ProductActions from "../../components/product/ProductActions/ProductActions";

import { getProductBySlug } from "../../services/productService";

import styles from "./Product.module.css";

function Product() {
  const { slug } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    selectedColorId,
    setSelectedColorId,
  ] = useState("");

  const [
    selectedVariantId,
    setSelectedVariantId,
  ] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        setSelectedColorId("");
        setSelectedVariantId("");

        const data =
          await getProductBySlug(slug);

        if (!data) {
          setError(
            "Produto não encontrado."
          );

          return;
        }

        setProduct(data);

        if (data.colors?.length) {
          setSelectedColorId(
            data.colors[0].id
          );
        }
      } catch (error) {
        console.error(
          "Erro ao carregar produto:",
          error
        );

        setError(
          "Não foi possível carregar o produto."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  function handleSelectColor(
    colorId
  ) {
    setSelectedColorId(colorId);

    setSelectedVariantId("");
  }

  if (loading) {
    return (
      <Container>
        <div className={styles.status}>
          Carregando produto...
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <div className={styles.status}>
          <h1>
            Produto não encontrado
          </h1>

          <p>
            {error ||
              "O produto solicitado não existe."}
          </p>

          <Link to="/catalogo">
            Voltar para o catálogo
          </Link>
        </div>
      </Container>
    );
  }

  const hasVariants =
    product.variants?.length > 0;

  return (
    <main className={styles.product}>
      <Container>
        <Link
          to="/catalogo"
          className={styles.back}
        >
          <ArrowLeft size={18} />

          Voltar ao catálogo
        </Link>

        <section className={styles.main}>
          <ProductGallery
            key={product.id}
            product={product}
          />

          <div className={styles.info}>
            <span className={styles.brand}>
              {product.brand}
            </span>

            <h1 className={styles.name}>
              {product.name}
            </h1>

            <p
              className={
                styles.shortDescription
              }
            >
              {product.shortDescription}
            </p>

            {product.badges?.length >
              0 && (
              <div
                className={styles.badges}
              >
                {product.badges.map(
                  (badge) => (
                    <span
                      key={badge}
                      className={
                        styles.badge
                      }
                    >
                      {badge}
                    </span>
                  )
                )}
              </div>
            )}

            <ProductPrice
              price={product.price}
              oldPrice={product.oldPrice}
              installment={
                product.installment
              }
            />

            <ProductColors
              colors={
                product.colors
              }
              selectedColorId={
                selectedColorId
              }
              onSelectColor={
                handleSelectColor
              }
            />

            {hasVariants && (
              <ProductVariants
                variants={
                  product.variants
                }
                selectedColorId={
                  selectedColorId
                }
                selectedVariantId={
                  selectedVariantId
                }
                onSelectVariant={
                  setSelectedVariantId
                }
              />
            )}

            <ProductActions
              product={product}
              selectedVariantId={
                selectedVariantId
              }
            />
          </div>
        </section>

        <section
          className={styles.description}
        >
          <h2>
            Sobre o produto
          </h2>

          <p>
            {product.description}
          </p>
        </section>

        <ProductSpecs
          specs={product.specs}
        />
      </Container>
    </main>
  );
}

export default Product;